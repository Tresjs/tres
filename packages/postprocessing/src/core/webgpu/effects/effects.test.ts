import type { Node } from 'three/webgpu'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Component } from 'vue'
import { h, ref, shallowRef } from 'vue'
import EffectComposer from '../EffectComposer.vue'
import { createPipelineProbe, flush, mountStubCanvas, unmountStubCanvases } from '../test-utils'
import { Bloom, ChromaticAberration, DepthOfField, Film, FXAA, SMAA } from '.'

type Uniforms = Record<string, { value: unknown }>

const mountEffect = async (effect: Component, props = ref<Record<string, unknown>>({})) => {
  const { Probe, pipeline, passes } = createPipelineProbe()
  const instance = shallowRef<{ uniforms: Uniforms }>()
  await mountStubCanvas(() => [
    h(EffectComposer, null, () => [h(effect, { ...props.value, ref: (el: any) => { instance.value = el } })]),
    h(Probe),
  ]).show()

  return { renderPipeline: pipeline()!, passes: passes(), uniforms: () => instance.value!.uniforms }
}

const collect = (root: Node, into = new Set<Node>()) => {
  if (into.has(root)) { return into }
  into.add(root)
  for (const child of root.getChildren()) { collect(child as Node, into) }
  return into
}

const findNode = (root: Node, type: string) => [...collect(root)].find(node => node.type === type) as any

const hasRenderOutput = (root: Node) => [...collect(root)].some(node => (node as { isRenderOutputNode?: boolean }).isRenderOutputNode)

afterEach(() => {
  unmountStubCanvases()
  vi.restoreAllMocks()
})

describe('webGPU effects', () => {
  it.each([
    ['Bloom', Bloom, 'BloomNode', { strength: 'strength', radius: 'radius', threshold: 'threshold', smoothWidth: 'smoothWidth' }],
    ['DepthOfField', DepthOfField, 'DepthOfFieldNode', { focusDistance: 'focusDistanceNode', focalLength: 'focalLengthNode', bokehScale: 'bokehScaleNode' }],
    ['ChromaticAberration', ChromaticAberration, 'ChromaticAberrationNode', { strength: 'strengthNode', center: 'centerNode', scale: 'scaleNode' }],
    ['SMAA', SMAA, 'SMAANode', {}],
  ] as const)('%s runs before tone mapping and passes its uniforms to the node', async (_, effect, type, fields) => {
    const { renderPipeline, uniforms } = await mountEffect(effect as Component)
    const node = findNode(renderPipeline.outputNode, type)

    expect(node).toBeDefined()
    for (const [prop, field] of Object.entries(fields)) {
      expect(node[field]).toBe(uniforms()[prop])
    }
    expect(hasRenderOutput(renderPipeline.outputNode)).toBe(false)
    expect(renderPipeline.outputColorTransform).toBe(true)
  })

  it.each([
    ['FXAA', FXAA, 'FXAANode'],
    ['Film', Film, 'FilmNode'],
  ] as const)('%s runs after tone mapping', async (_, effect, type) => {
    const { renderPipeline } = await mountEffect(effect as Component)
    const node = findNode(renderPipeline.outputNode, type)

    expect(node).toBeDefined()
    expect(hasRenderOutput(node)).toBe(true)
    expect(renderPipeline.outputColorTransform).toBe(false)
  })

  it('film passes its intensity uniform to the node', async () => {
    const { renderPipeline, uniforms } = await mountEffect(Film as Component)

    expect(findNode(renderPipeline.outputNode, 'FilmNode').intensityNode).toBe(uniforms().intensity)
  })

  it('bloom adds the glow to the scene color and keeps the scene alpha', async () => {
    const { renderPipeline, passes } = await mountEffect(Bloom as Component)
    const bloom = findNode(renderPipeline.outputNode, 'BloomNode')
    const nodes = [...collect(renderPipeline.outputNode)] as any[]
    const isSplit = (node: any, of: Node, components: string) => node?.type === 'SplitNode' && node.node === of && node.components === components

    expect(bloom.inputNode).toBe(passes.scenePass!.getTextureNode())
    const unwrap = (node: any) => node?.type === 'VarNode' ? node.node : node
    const sum = nodes.find(node => node.op === '+' && isSplit(node.bNode, bloom, 'xyz'))
    expect(isSplit(sum?.aNode, bloom.inputNode, 'xyz')).toBe(true)

    const output = unwrap(renderPipeline.outputNode)
    expect(output.type).toBe('JoinNode')
    expect(output.nodes).toHaveLength(2)
    expect(unwrap(output.nodes[0])).toBe(sum)
    expect(isSplit(unwrap(output.nodes[1]), bloom.inputNode, 'w')).toBe(true)
  })

  it('depth of field reads the view Z of the scene pass', async () => {
    const { renderPipeline, passes } = await mountEffect(DepthOfField as Component)

    expect(findNode(renderPipeline.outputNode, 'DepthOfFieldNode').viewZNode).toBe(passes.scenePass!.getViewZNode())
  })
  it('writes prop changes to the uniforms the node reads', async () => {
    const props = ref<Record<string, unknown>>({ strength: 2, threshold: 0.5 })
    const { renderPipeline } = await mountEffect(Bloom as Component, props)
    const bloom = findNode(renderPipeline.outputNode, 'BloomNode')
    expect(bloom.strength.value).toBe(2)
    expect(bloom.threshold.value).toBe(0.5)

    props.value = { strength: 0, radius: 0.8 }
    await flush()

    expect(findNode(renderPipeline.outputNode, 'BloomNode')).toBe(bloom)
    expect(bloom.strength.value).toBe(0)
    expect(bloom.radius.value).toBe(0.8)
    expect(bloom.threshold.value).toBe(0)
  })

  it('takes a tuple for the chromatic aberration center and sees an edit in place', async () => {
    const props = ref({ center: [0.25, 0.75] })
    const { renderPipeline } = await mountEffect(ChromaticAberration as Component, props)
    const node = findNode(renderPipeline.outputNode, 'ChromaticAberrationNode')
    expect(node.centerNode.value.toArray()).toEqual([0.25, 0.75])

    props.value.center[0] = 0.5
    await flush()

    expect(findNode(renderPipeline.outputNode, 'ChromaticAberrationNode')).toBe(node)
    expect(node.centerNode.value.toArray()).toEqual([0.5, 0.75])
  })
})
