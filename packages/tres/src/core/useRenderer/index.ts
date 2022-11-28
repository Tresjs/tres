import { watch, ref, shallowRef, computed } from 'vue'
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
} from 'three'
import type { TextureEncoding, ToneMapping } from 'three'
import { useRenderLoop } from '/@/core/'
import { normalizeColor } from '/@/utils/normalize'

export interface UseRendererOptions extends WebGLRendererParameters {
  /**
   * Enable shadows in the Renderer
   *
   * @default false
   */
  shadows?: MaybeComputedRef<boolean>

  /**
   * Set the shadow map type
   *
   * @default PCFSoftShadowMap
   */
  shadowMapType?: MaybeComputedRef<ShadowMapType>

  /**
   * Whether to use physically correct lighting mode.
   * See the [lights / physical example](https://threejs.org/examples/#webgl_lights_physical).
   *
   * @default false
   */
  physicallyCorrectLights?: MaybeComputedRef<boolean>

  /**
   * Defines the output encoding of the renderer.
   *
   * @default LinearEncoding
   */
  outputEncoding?: MaybeComputedRef<TextureEncoding>

  /**
   * Defines the tone mapping used by the renderer.
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
  clearColor?: MaybeComputedRef<string | number>
  windowSize?: MaybeComputedRef<boolean>
}

const renderer = shallowRef<WebGLRenderer>()
const isReady = ref(false)

/**
 * Reactive Three.js WebGLRenderer instance
 *
 * @param canvas
 * @param options
 */
export function useRenderer(canvas: MaybeElementRef, container: MaybeElementRef, options: UseRendererOptions) {
  // Defaults
  const {
    alpha = false,
    antialias,
    depth,
    logarithmicDepthBuffer,
    failIfMajorPerformanceCaveat,
    precision,
    premultipliedAlpha,
    stencil,
    shadows = false,
    shadowMapType = PCFShadowMap,
    physicallyCorrectLights = false,
    outputEncoding = LinearEncoding,
    toneMapping = NoToneMapping,
    toneMappingExposure = 1,
    context = undefined,
    powerPreference = 'default',
    preserveDrawingBuffer = false,
    clearColor = normalizeColor('#000000'),
    windowSize = false,
  } = options

  const { width, height } = windowSize ? useWindowSize() : useElementSize(container)

  const { pixelRatio } = useDevicePixelRatio()
  const { pause, resume } = useRenderLoop()
  const aspectRatio = computed(() => width.value / height.value)

  const updateRendererSize = () => {
    if (!renderer.value) {
      return
    }

    renderer.value.setSize(width.value, height.value)
    renderer.value.setPixelRatio(pixelRatio.value)
  }

  const updateRendererOptions = () => {
    if (!renderer.value) {
      return
    }

    renderer.value.shadowMap.enabled = resolveUnref(shadows)
    renderer.value.outputEncoding = resolveUnref(outputEncoding)
    renderer.value.shadowMap.type = resolveUnref(shadowMapType)
    renderer.value.physicallyCorrectLights = resolveUnref(physicallyCorrectLights)
    renderer.value.toneMapping = resolveUnref(toneMapping)
    renderer.value.toneMappingExposure = resolveUnref(toneMappingExposure)
    renderer.value.setClearColor(normalizeColor(resolveUnref(clearColor)))
  }

  const init = () => {
    const _canvas = unrefElement(canvas)

    if (renderer.value || !_canvas) {
      return
    }

    renderer.value = new WebGLRenderer({
      canvas: _canvas,
      alpha,
      antialias,
      context,
      depth,
      failIfMajorPerformanceCaveat,
      logarithmicDepthBuffer,
      powerPreference,
      precision,
      stencil,
      preserveDrawingBuffer,
      premultipliedAlpha,
    })

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

  watch([width, height, pixelRatio], updateRendererSize)
  watch(
    () => [
      shadows,
      shadowMapType,
      outputEncoding,
      physicallyCorrectLights,
      toneMapping,
      toneMappingExposure,
      clearColor,
    ],
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
