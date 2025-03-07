import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest'
import { Texture } from 'three'
import { usePBRTexture } from '.'
import { nextTick, shallowRef } from 'vue'

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0))

// Mock useTexture module
vi.mock('../useTexture', () => {
  const mockTexture = new Texture()
  return {
    useTexture: vi.fn().mockImplementation((_) => {
      const data = shallowRef(mockTexture)
      const isLoading = shallowRef(true)
      const error = shallowRef(null)

      const result = {
        data,
        isLoading,
        error,
        // Delay the promise resolution to simulate actual loading
        promise: new Promise((resolve) => {
          setTimeout(async () => {
            await nextTick()
            isLoading.value = false
            resolve({ data, isLoading, error })
          }, 0)
        }),
      }

      // Make result thenable
      return Object.assign(result, {
        then(onfulfilled, onrejected) {
          return result.promise.then(onfulfilled, onrejected)
        },
      })
    }),
  }
})

describe('usePBRTexture', () => {
  const mockPBROptions = {
    map: 'textures/wood/albedo.jpg',
    normalMap: 'textures/wood/normal.jpg',
    roughnessMap: 'textures/wood/roughness.jpg',
    metalnessMap: 'textures/wood/metalness.jpg',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('basic functionality', () => {
    it('should return textures synchronously', async () => {
      const { data, isLoading, error } = usePBRTexture(mockPBROptions)

      expect(data.value).toBeDefined()
      expect(data.value.map).toBeDefined()
      expect(data.value.normalMap).toBeDefined()
      expect(data.value.roughnessMap).toBeDefined()
      expect(data.value.metalnessMap).toBeDefined()
      expect(isLoading.value).toBe(true)
      expect(error.value).toBe(null)

      await flushPromises()
      expect(isLoading.value).toBe(false)
    })

    it('should update loading state when all textures load', async () => {
      const { data, isLoading, error } = usePBRTexture(mockPBROptions)

      expect(data.value).toBeDefined()
      expect(isLoading.value).toBe(true)

      await flushPromises()
      expect(isLoading.value).toBe(false)
      expect(error.value).toBe(null)
    })

    it('should work with async/await', async () => {
      const result = await usePBRTexture(mockPBROptions)

      // After awaiting, we should still be loading because we need to wait for the next tick
      expect(result.isLoading.value).toBe(true)
      expect(result.error.value).toBe(null)
      expect(result.data.value).toBeDefined()

      await flushPromises()
      expect(result.isLoading.value).toBe(false)
    })
  })

  describe('error handling', () => {
    it('should handle loading errors', async () => {
      // Mock useTexture to throw error for this test
      const useTextureMock = (await import('../useTexture')).useTexture as unknown as Mock
      useTextureMock.mockImplementationOnce(() => {
        throw new Error('Failed to load texture')
      })

      const { isLoading, error, promise } = usePBRTexture(mockPBROptions)

      expect(isLoading.value).toBe(true)

      // Catch the promise rejection to prevent unhandled rejection
      await promise.catch(() => {
        // Expected to reject
      })

      await flushPromises()
      expect(error.value).toBeTruthy()
      expect(error.value?.message).toContain('Failed to load texture')
      expect(isLoading.value).toBe(false)
    })
  })

  describe('partial textures', () => {
    it('should handle partial texture sets', async () => {
      const partialOptions = {
        map: 'textures/wood/albedo.jpg',
        normalMap: 'textures/wood/normal.jpg',
      }

      const { data, isLoading } = usePBRTexture(partialOptions)

      expect(isLoading.value).toBe(true)
      expect(data.value.map).toBeDefined()
      expect(data.value.normalMap).toBeDefined()
      expect(data.value.roughnessMap).toBe(null)
      expect(data.value.metalnessMap).toBe(null)

      await flushPromises()
      expect(isLoading.value).toBe(false)
    })

    it('should ignore undefined texture paths', async () => {
      const partialOptions = {
        map: 'textures/wood/albedo.jpg',
        normalMap: undefined,
      }

      const { data, isLoading } = usePBRTexture(partialOptions)

      expect(isLoading.value).toBe(true)
      expect(data.value.map).toBeDefined()
      expect(data.value.normalMap).toBe(null)

      await flushPromises()
      expect(isLoading.value).toBe(false)
    })
  })

  describe('promise behavior', () => {
    it('should be thenable', async () => {
      const result = await usePBRTexture(mockPBROptions)

      // After awaiting, we should still be loading because we need to wait for the next tick
      expect(result.isLoading.value).toBe(true)
      expect(result.error.value).toBe(null)
      expect(result.data.value).toBeDefined()

      await flushPromises()
      expect(result.isLoading.value).toBe(false)
    })
  })
})
