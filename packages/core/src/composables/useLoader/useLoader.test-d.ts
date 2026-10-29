import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { describe, expectTypeOf, it } from 'vitest'
import type { LoaderProto, UseLoaderReturn, UseLoaderReturnBase } from './index'
import { useLoader } from './index'

declare const GLTFLoaderMock: LoaderProto<GLTF>

describe('useLoader', () => {
  it('is awaitable', () => {
    expectTypeOf(useLoader(GLTFLoaderMock, 'model.glb')).toEqualTypeOf<UseLoaderReturn<GLTF, true>>()
    expectTypeOf<UseLoaderReturn<GLTF, true>>().toExtend<PromiseLike<unknown>>()
  })

  it('resolves with the base fields, without then', () => {
    expectTypeOf<Awaited<UseLoaderReturn<GLTF, true>>>().toEqualTypeOf<UseLoaderReturnBase<GLTF, true>>()
    expectTypeOf<UseLoaderReturnBase<GLTF, true>>().toHaveProperty('load')
    expectTypeOf<UseLoaderReturnBase<GLTF, true>>().toHaveProperty('progress')
    expectTypeOf<UseLoaderReturnBase<GLTF, true>>().not.toHaveProperty('then')
  })
})
