/* eslint-disable max-len */
import { type ShallowRef, watch, ref, shallowRef, toRefs, Ref, watchEffect, onUnmounted } from 'vue'
import {
  MaybeRefOrGetter,
  toValue,
  unrefElement,
  useDevicePixelRatio,
} from '@vueuse/core'
import {
  WebGLRendererParameters,
  NoToneMapping,
  LinearSRGBColorSpace,
  WebGLRenderer,
  ShadowMapType,
  PCFShadowMap,
  ColorSpace,
} from 'three'
import type { Scene, ToneMapping } from 'three'
import { useRenderLoop } from '../useRenderLoop'
/* import { useTres } from '../useTres' */
import { normalizeColor } from '../../utils/normalize'
import { TresColor } from '../../types'
import { rendererPresets, RendererPresetsType } from './const'
import { merge } from '../../utils'
import { useLogger } from '../useLogger'
import { TresContext } from '../../provider'

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
   * Can be LinearSRGBColorSpace, SRGBColorSpace
   *
   * @default LinearSRGBColorSpace
   */
  outputColorSpace?: MaybeRefOrGetter<ColorSpace>

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
export function useRenderer(
  canvas: Ref<HTMLCanvasElement>,
  options: UseRendererOptions,
  scene: Scene,
  disableRender: boolean,
  { sizes, camera }: Pick<TresContext, 'sizes' | 'camera'>,
) {
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
    outputColorSpace = LinearSRGBColorSpace,
    toneMapping = NoToneMapping,
    toneMappingExposure = 1,
    context = undefined,
    powerPreference = 'default',
    preserveDrawingBuffer = false,
    clearColor,
    preset = undefined,
  } = toRefs(options) //TODO change way of default setting 

  const renderer = shallowRef<WebGLRenderer>(
    new WebGLRenderer({
      canvas: unrefElement(canvas),
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
    },
    ))

  const { pixelRatio } = useDevicePixelRatio()
  const { pause, resume, onLoop } = useRenderLoop()

  watchEffect(() => {
    renderer.value.setSize(sizes.width.value, sizes.height.value)
  })

  watchEffect(() => {
    renderer.value.setPixelRatio(pixelRatio.value)
  })

  const { logError } = useLogger()

  const updateRendererOptions = () => {
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
    // Wating for https://github.com/DefinitelyTyped/DefinitelyTyped/pull/65356/files to be merged
    renderer.value.outputColorSpace = toValue(outputColorSpace as ColorSpace) || LinearSRGBColorSpace
    if (clearColor?.value) renderer.value.setClearColor(normalizeColor(toValue(clearColor) as TresColor))

    /*    renderer.value.physicallyCorrectLights = toValue(physicallyCorrectLights) as boolean */
    renderer.value.useLegacyLights = toValue(useLegacyLights) as boolean
  }

  watchEffect(
    updateRendererOptions,
  )

  onLoop(() => {
    // TODO handle disableRenderer -> should this composable even be used in this case?
    if (camera.value && !disableRender)
      renderer.value.render(scene, camera.value)
  })


  onUnmounted(() => {
    pause() // TODO should the render loop pause itself if there is no more renderer? 🤔
    renderer.value.dispose()
    renderer.value.forceContextLoss()
  })

  if (import.meta.hot)
    import.meta.hot.on('vite:afterUpdate', resume)


  return {
    renderer,
  }
}

export type UseRendererReturn = ReturnType<typeof useRenderer>
