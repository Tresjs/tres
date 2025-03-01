import type { Ref, ShallowRef } from 'vue'
import { shallowRef } from 'vue'
import type { LoadingManager, Texture } from 'three'
import { useTexture } from '../useTexture'

export interface PBRTexturePaths {
  /**
   * Base color or albedo texture path
   */
  map?: string
  /**
   * Normal map texture path
   */
  normalMap?: string
  /**
   * Roughness map texture path
   */
  roughnessMap?: string
  /**
   * Metalness map texture path
   */
  metalnessMap?: string
  /**
   * Ambient occlusion map texture path
   */
  aoMap?: string
  /**
   * Height/Displacement map texture path
   */
  displacementMap?: string
  /**
   * Emissive map texture path
   */
  emissiveMap?: string
}

export interface PBRTextures {
  map: Texture | null
  normalMap: Texture | null
  roughnessMap: Texture | null
  metalnessMap: Texture | null
  aoMap: Texture | null
  displacementMap: Texture | null
  emissiveMap: Texture | null
}

export interface PBRTextureResult {
  /**
   * The loaded PBR textures
   */
  data: Ref<PBRTextures>
  /**
   * Whether any texture is currently loading
   */
  isLoading: Ref<boolean>
  /**
   * Any error that occurred during loading
   */
  error: Ref<Error | null>
  /**
   * Promise that resolves when all textures are loaded
   */
  promise: Promise<PBRTextureResult>
}

/**
 * Vue composable for loading PBR texture sets with THREE.js
 * Provides a simplified way to load and manage physically based rendering textures
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data: textures } = await usePBRTexture({
 *   map: 'textures/wood/albedo.jpg',
 *   normalMap: 'textures/wood/normal.jpg',
 *   roughnessMap: 'textures/wood/roughness.jpg',
 * })
 *
 * // In template
 * <TresMeshStandardMaterial v-bind="textures.value" />
 * ```
 *
 * @param paths - Object containing paths to PBR textures
 * @param manager - Optional THREE.js LoadingManager for tracking load progress
 */
export function usePBRTexture(
  paths: PBRTexturePaths,
  manager?: LoadingManager,
): PBRTextureResult & Promise<PBRTextureResult> {
  const data: ShallowRef<PBRTextures> = shallowRef({
    map: null,
    normalMap: null,
    roughnessMap: null,
    metalnessMap: null,
    aoMap: null,
    displacementMap: null,
    emissiveMap: null,
  })
  const isLoading = shallowRef(true)
  const error = shallowRef<Error | null>(null)

  // Filter out undefined paths and create a map of texture types
  const textureEntries = Object.entries(paths).filter(([_, path]) => path !== undefined)

  // Load all textures concurrently using useTexture
  const loadPromises = textureEntries.map(async ([type, path]) => {
    try {
      const { data: texture } = useTexture(path, manager)
      // Update the textures ref when each texture loads
      data.value[type as keyof PBRTextures] = texture.value
    }
    catch (err) {
      error.value = err as Error
      console.error(`Failed to load ${type} texture:`, err)
    }
  })

  // Create a promise that resolves when all textures are loaded
  const loadAllTextures = async () => {
    try {
      await Promise.all(loadPromises)
      isLoading.value = false
    }
    catch (err) {
      error.value = err as Error
      isLoading.value = false
      throw err
    }

    const result: PBRTextureResult = {
      data,
      isLoading,
      error,
      promise: Promise.resolve({ data, isLoading, error, promise: Promise.resolve({} as PBRTextureResult) }),
    }

    return result
  }

  const promise = loadAllTextures()

  // Make the return value awaitable
  const returnValue = {
    data,
    isLoading,
    error,
    promise,
  } as PBRTextureResult & Promise<PBRTextureResult>

  return returnValue
}
