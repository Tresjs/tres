import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useLoader } from '.'
import type { LoaderProto, TresLoaderOptions } from '@tresjs/core'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import type { UseAsyncStateReturn } from '@vueuse/core'
import { nextTick, ref, watch } from 'vue'

// Create a mock Material class
class MockMaterial {
  name: string

  constructor(props: { name: string }) {
    this.name = props.name
  }

  dispose = vi.fn()
}

// Create a mock Object3D-like structure
class MockObject3D {
  name?: string
  type: string
  material?: MockMaterial
  children: MockObject3D[] = []
  geometry?: { dispose: () => void }

  constructor(props: {
    name?: string
    type: string
    material?: MockMaterial
    children?: MockObject3D[]
  }) {
    this.name = props.name
    this.type = props.type
    this.material = props.material
    this.children = props.children || []
  }

  traverse(callback: (obj: MockObject3D) => void) {
    callback(this)
    this.children.forEach(child => child.traverse(callback))
  }

  // Add dispose method for cleanup
  dispose() {
    this.material?.dispose()
    this.geometry?.dispose()
    this.children.forEach(child => child.dispose())
  }
}

// Mock scene structure
const mockScene = new MockObject3D({
  type: 'Scene',
  children: [
    new MockObject3D({
      name: 'test',
      type: 'Mesh',
      material: new MockMaterial({ name: 'TestMaterial' }),
    }),
  ],
})

// Mock a basic loader class
class MockLoader {
  load(
    _url: string,
    onLoad: (result: { scene: MockObject3D }) => void,
    _onProgress?: (event: ProgressEvent) => void,
    _onError?: (event: ErrorEvent) => void,
  ) {
    // Simulate async loading
    setTimeout(() => {
      onLoad({ scene: mockScene })
    }, 0)
  }

  setPath(_path: string) {
    // Mock setPath method
  }
}

// Mock error loader
class MockErrorLoader {
  load(
    _url: string,
    onLoad: (result: any) => void,
    _onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ) {
    // Simulate async error
    setTimeout(() => {
      onError?.(new ErrorEvent('error', { message: 'Failed to load resource' }))
    }, 0)
  }
}

describe('useLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('is defined', () => {
    expect(useLoader).toBeDefined()
  })

  it('loads a resource successfully', () => {
    const TresMockLoader = MockLoader as unknown as LoaderProto<GLTF>
    const result = useLoader(TresMockLoader, 'mock-url.glb') as UseAsyncStateReturn<GLTF, [string], false>

    // Initial state
    expect(result.isLoading.value).toBe(true)
    expect(result.state.value).toBeNull()
    expect(result.error.value).toBeUndefined()

    // Watch for state changes
    return new Promise<void>((resolve) => {
      watch(result.state, (newState) => {
        if (newState) {
          const scene = newState.scene as unknown as MockObject3D
          expect(scene).toBeDefined()
          expect(scene.children[0].name).toBe('test')
          expect(scene.children[0].material?.name).toBe('TestMaterial')
          expect(result.isLoading.value).toBe(false)
          resolve()
        }
      })
    })
  })

  it('handles loading state correctly', () => {
    const TresMockLoader = MockLoader as unknown as LoaderProto<GLTF>
    const result = useLoader(TresMockLoader, 'mock-url.glb') as UseAsyncStateReturn<GLTF, [string], false>

    // Initial state should be loading
    expect(result.isLoading.value).toBe(true)

    // Watch for loading state changes
    return new Promise<void>((resolve) => {
      watch(result.isLoading, (isLoading) => {
        if (!isLoading) {
          expect(result.state.value).toBeDefined()
          resolve()
        }
      })
    })
  })

  it('handles errors correctly', () => {
    const TresMockErrorLoader = MockErrorLoader as unknown as LoaderProto<GLTF>
    const result = useLoader(TresMockErrorLoader, 'mock-url.glb') as UseAsyncStateReturn<GLTF, [string], false>

    // Initial state
    expect(result.isLoading.value).toBe(true)
    expect(result.error.value).toBeUndefined()

    // Watch for error state changes
    return new Promise<void>((resolve) => {
      watch(result.error, (error) => {
        if (error) {
          // Cast error to Error type since we know it's an Error instance
          const err = error as Error
          expect(err.message).toContain('Failed to load resource')
          expect(result.isLoading.value).toBe(false)
          expect(result.state.value).toBeNull()
          resolve()
        }
      })
    })
  })

  it('supports loader extensions', () => {
    const setPathSpy = vi.fn()

    class MockLoaderWithExtensions extends MockLoader {
      setPath = setPathSpy
    }

    const TresMockLoader = MockLoaderWithExtensions as unknown as LoaderProto<GLTF>
    const options: TresLoaderOptions<GLTF, false> = {
      extensions: (loader) => {
        loader.setPath('https://example.com/models/')
      },
    }

    useLoader(TresMockLoader, 'mock-url.glb', options)
    expect(setPathSpy).toHaveBeenCalledWith('https://example.com/models/')
  })

  it('reacts to path changes', () => {
    const TresMockLoader = MockLoader as unknown as LoaderProto<GLTF>
    const path = ref('initial-url.glb')
    const result = useLoader(TresMockLoader, path) as UseAsyncStateReturn<GLTF, [string], false>

    // Initial state
    expect(result.isLoading.value).toBe(true)

    return new Promise<void>((resolve) => {
      // Watch for state changes
      watch([result.state, result.isLoading], ([state, isLoading]) => {
        if (state && !isLoading) {
          // First load completed
          const firstScene = state.scene as unknown as MockObject3D
          expect(firstScene).toBeDefined()

          // Change path
          path.value = 'new-url.glb'

          // Watch for the new state to be loaded
          watch([result.state, result.isLoading], ([newState, newIsLoading]) => {
            if (newState && !newIsLoading) {
              const newScene = newState.scene as unknown as MockObject3D
              expect(newScene).toBeDefined()
              resolve()
            }
          })
        }
      })
    })
  })
})

// TODO: find a way to test this
