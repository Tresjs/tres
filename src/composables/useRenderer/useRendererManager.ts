import type { Object3D, Scene } from 'three'

import type { TresContext } from '../useTresContextProvider'

import {
  createEventHook,
  unrefElement,
  useDevicePixelRatio,
} from '@vueuse/core'
import { Material, Mesh, WebGLRenderer } from 'three'
import { computed, type MaybeRef, onUnmounted, readonly, ref, toValue, watch, watchEffect } from 'vue'

// Solution taken from Thretle that actually support different versions https://github.com/threlte/threlte/blob/5fa541179460f0dadc7dc17ae5e6854d1689379e/packages/core/src/lib/lib/useRenderer.ts
import { setPixelRatio } from '../../utils'

import { logWarning } from '../../utils/logger'
import type { TresCanvasProps } from 'src/components/TresCanvas.vue'

/**
 * If set to 'on-demand', the scene will only be rendered when the current frame is invalidated
 * If set to 'manual', the scene will only be rendered when advance() is called
 * If set to 'always', the scene will be rendered every frame
 */
export type RenderMode = 'always' | 'on-demand' | 'manual'

export function useRendererManager(
  {
    scene,
    canvas,
    options,
    contextParts: { sizes, loop, camera },
  }:
  {
    scene: Scene
    canvas: MaybeRef<HTMLCanvasElement>
    options: TresCanvasProps
    contextParts: Pick<TresContext, 'sizes' | 'camera' | 'loop'>
  },
) {
  const renderer = new WebGLRenderer({
    ...options,
    canvas: unrefElement(canvas),
  })

  const frames = ref(0)
  const maxFrames = 60
  const canBeInvalidated = computed(() => toValue(options.renderMode) === 'on-demand' && frames.value === 0)

  const forceMaterialUpdate = () =>
    scene.traverse((child: Object3D) => {
      if (child instanceof Mesh && child.material instanceof Material) {
        child.material.needsUpdate = true
      }
    })

  /**
   * Invalidates the current frame when in on-demand render mode.
   */
  const invalidate = (amountOfFramesToInvalidate = 1) => {
    if (!canBeInvalidated.value) {
      return
    }

    frames.value = Math.min(maxFrames, frames.value + amountOfFramesToInvalidate)
  }

  /**
   * Advances one frame when in manual render mode.
   */
  const advance = () => {
    if (toValue(options.renderMode) !== 'manual') {
      throw new Error('advance can only be called in manual render mode.')
    }

    frames.value = 1
  }

  const invalidateOnDemand = () => {
    if (toValue(options.renderMode) === 'on-demand') {
      invalidate()
    }
  }

  const isModeAlways = computed(() => toValue(options.renderMode) === 'always')

  const renderEventHook = createEventHook<WebGLRenderer>()

  loop.register(() => {
    if (camera.activeCamera.value && frames.value) {
      renderer.render(scene, camera.activeCamera.value)

      renderEventHook.trigger(renderer)
    }

    frames.value = isModeAlways.value
      ? 1
      : Math.max(0, frames.value - 1)
  }, 'render')

  const isReady = computed(() =>
    !!(renderer.domElement.width && renderer.domElement.height),
  )

  const readyEventHook = createEventHook<WebGLRenderer>()
  let hasTriggeredReady = false

  // Watch the sizes and invalidate the renderer when they change
  watch([sizes.width, sizes.height], () => {
    renderer.setSize(sizes.width.value, sizes.height.value)

    if (renderer.domElement.width && renderer.domElement.height && !hasTriggeredReady) {
      readyEventHook.trigger(renderer)
      hasTriggeredReady = true
    }

    invalidateOnDemand()
  }, {
    immediate: true,
  })

  const { pixelRatio } = useDevicePixelRatio()

  watchEffect(() => {
    setPixelRatio(renderer, pixelRatio.value, toValue(options.dpr))
  })

  if (toValue(options.renderMode) === 'on-demand') {
    // Invalidate for the first time
    invalidate()
  }

  if (toValue(options.renderMode) === 'manual') {
    // Advance for the first time, setTimeout to make sure there is something to render
    setTimeout(() => {
      advance()
    }, 100)
  }

  const clearColorAndAlpha = computed(() => {
    const clearColor = toValue(options.clearColor)
    const clearAlpha = toValue(options.clearAlpha)

    const isClearColorWithAlpha = typeof clearColor === 'string' && clearColor.length === 9 && clearColor.startsWith('#')

    if (isClearColorWithAlpha && clearAlpha !== undefined) {
      logWarning(`clearColor with alpha (e.g. ${clearColor}) and clearAlpha cannot both be set, using clearColor as source of truth`)
    }

    if (isClearColorWithAlpha) {
      return {
        alpha: Number.parseInt(clearColor.slice(7, 9), 16) / 255,
        color: clearColor.slice(0, 7),
      }
    }

    return {
      alpha: clearAlpha,
      color: clearColor,
    }
  })

  // Watchers for updatable renderer options at runtime
  watchEffect(() => {
    const value = clearColorAndAlpha.value
    if (value.color === undefined || value.alpha === undefined) { return }
    renderer.setClearColor(value.color, value.alpha)
  })

  watchEffect(() => {
    const value = options.toneMapping
    if (value) {
      renderer.toneMapping = value
    }
  })

  watchEffect(() => {
    const value = options.toneMappingExposure
    if (value) {
      renderer.toneMappingExposure = value
    }
  })

  watchEffect(() => {
    const value = options.outputColorSpace
    if (value) {
      renderer.outputColorSpace = value
    }
  })

  watchEffect(() => {
    const value = options.shadows
    if (value === undefined) { return }
    renderer.shadowMap.enabled = value
    forceMaterialUpdate()
  })

  watchEffect(() => {
    const value = options.shadowMapType
    if (value === undefined) { return }
    renderer.shadowMap.type = value
    forceMaterialUpdate()
  })

  onUnmounted(() => {
    renderer.dispose()
    renderer.forceContextLoss()
  })

  return {
    instance: renderer,
    isReady: readonly(isReady),
    advance,
    onRender: renderEventHook.on,
    onReady: readyEventHook.on,
    invalidate,
    canBeInvalidated,
    frames,
  }
}

export type UseRendererManagerReturn = ReturnType<typeof useRendererManager>
