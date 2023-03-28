import { watch, watchEffect } from 'vue'
/* eslint-disable max-len */
import { watch, ref, shallowRef, computed, toRefs } from 'vue'
import {
  MaybeComputedRef,
  MaybeElementRef,
  resolveUnref,
  unrefElement,
  useDevicePixelRatio,
  useElementSize,
  useWindowSize,
} from '@vueuse/core'
import {
  WebGLRendererParameters,
  NoToneMapping,
  LinearEncoding,
  WebGLRenderer,
  ShadowMapType,
  PCFShadowMap,
  Clock,
} from 'three'
import type { TextureEncoding, ToneMapping } from 'three'
import { useRenderLoop, useTres } from '/@/composables/'
import { normalizeColor } from '/@/utils/normalize'
import { TresColor } from '/@/types'
import { rendererPresets, RendererPresetsType } from './const'
import { merge } from '/@/utils'
import { useLogger } from '/@/composables'

export interface UseRendererOptions extends WebGLRendererParameters {
  /**
   * Enable shadows in the Renderer
   *
   * @default false
   */
  shadows?: MaybeComputedRef<boolean>

  /**
   * Set the shadow map type
   * Can be PCFShadowMap, PCFSoftShadowMap, BasicShadowMap, VSMShadowMap
   * [see](https://threejs.org/docs/?q=we#api/en/constants/Renderer)
   *
   * @default PCFSoftShadowMap
   */
  shadowMapType?: MaybeComputedRef<ShadowMapType>

  /**
   * Whether to use physically correct lighting mode.
   * See the [lights / physical example](https://threejs.org/examples/#webgl_lights_physical).
   *
   * @default false
   * @deprecated Use {@link WebGLRenderer.useLegacyLights useLegacyLights} instead.
   */
  physicallyCorrectLights?: MaybeComputedRef<boolean>
  /**
   * Whether to use legacy lighting mode.
   *
   * @type {MaybeComputedRef<boolean>}
   * @memberof UseRendererOptions
   */
  useLegacyLights?: MaybeComputedRef<boolean>
  /**
   * Defines the output encoding of the renderer.
   * Can be LinearEncoding, sRGBEncoding
   *
   * @default LinearEncoding
   */
  outputEncoding?: MaybeComputedRef<TextureEncoding>

  /**
   * Defines the tone mapping used by the renderer.
   * Can be NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping, ACESFilmicToneMapping, CustomToneMapping
   *
   * @default NoToneMapping
   */
  toneMapping?: MaybeComputedRef<ToneMapping>

  /**
   * Defines the tone mapping exposure used by the renderer.
   *
   * @default 1
   */
  toneMappingExposure?: MaybeComputedRef<number>

  /**
   * The context used by the renderer.
   *
   * @default undefined
   */
  context?: WebGLRenderingContext | undefined

  /**
   * Provides a hint to the user agent indicating what configuration of GPU is suitable for this WebGL context.
   * Can be "high-performance", "low-power" or "default".
   *
   * @default "default"
   */
  powerPreference?: 'high-performance' | 'low-power' | 'default'

  /**
   * Whether to preserve the buffers until manually cleared or overwritten.
   *
   * @default false
   */
  preserveDrawingBuffer?: boolean

  /**
   * The color value to use when clearing the canvas.
   *
   * @default 0x000000
   */
  clearColor?: MaybeComputedRef<TresColor>
  windowSize?: MaybeComputedRef<boolean>
  preset?: RendererPresetsType
}

const renderer = shallowRef<WebGLRenderer>()
const isReady = ref(false)

/**
 * Reactive Three.js WebGLRenderer instance
 *
 * @param canvas
 * @param container
 * @param {UseRendererOptions} [options]
 */
