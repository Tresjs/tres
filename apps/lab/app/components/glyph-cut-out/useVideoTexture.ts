import { useEventListener } from '@vueuse/core'
import { LinearFilter, SRGBColorSpace, VideoTexture } from 'three/webgpu'

/**
 * A looping, muted `VideoTexture` that reports when frames are actually flowing.
 * `ready` stays false when the source is missing or autoplay is blocked, so callers can fall back.
 */
export function useVideoTexture(src: string) {
  const video = document.createElement('video')
  video.src = src
  video.muted = true
  video.loop = true
  video.playsInline = true
  video.crossOrigin = 'anonymous'
  video.preload = 'auto'

  const texture = new VideoTexture(video)
  texture.colorSpace = SRGBColorSpace
  texture.minFilter = LinearFilter
  texture.generateMipmaps = false

  const ready = ref(false)
  const aspect = ref(16 / 9)

  const tryPlay = () => {
    video.play().catch(() => {})
  }

  video.addEventListener('loadedmetadata', () => {
    aspect.value = video.videoWidth / video.videoHeight
  })
  video.addEventListener('playing', () => {
    ready.value = true
  })
  video.addEventListener('error', () => {
    ready.value = false
  })

  tryPlay()
  // Autoplay can be blocked until a user gesture, even when muted. Retry on the first one we get.
  useEventListener(window, ['pointerdown', 'keydown', 'wheel', 'touchstart'], tryPlay, { once: true, passive: true })

  onScopeDispose(() => {
    video.pause()
    video.removeAttribute('src')
    video.load()
    texture.dispose()
  })

  return { texture, ready, aspect }
}
