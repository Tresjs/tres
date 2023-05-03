/* eslint-disable max-len */
import { watch, ref, shallowRef, computed, toRefs } from 'vue'
import {
  MaybeRefOrGetter,
  toValue,
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
  shadows?: MaybeRefOrGetter<boolean>

  /**
   * Set the shadow map type
   * Can be PCFShadowMap, PCFSoftShadowMap, BasicShadowMap, VSMShadowMap
   * [see](https://threejs.org/docs/?q=we#api/en/constants/Renderer)
   *
   * @default PCFSoftShadowMap
   */
  shadowMapType?: MaybeRefOrGetter<ShadowMapType>

  /**
   * Whether to use physically correct lighting mode.
   * See the [lights / physical example](https://threejs.org/examples/#webgl_lights_physical).
   *
   * @default false
   * @deprecated Use {@link WebGLRenderer.useLegacyLights useLegacyLights} instead.
   */
  physicallyCorrectLights?: MaybeRefOrGetter<boolean>
  /**
   * Whether to use legacy lighting mode.
   *
   * @type {MaybeRefOrGetter<boolean>}
   * @memberof UseRendererOptions
   */
  useLegacyLights?: MaybeRefOrGetter<boolean>
  /**
   * Defines the output encoding of the renderer.
   * Can be LinearEncoding, sRGBEncoding
   *
   * @default LinearEncoding
   */
  outputEncoding?: MaybeRefOrGetter<TextureEncoding>

  /**
   * Defines the tone mapping used by the renderer.
   * Can be NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping, ACESFilmicToneMapping, CustomToneMapping
   *
   * @default NoToneMapping
   */
  toneMapping?: MaybeRefOrGetter<ToneMapping>

  /**
   * Defines the tone mapping exposure used by the renderer.
   *
   * @default 1
   */
  toneMappingExposure?: MaybeRefOrGetter<number>

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
  clearColor?: MaybeRefOrGetter<TresColor>
  windowSize?: MaybeRefOrGetter<boolean | string>
  preset?: RendererPresetsType
}

/**
 * Reactive Three.js WebGLRenderer instance
 *
 * @param canvas
 * @param {UseRendererOptions} [options]
 */
export function useRenderer(options: UseRendererOptions) {
  const renderer = shallowRef<WebGLRenderer>()
  const isReady = ref(false)
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

  const { state, setState } = useTres()

  const { width, height } =
    toValue(windowSize) == true || toValue(windowSize) === '' || toValue(windowSize) === 'true'
      ? useWindowSize()
      : useElementSize(state.container)
  const { logError, logWarning } = useLogger()
  const { pixelRatio } = useDevicePixelRatio()
  const { pause, resume } = useRenderLoop()
  const aspectRatio = computed(() => width.value / height.value)

  if (!toValue(windowSize) && state.container?.value?.offsetHeight === 0) {
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

    const rendererPreset = toValue(preset)

    if (rendererPreset) {
      if (!(rendererPreset in rendererPresets))
        logError('Renderer Preset must be one of these: ' + Object.keys(rendererPresets).join(', '))
      merge(renderer.value, rendererPresets[rendererPreset])

      return
    }

    renderer.value.shadowMap.enabled = toValue(shadows) as boolean
    renderer.value.shadowMap.type = toValue(shadowMapType) as ShadowMapType
    renderer.value.toneMapping = (toValue(toneMapping) as ToneMapping) || NoToneMapping
    renderer.value.toneMappingExposure = toValue(toneMappingExposure) as number
    renderer.value.outputEncoding = (toValue(outputEncoding) as TextureEncoding) || LinearEncoding
    if (clearColor?.value) renderer.value.setClearColor(normalizeColor(toValue(clearColor) as TresColor))

    /*    renderer.value.physicallyCorrectLights = toValue(physicallyCorrectLights) as boolean */
    renderer.value.useLegacyLights = toValue(useLegacyLights) as boolean
  }

  const init = () => {
    const _canvas = unrefElement(state.canvas)

    if (!_canvas) {
      return
    }

    renderer.value = new WebGLRenderer({
      canvas: _canvas,
      alpha: toValue(alpha),
      antialias: toValue(antialias),
      context: toValue(context),
      depth: toValue(depth),
      failIfMajorPerformanceCaveat: toValue(failIfMajorPerformanceCaveat),
      logarithmicDepthBuffer: toValue(logarithmicDepthBuffer),
      powerPreference: toValue(powerPreference),
      precision: toValue(precision),
      stencil: toValue(stencil),
      preserveDrawingBuffer: toValue(preserveDrawingBuffer),
      premultipliedAlpha: toValue(premultipliedAlpha),
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
    () => [state.canvas, state.container],
    () => {
      if (unrefElement(state.canvas) && unrefElement(state.container)) {
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
