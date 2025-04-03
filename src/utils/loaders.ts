import { type LoadingManager, type Texture, TextureLoader } from 'three'

/**
 * Creates a configured texture loader and loads a texture synchronously
 * @param {string} url - URL of the texture to load
 * @param {object} options - Optional configuration
 * @param {LoadingManager} options.manager - Optional loading manager
 * @param {(event: ProgressEvent) => void} options.onProgress - Optional progress callback
 * @param {(error: ErrorEvent) => void} options.onError - Optional error callback
 * @returns {Texture} The loaded texture
 */
export function loadTextureSync(
  url: string,
  {
    manager,
    onProgress,
    onError,
  }: {
    manager?: LoadingManager
    onProgress?: (event: ProgressEvent) => void
    onError?: (error: ErrorEvent) => void
  } = {},
): Texture {
  const loader = new TextureLoader(manager)
  return loader.load(
    url,
    undefined,
    onProgress,
    onError,
  )
}