export function useRenderer(canvas: MaybeElementRef, container: MaybeElementRef, options: UseRendererOptions) {
  // Defaults
  const {
    alpha = true,
    antialias = true,
    depth,
    logarithmicDepthBuffer,
    failIfMajorPerformanceCaveat,
    precision,
    premultipliedAlpha,
    stencil,
    shadows = false,
    shadowMapType = PCFShadowMap,
    physicallyCorrectLights = false,
    useLegacyLights = false,
    outputEncoding = LinearEncoding,
    toneMapping = NoToneMapping,
    toneMappingExposure = 1,
    context = undefined,
    powerPreference = 'default',
    preserveDrawingBuffer = false,
    clearColor,
    windowSize = false,
    preset = undefined,
  } = toRefs(options)

  const { setState } = useTres()

  const { width, height } = resolveUnref(windowSize) ? useWindowSize() : useElementSize(container)
  const { logError, logWarning } = useLogger()
  const { pixelRatio } = useDevicePixelRatio()
  const { pause, resume } = useRenderLoop()
  const aspectRatio = computed(() => width.value / height.value)

  if (!resolveUnref(windowSize) && container?.value?.offsetHeight === 0) {
    logWarning(`Oops... Seems like your canvas height is currently 0px, by default it takes the height of it's parent, so make sure it has some height with CSS.
You could set windowSize=true to force the canvas to be the size of the window.`)
  }

  const updateRendererSize = () => {
    if (!renderer.value) {
      return
    }

    renderer.value.setSize(width.value, height.value)
    renderer.value.setPixelRatio(Math.min(pixelRatio.value, 2))
  }

  const updateRendererOptions = () => {
    if (!renderer.value) {
      return
    }

    const rendererPreset = resolveUnref(preset)

    if (rendererPreset) {
      if (!(rendererPreset in rendererPresets))
        logError('Renderer Preset must be one of these: ' + Object.keys(rendererPresets).join(', '))
      merge(renderer.value, rendererPresets[rendererPreset])

      return
    }

    renderer.value.shadowMap.enabled = resolveUnref(shadows) as boolean
    renderer.value.shadowMap.type = resolveUnref(shadowMapType) as ShadowMapType
    renderer.value.toneMapping = (resolveUnref(toneMapping) as ToneMapping) || NoToneMapping
    renderer.value.toneMappingExposure = resolveUnref(toneMappingExposure) as number
    renderer.value.outputEncoding = (resolveUnref(outputEncoding) as TextureEncoding) || LinearEncoding
    if (clearColor?.value) renderer.value.setClearColor(normalizeColor(resolveUnref(clearColor) as TresColor))

    /*    renderer.value.physicallyCorrectLights = resolveUnref(physicallyCorrectLights) as boolean */
    renderer.value.useLegacyLights = resolveUnref(useLegacyLights) as boolean
  }

  const init = () => {
    const _canvas = unrefElement(canvas)

    if (!_canvas) {
      return
    }

    renderer.value = new WebGLRenderer({
      canvas: _canvas,
      alpha: resolveUnref(alpha),
      antialias: resolveUnref(antialias),
      context: resolveUnref(context),
      depth: resolveUnref(depth),
      failIfMajorPerformanceCaveat: resolveUnref(failIfMajorPerformanceCaveat),
      logarithmicDepthBuffer: resolveUnref(logarithmicDepthBuffer),
      powerPreference: resolveUnref(powerPreference),
      precision: resolveUnref(precision),
      stencil: resolveUnref(stencil),
      preserveDrawingBuffer: resolveUnref(preserveDrawingBuffer),
      premultipliedAlpha: resolveUnref(premultipliedAlpha),
    })

    setState('renderer', renderer.value)
    setState('clock', new Clock())
    setState('aspectRatio', aspectRatio)
    updateRendererOptions()
    updateRendererSize()
    resume()

    isReady.value = true
  }

  const dispose = () => {
    if (!renderer.value) {
      return
    }

    renderer.value.dispose()
    renderer.value = undefined

    isReady.value = false
    pause()
  }

  watch([aspectRatio, pixelRatio], updateRendererSize)

  watch(
    [shadows, shadowMapType, outputEncoding, useLegacyLights, toneMapping, toneMappingExposure, clearColor],
    updateRendererOptions,
  )

  watch(
    () => [canvas, container],
    () => {
      if (unrefElement(canvas) && unrefElement(container)) {
        init()
      }
    },
    { immediate: true, deep: true },
  )

  return {
    renderer,
    isReady,
    dispose,
    aspectRatio,
  }
}

export type UseRendererReturn = ReturnType<typeof useRenderer>
