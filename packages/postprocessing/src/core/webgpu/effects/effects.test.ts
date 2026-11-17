import { useRenderPipeline } from '@tresjs/core/webgpu'
import type { RenderPipelinePasses } from '@tresjs/core/webgpu'
import { PerspectiveCamera } from 'three'
import type { Node, RenderPipeline } from 'three/webgpu'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Component, ShallowRef } from 'vue'
import { defineComponent, h, nextTick, ref, shallowRef } from 'vue'
import { createStubRenderer, mountInTresContext } from '../../../../../core/src/utils/test/tresContext'
import EffectComposer from '../EffectComposer.vue'
import { Bloom, ChromaticAberration, DepthOfField, Film, FXAA, SMAA } from '.'

vi.mock('@pmndrs/pointer-events', async () => {
  const { Object3D } = await import('three')
  return { forwardHtmlEvents: () => ({ update: () => {}, destroy: () => {} }), getVoidObject: () => new Object3D() }
})

type Uniforms = Record<string, { value: unknown }>

const flush = async () => {
  await nextTick()
  await nextTick()
}

const mountEffect = async (effect: Component, props = ref<Record<string, unknown>>({})) => {
  let pipeline: Readonly<ShallowRef<RenderPipeline | null>> | undefined
  let passes: Partial<RenderPipelinePasses> | undefined
  const Probe = defineComponent({
    setup() {
      ({ renderPipeline: pipeline, passes } = useRenderPipeline())
      return () => null
    },
  })
  const instance = shallowRef<{ uniforms: Uniforms }>()
  // A zero-size canvas never reports ready, so the real loop does not draw with the stub renderer.
  const domElement = Object.assign(document.createElement('canvas'), { width: 0, height: 0 })
  const content = ref(false)
  const { ctx } = mountInTresContext(
    () => content.value
      ? [h(EffectComposer, null, () => [h(effect, { ...props.value, ref: (el: any) => { instance.value = el } })]), h(Probe)]
      : null,
    { renderer: createStubRenderer({ domElement }) },
  )
  ctx.camera.registerCamera(new PerspectiveCamera(), true)
  content.value = true
  await flush()

  const renderPipeline = pipeline!.value!
  return { renderPipeline, passes: passes!, uniforms: () => instance.value!.uniforms }
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
  vi.restoreAllMocks()
})

describe('webGPU effects', () => {
  it.each([
    ['Bloom', Bloom, 'BloomNode', { strength: 'strength', radius: 'radius', threshold: 'threshold', smoothWidth: 'smoothWidth' }],
    ['DepthOfField', DepthOfField, 'DepthOfFieldNode', { focusDistance: 'focusDistanceNode', focalLength: 'focalLengthNode', bokehScale: 'bokehScaleNode' }],
    ['ChromaticAberration', ChromaticAberration, 'ChromaticAberrationNode', { strength: 'strengthNode', center: 'centerNode', scale: 'scaleNode' }],
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
    ['SMAA', SMAA, 'SMAANode'],
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

  it('bloom adds the glow to its input', async () => {
    const { renderPipeline, passes } = await mountEffect(Bloom as Component)
    const bloom = findNode(renderPipeline.outputNode, 'BloomNode')

    expect(bloom.inputNode).toBe(passes.scenePass!.getTextureNode())
    const sum = [...collect(renderPipeline.outputNode)].find((node: any) => node.op === '+' && node.bNode === bloom) as any
    expect(sum?.aNode).toBe(bloom.inputNode)
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

    props.value = { strength: 0.25, radius: 0.8 }
    await flush()

    expect(bloom.strength.value).toBe(0.25)
    expect(bloom.radius.value).toBe(0.8)
    expect(bloom.threshold.value).toBe(0)
  })

  it('takes a tuple for the chromatic aberration center', async () => {
    const { renderPipeline } = await mountEffect(ChromaticAberration as Component, ref({ center: [0.25, 0.75] }))

    expect(findNode(renderPipeline.outputNode, 'ChromaticAberrationNode').centerNode.value.toArray()).toEqual([0.25, 0.75])
  })
})
