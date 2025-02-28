import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LoadingManager, Texture, TextureLoader } from 'three'
import { useTexture } from '.'
import { nextTick } from 'vue'

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0))

describe('useTexture', () => {
  const mockTexture = new Texture()
  const mockTextureUrl = 'https://example.com/texture.png'
  const mockMultipleUrls = [
    'https://example.com/texture1.png',
    'https://example.com/texture2.png',
  ]

  beforeEach(() => {
    // Mock TextureLoader.load to return sync texture and call onLoad
    vi.spyOn(TextureLoader.prototype, 'load').mockImplementation((_, onLoad) => {
      if (onLoad) { setTimeout(() => onLoad(mockTexture), 0) }
      return mockTexture
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  describe('single texture', () => {
    it('should return texture synchronously', () => {
      const { data, isLoading, error } = useTexture(mockTextureUrl)

      expect(data.value).toBe(mockTexture)
      expect(isLoading.value).toBe(true)
      expect(error.value).toBe(null)
    })

    it('should update loading state when texture loads', async () => {
      const { data, isLoading, error } = useTexture(mockTextureUrl)

      expect(data.value).toBe(mockTexture)
      await flushPromises()
      expect(isLoading.value).toBe(false)
      expect(error.value).toBe(null)
    })

    it('should work with async/await', async () => {
      const { data, isLoading, error } = await useTexture(mockTextureUrl)

      expect(data.value).toBe(mockTexture)
      expect(isLoading.value).toBe(true)
      await flushPromises()
      expect(isLoading.value).toBe(false)
      expect(error.value).toBe(null)
    })

    it('should handle loading errors', async () => {
      const mockError = new Error('Failed to load texture')
      vi.spyOn(TextureLoader.prototype, 'load').mockImplementation((_, __, ___, onError) => {
        if (onError) { onError(mockError) }
        return mockTexture
      })

      const { isLoading, error, promise } = useTexture(mockTextureUrl)

      // Catch the promise rejection to prevent unhandled rejection
      await promise.catch(() => {
        // Expected to reject
      })

      await flushPromises()

      expect(error.value).toBeTruthy()
      expect(error.value?.message).toContain('Failed to load texture')
      expect(isLoading.value).toBe(false)
    })

    it('should use provided loading manager', () => {
      const loadingManager = new LoadingManager()

      // Just verify that the function works with a loading manager
      const { data } = useTexture(mockTextureUrl, loadingManager)

      expect(data.value).toBe(mockTexture)
    })
  })

  describe('multiple textures', () => {
    it('should return array of textures synchronously', () => {
      const { data, isLoading, error } = useTexture(mockMultipleUrls)

      expect(Array.isArray(data.value)).toBe(true)
      expect(data.value).toHaveLength(2)
      expect(isLoading.value).toBe(true)
      expect(error.value).toBe(null)
    })

    it('should update loading state when all textures load', async () => {
      const { data, isLoading, error } = useTexture(mockMultipleUrls)

      expect(Array.isArray(data.value)).toBe(true)
      expect(data.value).toHaveLength(2)
      await flushPromises()
      expect(isLoading.value).toBe(false)
      expect(error.value).toBe(null)
    })

    it('should work with async/await', async () => {
      const { data, isLoading, error } = await useTexture(mockMultipleUrls)

      expect(Array.isArray(data.value)).toBe(true)
      expect(data.value).toHaveLength(2)
      expect(isLoading.value).toBe(true)
      await flushPromises()
      expect(isLoading.value).toBe(false)
      expect(error.value).toBe(null)
    })

    it('should handle loading errors in array', async () => {
      const mockError = new Error('Failed to load texture')
      vi.spyOn(TextureLoader.prototype, 'load').mockImplementation((_, __, ___, onError) => {
        if (onError) { onError(mockError) }
        return mockTexture
      })

      const { isLoading, error, promise } = useTexture(mockMultipleUrls)

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

  describe('load method', () => {
    it('should allow loading additional textures', async () => {
      const { load } = useTexture(mockTextureUrl)
      const additionalTexture = await load('additional-texture.png')

      expect(additionalTexture).toBe(mockTexture)
    })
  })
})
