import type { GlobalComponents } from 'vue'
import type { WebGLRenderer } from 'three'
import type { MeshStandardNodeMaterial, WebGPURenderer } from 'three/webgpu'
import { describe, expectTypeOf, it } from 'vitest'
import type { TresRenderer, useTres as useRootTres } from '../index'
import type { ThreeElement, TresWebGPUCanvasProps, useTres } from './index'

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
})
