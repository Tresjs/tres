import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useLoader } from '.'
import type { LoaderProto, TresLoader } from '@tresjs/core'
import type { LoadingManager, Object3D } from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

// Create a mock Object3D-like structure
class MockObject3D {
  name?: string
  type: string
  material?: any
  children: MockObject3D[] = []

  constructor(props: Partial<MockObject3D> = {}) {
    Object.assign(this, props)
  }

  traverse(callback: (obj: MockObject3D) => void) {
    callback(this)
    this.children.forEach(child => child.traverse(callback))
  }
}

// Mock scene structure
const mockScene = new MockObject3D({
  type: 'Scene',
  children: [
    new MockObject3D({
      name: 'test',
      type: 'Mesh',
      material: { name: 'TestMaterial' },
    }),
  ],
})

// Mock a basic loader class
class MockLoader {
  load(
    _url: string | string[],
    onLoad: (result: any) => void,
    _onProgress?: (event: ProgressEvent) => void,
    _onError?: (event: ErrorEvent) => void,
  ) {
    // Simulate async loading
    setTimeout(() => {
      // If url is an array, return an array of mock scenes
      if (Array.isArray(_url)) {
        onLoad(_url.map(() => ({ scene: mockScene })))
      }
      else {
        onLoad({ scene: mockScene })
      }
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

  it('loads a resource successfully', async () => {
    const TresMockLoader = MockLoader as unknown as LoaderProto<any>
    const { data, promise } = useLoader(TresMockLoader, 'mock-url.glb')

    await promise

    expect(data.value).toBeDefined()
    expect(data.value?.scene).toBeDefined()
    // Use type assertion since we know our mock structure
    const result = data.value as { nodes: Record<string, any>, materials: Record<string, any> }
    expect(result.nodes.test).toBeDefined()
    expect(result.materials.TestMaterial).toBeDefined()
  })

  it('handles loading state correctly', async () => {
    const TresMockLoader = MockLoader as unknown as LoaderProto<any>
    const { isLoading, promise } = useLoader(TresMockLoader, 'mock-url.glb')

    // Check initial loading state
    expect(isLoading.value).toBe(true)

    // Wait for loading to complete
    await promise

    // Check final loading state
    expect(isLoading.value).toBe(false)
  })

  it('handles errors correctly', async () => {
    const TresMockErrorLoader = MockErrorLoader as unknown as LoaderProto<any>
    const { error, isLoading, promise } = useLoader(TresMockErrorLoader, 'mock-url.glb')

    expect(isLoading.value).toBe(true)
    expect(error.value).toBeNull()

    // Wait for error to occur
    try {
      await promise
      // Should not reach here
      expect(true).toBe(false)
    }
    catch {
      // Expected to throw, no need to use the error
      expect(error.value).toBeDefined()
      expect(error.value?.message).toContain('Failed to load resource')
      expect(isLoading.value).toBe(false)
    }
  })

  it('supports loader extensions', async () => {
    const setPathSpy = vi.fn()

    class MockLoaderWithExtensions extends MockLoader {
      setPath = setPathSpy
    }

    const TresMockLoader = MockLoaderWithExtensions as unknown as LoaderProto<any>
    const extensions = (loader: any) => {
      loader.setPath('https://example.com/models/')
    }

    await useLoader(TresMockLoader, 'mock-url.glb', extensions)

    expect(setPathSpy).toHaveBeenCalledWith('https://example.com/models/')
  })

  it('handles multiple resources', async () => {
    const TresMockLoader = MockLoader as unknown as LoaderProto<any>
    const { data, promise } = useLoader(TresMockLoader, ['mock-url1.glb', 'mock-url2.glb'])

    await promise

    expect(Array.isArray(data.value)).toBe(true)
    expect(data.value).toHaveLength(2)
    // Use type assertion for the scene check
    const results = data.value as Array<{ scene: any }>
    results.forEach((item) => {
      expect(item.scene).toBeDefined()
    })
  })

  it('supports progress callbacks', async () => {
    const onProgressMock = vi.fn()
    class MockProgressLoader extends MockLoader {
      load(
        _url: string,
        onLoad: (result: any) => void,
        onProgress?: (event: ProgressEvent) => void,
      ) {
        // First trigger progress
        onProgress?.(new ProgressEvent('progress', { loaded: 50, total: 100 }))
        // Then load with proper mock scene structure
        onLoad({ scene: mockScene })
      }
    }

    const TresMockLoader = MockProgressLoader as unknown as LoaderProto<any>
    const { promise } = await useLoader(TresMockLoader, 'mock-url.glb', undefined, onProgressMock)

    await promise

    expect(onProgressMock).toHaveBeenCalled()
    expect(onProgressMock).toHaveBeenCalledWith(expect.any(ProgressEvent))
  })

  it('can be used without await', () => {
    const TresMockLoader = MockLoader as unknown as LoaderProto<any>
    const { data, isLoading, error, promise } = useLoader(TresMockLoader, 'mock-url.glb')

    expect(data.value).toBeNull()
    expect(isLoading.value).toBe(true)
    expect(error.value).toBeNull()
    expect(promise).toBeInstanceOf(Promise)
  })
})

// TODO: find a way to test this
