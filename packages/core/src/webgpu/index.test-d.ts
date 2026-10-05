import type { GlobalComponents } from 'vue'
import type { MeshStandardNodeMaterial, WebGPURenderer } from 'three/webgpu'
import { describe, expectTypeOf, it } from 'vitest'
import type { TresRenderer, useTres as useRootTres } from '../index'
import type { ThreeElement, useTres } from './index'

describe('@tresjs/core/webgpu', () => {
  it('types the useTres renderer as WebGPURenderer', () => {
    expectTypeOf<ReturnType<typeof useTres>['renderer']>().toEqualTypeOf<WebGPURenderer>()
  })

  it('keeps the root useTres renderer as TresRenderer', () => {
    expectTypeOf<ReturnType<typeof useRootTres>['renderer']>().toEqualTypeOf<TresRenderer>()
  })

  it('registers node materials as Tres components', () => {
    expectTypeOf<GlobalComponents>().toHaveProperty('TresMeshStandardNodeMaterial')
  })

  it('types node material props from three/webgpu', () => {
    type Roughness = ThreeElement<typeof MeshStandardNodeMaterial>['roughness']
    expectTypeOf<number>().toExtend<Roughness>()
    expectTypeOf<string>().not.toExtend<Roughness>()
  })
})
