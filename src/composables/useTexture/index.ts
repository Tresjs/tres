import { ref, type Ref, shallowRef } from 'vue'
import type { LoadingManager, Texture } from 'three'
import { TextureLoader } from 'three'
import type { UseAsyncStateReturn } from '@vueuse/core'
import { useAsyncState } from '@vueuse/core'

export interface UseTextureReturn<T> {
  /**
   * The loaded texture(s)
   */
  data: Ref<T | null>
  /**
   * Whether the texture is currently loading
   */
  isLoading: Ref<boolean>
  /**
   * Any error that occurred during loading
   */
  error: Ref<Error | null>
  /**
   * Promise that resolves when the texture is loaded
   */
  promise: Promise<T>
  /**
   * Load one or more textures
   */
  load: {
    (url: string): Promise<Texture>
    (urls: string[]): Promise<Texture[]>
  }
}

/**
 * Vue composable for loading textures with THREE.js
 * Can be used with or without await/Suspense
 *
 * @example
 * ```ts
 * import { useTexture } from '@tresjs/core'
 *
 * // Single texture
 * const { data: texture } = useTexture('path/to/texture.png')
 *
 * // Multiple textures - returns array of textures
 * const { data: textures } = useTexture([
 *   'path/to/albedo.png',
 *   'path/to/displacement.png'
 * ])
 * // Access individual textures
 * const [albedo, displacement] = textures.value
 *
 * // With async/await
 * const { data } = await useTexture('texture.png')
 * ```
 *
 * @param path - Path or paths to texture(s)
 * @param manager - Optional THREE.js LoadingManager
 */

export function useTexture2<T extends string | string[]>(path: T, manager?: LoadingManager):
T extends string ? UseAsyncStateReturn<Texture, [], true> : UseAsyncStateReturn<Texture, [], true>[] {
  const textureLoader = new TextureLoader(manager)

  const makeComposable = (path: string) => useAsyncState(
    () =>
      new Promise<Texture>((resolve, reject) => textureLoader.load(
        path,
        loadedTexture => resolve(loadedTexture),
        undefined,
        err => reject(err),
      )),
    null,
    {
      // TODO make argument
      immediate: true,
    },
  )

  if (Array.isArray(path)) {
    return path.map(path => makeComposable(path)) as T extends string ? never : UseAsyncStateReturn<Texture, [], true>[]
  }

  return makeComposable(path) as T extends string ? UseAsyncStateReturn<Texture, [], true> : never
}

export function useTexture(path: string, manager?: LoadingManager): UseTextureReturn<Texture> & Promise<UseTextureReturn<Texture>>
export function useTexture(paths: string[], manager?: LoadingManager): UseTextureReturn<Texture[]> & Promise<UseTextureReturn<Texture[]>>
export function useTexture(
  paths: string | string[],
  manager?: LoadingManager,
): UseTextureReturn<Texture | Texture[]> & Promise<UseTextureReturn<Texture | Texture[]>> {
  const data = shallowRef<Texture | Texture[] | null>(null)
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  const textureLoader = new TextureLoader(manager)

  const loadTexture = (url: string): Promise<Texture> =>
    new Promise((resolve, reject) => {
      try {
        // Create texture synchronously and handle async loading
        const texture = textureLoader.load(
          url,
          (loadedTexture) => {
            isLoading.value = false
            resolve(loadedTexture)
          },
          undefined,
          (err) => {
            error.value = new Error(`Failed to load texture: ${err instanceof Error ? err.message : 'Unknown error'}`)
            isLoading.value = false
            reject(error.value)
          },
        )
        return texture
      }
      catch (err) {
        error.value = err as Error
        isLoading.value = false
        reject(error.value)
        return null
      }
    })

  // Overloaded load function
  const load = ((paths: string | string[]): Promise<Texture | Texture[]> => {
    isLoading.value = true
    error.value = null

    if (typeof paths === 'string') {
      const texture = textureLoader.load(paths)
      data.value = texture
      return loadTexture(paths)
    }
    else {
      // Create textures synchronously first
      const textures = paths.map(path => textureLoader.load(path))
      // Set data.value immediately with synchronous textures
      data.value = textures
      // Handle async loading
      return Promise.all(paths.map(path => loadTexture(path)))
    }
  }) as UseTextureReturn<Texture | Texture[]>['load']

  // Make the return value awaitable
  const returnValue = {
    data,
    isLoading,
    error,
    load,
  } as UseTextureReturn<Texture | Texture[]> & Promise<UseTextureReturn<Texture | Texture[]>>

  // Initial load
  if (typeof paths === 'string') {
    const texture = textureLoader.load(paths)
    data.value = texture
    returnValue.promise = loadTexture(paths)
  }
  else {
    // Create textures synchronously first
    const textures = paths.map(path => textureLoader.load(path))
    // Set data.value immediately with synchronous textures
    data.value = textures
    // Handle async loading
    returnValue.promise = Promise.all(paths.map(path => loadTexture(path)))
  }

  return returnValue
}
