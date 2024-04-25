import { VideoTexture } from 'three'
import { useLogger } from '../../composables/useLogger'

interface VideoTextureProps extends HTMLVideoElement {
  unsuspend?: 'canplay' | 'canplaythrough' | 'loadstart' | 'loadedmetadata'
  start?: boolean
}

/**
 * Composable for loading video textures.
 *
 * ```ts
 * import { ref } from 'vue'
 * import { useVideoTexture } from '@tresjs/cientos'
 * import MyVideo from 'MyVideo.mp4'
 *
 * const texture = ref()
 * texture.value = await useVideoTexture(MyVideo)
 * ```
 * Then you can use the texture in your material.
 *
 * ```vue
 * <TresMeshBasicMaterial :map="texture" />
 * ```
 * @see https://threejs.org/docs/index.html?q=video#api/en/textures/VideoTexture
 * @export
 * @param {HTMLVideoElement} src
 * @return {VideoTexture}  {VideoTexture}
 */
export async function useVideoTexture(src: string | MediaStream, options?: Partial<VideoTextureProps>) {
  /**
   * Load a video as a texture.
   *
   * @param {src} string
   * @return {VideoTexture}  {VideoTexture}
   */
  const { logError } = useLogger()
  if (!src) { return logError('Error no path provided') }

  const { unsuspend, start, crossOrigin, muted, loop, ...rest } = {
    unsuspend: 'loadedmetadata',
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    ...options,
  }

  function loadTexture(): Promise<VideoTexture> {
    return new Promise((resolve, reject) => {
      const video = Object.assign(document.createElement('video'), {
        src: (typeof src === 'string' && src) || undefined,
        crossOrigin,
        loop,
        muted,
        autoplay: true,
        ...rest,
      })
      const texture = new VideoTexture(video)
      video.addEventListener(unsuspend, () => resolve(texture))
      video.addEventListener('error', () => reject(new Error('Error loading video')))
      return texture
    })
  }
  try {
    const texture = await loadTexture()
    if (start && texture.image) { texture.image.play() }
    return texture
  }
  catch {
    logError('Error loading resource')
  }
}
