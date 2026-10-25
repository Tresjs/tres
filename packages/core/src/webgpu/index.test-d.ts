import type { GlobalComponents, ShallowRef } from 'vue'
import type { Color, Vector2, WebGLRenderer } from 'three'
import { Vector3 } from 'three'
import type { MeshStandardNodeMaterial, PassNode, RenderPipeline, UniformNode, WebGPURenderer } from 'three/webgpu'
import { ref } from 'vue'
import { describe, expectTypeOf, it } from 'vitest'
import type { TresRenderer, useTres as useRootTres } from '../index'
import type { ThreeElement, TresWebGPUCanvasProps, useTres } from './index'
import { useLocalNodes, useNodes, useRenderPipeline, useUniform, useUniforms } from './index'

describe('@tresjs/core/webgpu', () => {
  it('types the useTres renderer as WebGPURenderer', () => {
    expectTypeOf<ReturnType<typeof useTres>['renderer']>().toEqualTypeOf<WebGPURenderer>()
  })

  it('only accepts renderer factories that return a WebGPURenderer', () => {
    type RendererFactory = NonNullable<TresWebGPUCanvasProps['renderer']>
    expectTypeOf<() => WebGPURenderer>().toExtend<RendererFactory>()
    expectTypeOf<() => WebGLRenderer>().not.toExtend<RendererFactory>()
  })

  it('keeps the root useTres renderer as TresRenderer', () => {
    expectTypeOf<ReturnType<typeof useRootTres>['renderer']>().toEqualTypeOf<TresRenderer>()
  })

  it('extends the Tres components with node materials', () => {
    expectTypeOf<GlobalComponents>().toHaveProperty('TresMeshStandardNodeMaterial')
  })

  it('types node material props from three/webgpu', () => {
    type Roughness = ThreeElement<typeof MeshStandardNodeMaterial>['roughness']
    expectTypeOf<number>().toExtend<Roughness>()
    expectTypeOf<string>().not.toExtend<Roughness>()
  })

  // Type-level only: vitest does not run these calls.
  describe('TSL composables', () => {
    it('types created uniforms from their sources', () => {
      const uniforms = useUniforms({
        uTime: 0,
        uColor: '#ff0000',
        uUv: { x: 1, y: 2 },
        uPos: ref(new Vector3()),
        uOn: () => true,
      })
      expectTypeOf(uniforms.uTime).toEqualTypeOf<UniformNode<'float', number>>()
      expectTypeOf(uniforms.uColor).toEqualTypeOf<UniformNode<'color', Color>>()
      expectTypeOf(uniforms.uUv).toEqualTypeOf<UniformNode<'vec2', Vector2>>()
      expectTypeOf(uniforms.uPos).toEqualTypeOf<UniformNode<'vec3', Vector3>>()
      expectTypeOf(uniforms.uOn).toEqualTypeOf<UniformNode<'bool', boolean>>()
      expectTypeOf(uniforms.rebuildUniforms).toEqualTypeOf<(scope?: string) => void>()
    })

    it('types a single uniform from its value', () => {
      expectTypeOf(useUniform('uTime', 0)).toEqualTypeOf<UniformNode<'float', number>>()
    })

    it('keeps the types a node creator returns', () => {
      const nodes = useNodes(() => ({ wobble: {} as PassNode }))
      expectTypeOf(nodes.wobble).toEqualTypeOf<PassNode>()
      expectTypeOf(nodes.clearNodes).toEqualTypeOf<(scope?: string) => void>()
    })

    it('returns local nodes as shallow refs, and nothing in the install form', () => {
      const local = useLocalNodes(() => ({ colorNode: {} as PassNode }))
      expectTypeOf(local.colorNode).toEqualTypeOf<ShallowRef<PassNode>>()
      expectTypeOf(useLocalNodes(() => () => {})).toEqualTypeOf<void>()
    })

    it('types the render pipeline and its scene pass', () => {
      expectTypeOf(useRenderPipeline().renderPipeline.value).toEqualTypeOf<RenderPipeline | null>()
      useRenderPipeline(({ passes }) => {
        expectTypeOf(passes.scenePass).toEqualTypeOf<PassNode>()
      })
    })
  })
})
