import { Color, WebGLRenderer } from 'three'
import { rendererPresets, RendererPresetsType } from './const'
import { shallowRef, watchEffect, onUnmounted, type MaybeRef, computed, watch } from 'vue'
import {
  toValue,
  unrefElement,
  type MaybeRefOrGetter,
  useDevicePixelRatio,
} from '@vueuse/core'

import { merge } from '../../utils'
import { useLogger } from '../useLogger'
import { TresColor } from '../../types'
import { useRenderLoop } from '../useRenderLoop'
import { normalizeColor } from '../../utils/normalize'

import type { Scene, ToneMapping } from 'three'
import type { TresContext } from '../useTresContextProvider'
import type {
  ColorSpace,
  ShadowMapType,
  WebGLRendererParameters,
} from 'three'

type TransformToMaybeRefOrGetter<T> = {
  [K in keyof T]: MaybeRefOrGetter<T[K]> | MaybeRefOrGetter<T[K]>;
};

export interface UseRendererOptions extends TransformToMaybeRefOrGetter<WebGLRendererParameters> {
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
   * Can be NoToneMapping, LinearToneMapping,
   * ReinhardToneMapping, Uncharted2ToneMapping,
   * CineonToneMapping, ACESFilmicToneMapping,
   * CustomToneMapping
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
   * The color value to use when clearing the canvas.
   *
   * @default 0x000000
   */
  clearColor?: MaybeRefOrGetter<TresColor>
  windowSize?: MaybeRefOrGetter<boolean | string>
  preset?: MaybeRefOrGetter<RendererPresetsType>
}

/**
 * Reactive Three.js WebGLRenderer instance
 *
 * @param canvas
 * @param {UseRendererOptions} [options]
 */
export function useRenderer(
  {
    scene,
    canvas,
    options,
    disableRender,
    contextParts: { sizes, camera },
  }:
    {
      canvas: MaybeRef<HTMLCanvasElement>
      scene: Scene
      options: UseRendererOptions
      contextParts: Pick<TresContext, 'sizes' | 'camera'>
      disableRender: MaybeRefOrGetter<boolean>
    }
) {

  const webGLRendererConstructorParameters = computed<WebGLRendererParameters>(() => ({
    alpha: toValue(options.alpha),
    depth: toValue(options.depth),
    canvas: unrefElement(canvas),
    context: toValue(options.context),
    stencil: toValue(options.stencil),
    antialias: toValue(options.antialias) === undefined ? true : toValue(options.antialias), // an opinionated default of tres
    precision: toValue(options.precision),
    powerPreference: toValue(options.powerPreference),
    premultipliedAlpha: toValue(options.premultipliedAlpha),
    preserveDrawingBuffer: toValue(options.preserveDrawingBuffer),
    logarithmicDepthBuffer: toValue(options.logarithmicDepthBuffer),
    failIfMajorPerformanceCaveat: toValue(options.failIfMajorPerformanceCaveat)
  }))

  const renderer = shallowRef<WebGLRenderer>(new WebGLRenderer(webGLRendererConstructorParameters.value))

  // since the properties set via the constructor can't be updated dynamically,
  // the renderer is recreated once they change
  watch(webGLRendererConstructorParameters, () => {
    renderer.value.dispose()
    renderer.value = new WebGLRenderer(webGLRendererConstructorParameters.value)
  })

  watchEffect(() => {
    renderer.value.setSize(sizes.width.value, sizes.height.value)
  })


  const { pixelRatio } = useDevicePixelRatio()

  watchEffect(() => {
    renderer.value.setPixelRatio(pixelRatio.value)
  })

  const { logError } = useLogger()

  const getThreeRendererDefaults = () => {

    const plainRenderer = new WebGLRenderer()

    const defaults = {

      shadowMap: {
        enabled: plainRenderer.shadowMap.enabled,
        type: plainRenderer.shadowMap.type,
      },
      toneMapping: plainRenderer.toneMapping,
      toneMappingExposure: plainRenderer.toneMappingExposure,
      outputColorSpace: plainRenderer.outputColorSpace,
      useLegacyLights: plainRenderer.useLegacyLights
    }
    plainRenderer.dispose()

    return defaults
  }

  const threeDefaults = getThreeRendererDefaults()

  watchEffect(() => {
    const rendererPreset = toValue(options.preset)

    if (rendererPreset) {
      if (!(rendererPreset in rendererPresets))
        logError('Renderer Preset must be one of these: ' + Object.keys(rendererPresets).join(', '))

      merge(renderer.value, rendererPresets[rendererPreset])

      return // TODO should not return here -> discuss with team whether presets should be part of cientos
    }

    const shadows = toValue(options.shadows)
    renderer.value.shadowMap.enabled = shadows !== undefined ? shadows : threeDefaults.shadowMap.enabled

    const shadowMapType = toValue(options.shadowMapType)
    renderer.value.shadowMap.type = shadowMapType !== undefined ? shadowMapType : threeDefaults.shadowMap.type

    const toneMapping = toValue(options.toneMapping)
    renderer.value.toneMapping = toneMapping !== undefined ? toneMapping : threeDefaults.toneMapping

    const toneMappingExposure = toValue(options.toneMappingExposure)
    renderer.value.toneMappingExposure = toneMappingExposure !== undefined ?
      toneMappingExposure : threeDefaults.toneMappingExposure

    const outputColorSpace = toValue(options.outputColorSpace)
    renderer.value.outputColorSpace = outputColorSpace !== undefined ? outputColorSpace : threeDefaults.outputColorSpace

    const useLegacyLights = toValue(options.useLegacyLights)
    renderer.value.useLegacyLights = useLegacyLights !== undefined ? useLegacyLights : threeDefaults.useLegacyLights


    const clearColor = toValue(options.clearColor)
    if (clearColor)
      renderer.value.setClearColor(
        clearColor ?
          normalizeColor(clearColor) :
          new Color(0x000000) // default clear color is not easily/efficiently retrievable from three
      )

  })

  const { pause, resume, onLoop } = useRenderLoop()

  onLoop(() => {
    if (camera.value && !toValue(disableRender))
      renderer.value.render(scene, camera.value)
  })

  resume()

  onUnmounted(() => {
    pause() // TODO should the render loop pause itself if there is no more renderer? 🤔 What if there is another renderer which needs the loop?
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
