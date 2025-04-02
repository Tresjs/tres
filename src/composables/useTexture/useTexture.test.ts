import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Texture, TextureLoader } from 'three'
import { useTexture } from '.'
import { ref } from 'vue'

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
    it('should load a single texture', async () => {
      const { state, error } = useTexture(mockTextureUrl)

      expect(state.value).toBeDefined()
      expect(state.value).toBeInstanceOf(Texture)
      await flushPromises()
      expect(error.value).toBeUndefined()
    })

    it('should update loading state when texture image loads', async () => {
      const { isLoading } = useTexture(mockTextureUrl)

      expect(isLoading.value).toBe(true)
      await flushPromises()
      expect(isLoading.value).toBe(false)
    })

    it('should handle loading errors', async () => {
      const mockError = new Error('Failed to load texture')
      vi.spyOn(TextureLoader.prototype, 'load').mockImplementation((_, __, ___, onError) => {
        if (onError) { onError(mockError) }
        return mockTexture
      })

      const { isLoading, error } = useTexture(mockTextureUrl)

      await flushPromises()

      expect(error.value).toBeTruthy()
      expect((error.value as Error).message).toContain('Failed to load texture')
      expect(isLoading.value).toBe(false)
    })

    describe('multiple textures', () => {
      it('should load multiple textures', async () => {
        const [texture1, texture2] = useTexture(mockMultipleUrls)

        expect(texture1.state.value).toBeInstanceOf(Texture)
        expect(texture2.state.value).toBeInstanceOf(Texture)
        expect(texture1.isLoading.value).toBe(true)
        await flushPromises()
        expect(texture1.isLoading.value).toBe(false)
        expect(texture1.error.value).toBeUndefined()
      })
    })

    describe('reactive texture loading', () => {
      it('should update texture when path changes', async () => {
        const texturePath = ref(mockTextureUrl)
        const { state, isLoading } = useTexture(texturePath)

        texturePath.value = 'https://example.com/new-texture.png'

        // Initial texture
        expect(state.value).toBeInstanceOf(Texture)
        await flushPromises()
        expect(isLoading.value).toBe(false)

        // Change texture path
        const newTexture = new Texture()
        const newTextureUrl = 'https://example.com/new-texture.png'
        vi.spyOn(TextureLoader.prototype, 'load').mockImplementation((_, onLoad) => {
          if (onLoad) { setTimeout(() => onLoad(newTexture), 0) }
          return newTexture
        })

        texturePath.value = newTextureUrl
        await flushPromises()
        expect(isLoading.value).toBe(false)
        // Check the second call (index 1) to load
        expect(TextureLoader.prototype.load).toHaveBeenNthCalledWith(2, newTextureUrl, expect.any(Function), undefined, expect.any(Function))
      })
    })
  })
})
