import type { ColorSpace, Scene, ShadowMapType, ToneMapping, WebGLRendererParameters } from 'three'
import type { TresColor } from '../../types'

import type { TresContext } from '../useTresContextProvider'

import type { RendererPresetsType } from './const'
import {
  createEventHook,
  type MaybeRefOrGetter,
  unrefElement,
  useDevicePixelRatio,
} from '@vueuse/core'
import { ACESFilmicToneMapping, Color, WebGLRenderer } from 'three'
import { computed, type MaybeRef, onUnmounted, readonly, ref, shallowRef, toValue, watch, watchEffect } from 'vue'

// Solution taken from Thretle that actually support different versions https://github.com/threlte/threlte/blob/5fa541179460f0dadc7dc17ae5e6854d1689379e/packages/core/src/lib/lib/useRenderer.ts
import { revision } from '../../core/revision'
import { get, merge, set, setPixelRatio } from '../../utils'

import { normalizeColor } from '../../utils/normalize'
import { logError } from '../../utils/logger'
import { rendererPresets } from './const'

type TransformToMaybeRefOrGetter<T> = {
  [K in keyof T]: MaybeRefOrGetter<T[K]> | MaybeRefOrGetter<T[K]>;
}

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
   * @default ACESFilmicToneMapping
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
  renderMode?: MaybeRef<RenderMode>
  /**
   * A `number` sets the renderer's device pixel ratio.
   * `[number, number]` clamp's the renderer's device pixel ratio.
   */
  dpr?: MaybeRefOrGetter<number | [number, number]>
}

/**
 * If set to 'on-demand', the scene will only be rendered when the current frame is invalidated
 * If set to 'manual', the scene will only be rendered when advance() is called
 * If set to 'always', the scene will be rendered every frame
 */
export type RenderMode = 'always' | 'on-demand' | 'manual'

export function useRenderer(
  {
    scene,
    canvas,
    options,
    contextParts: { sizes, loop, camera },
  }:
  {
    scene: Scene
    canvas: MaybeRef<HTMLCanvasElement>
    options: UseRendererOptions
    contextParts: Pick<TresContext, 'sizes' | 'camera' | 'loop'>
  },
) {
  const webGLRendererConstructorParameters = computed<WebGLRendererParameters>(() => ({
    alpha: toValue(options.alpha) ?? true,
    depth: toValue(options.depth),
    canvas: unrefElement(canvas),
    context: toValue(options.context),
    stencil: toValue(options.stencil),
    antialias: toValue(options.antialias) ?? true,
    precision: toValue(options.precision),
    powerPreference: toValue(options.powerPreference),
    premultipliedAlpha: toValue(options.premultipliedAlpha),
    preserveDrawingBuffer: toValue(options.preserveDrawingBuffer),
    logarithmicDepthBuffer: toValue(options.logarithmicDepthBuffer),
    failIfMajorPerformanceCaveat: toValue(options.failIfMajorPerformanceCaveat),
  }))

  const instance = shallowRef<WebGLRenderer>(new WebGLRenderer(webGLRendererConstructorParameters.value)) // TODO rename

  const amountOfFramesToRender = ref(0) // TODO does this even need reactivity?
  const maxFrames = 60
  const canBeInvalidated = computed(() => toValue(options.renderMode) === 'on-demand' && amountOfFramesToRender.value === 0) // TODO why  "=== 0" // TODO was this public before?

  /**
   * Invalidates the current frame when in on-demand render mode.
   */
  const invalidate = (amountOfFramesToInvalidate = 1) => {
    // TODO The docs show this is called in manual mode. Why?
    if (toValue(options.renderMode) !== 'on-demand') {
      throw new Error('invalidate can only be called in on-demand render mode.')
    }

    if (canBeInvalidated.value) {
      amountOfFramesToRender.value = Math.min(maxFrames, amountOfFramesToRender.value + amountOfFramesToInvalidate)
    }
  }

  /**
   * Advances one frame when in manual render mode.
   */
  const advance = () => {
    if (toValue(options.renderMode) !== 'manual') {
      throw new Error('advance can only be called in manual render mode.')
    }

    amountOfFramesToRender.value = 1
  }

  const invalidateOnDemand = () => {
    if (toValue(options.renderMode) === 'on-demand') {
      invalidate()
    }
  }

  const isModeAlways = computed(() => toValue(options.renderMode) === 'always')

  const onRender = createEventHook<WebGLRenderer>()

  loop.register(() => {
    if (camera.value && amountOfFramesToRender.value) {
      instance.value.render(scene, camera.value)

      onRender.trigger(instance.value)
    }

    amountOfFramesToRender.value = isModeAlways.value
      ? 1
      : Math.max(0, amountOfFramesToRender.value - 1)
  }, 'render')

  // since the properties set via the constructor can't be updated dynamically,
  // the renderer is recreated once they change
  watch(webGLRendererConstructorParameters, () => {
    instance.value.dispose()
    instance.value = new WebGLRenderer(webGLRendererConstructorParameters.value)

    invalidateOnDemand()
  })

  watch([sizes.width, sizes.height], () => {
    instance.value.setSize(sizes.width.value, sizes.height.value)
    invalidateOnDemand()
  }, {
    immediate: true,
  })

  watch(() => options.clearColor, invalidateOnDemand)

  const { pixelRatio } = useDevicePixelRatio()

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
    }
    plainRenderer.dispose()

    return defaults
  }

  const threeDefaults = getThreeRendererDefaults()

  const renderMode = toValue(options.renderMode)

  if (renderMode === 'on-demand') {
    // Invalidate for the first time
    invalidate()
  }

  if (renderMode === 'manual') {
    // Advance for the first time, setTimeout to make sure there is something to render
    setTimeout(() => {
      advance()
    }, 100)
  }

  watchEffect(() => {
    const rendererPreset = toValue(options.preset)

    if (rendererPreset) {
      if (!(rendererPreset in rendererPresets)) { logError(`Renderer Preset must be one of these: ${Object.keys(rendererPresets).join(', ')}`) }

      merge(instance.value, rendererPresets[rendererPreset])
    }

    setPixelRatio(instance.value, pixelRatio.value, toValue(options.dpr))

    // Render mode

    if (renderMode === 'always') {
      // If the render mode is 'always', ensure there's always a frame pending
      amountOfFramesToRender.value = Math.max(1, amountOfFramesToRender.value)
    }

    const getValue = <T>(option: MaybeRefOrGetter<T>, pathInThree: string): T | undefined => {
      const value = toValue(option)

      const getValueFromPreset = () => {
        if (!rendererPreset) { return }

        return get(rendererPresets[rendererPreset], pathInThree)
      }

      if (value !== undefined) { return value }

      const valueInPreset = getValueFromPreset() as T

      if (valueInPreset !== undefined) { return valueInPreset }

      return get(threeDefaults, pathInThree)
    }

    const setValueOrDefault = <T>(option: MaybeRefOrGetter<T>, pathInThree: string) =>
      set(instance.value, pathInThree, getValue(option, pathInThree))

    setValueOrDefault(options.shadows, 'shadowMap.enabled')
    setValueOrDefault(options.toneMapping ?? ACESFilmicToneMapping, 'toneMapping')
    setValueOrDefault(options.shadowMapType, 'shadowMap.type')

    if (revision < 150) { setValueOrDefault(!options.useLegacyLights, 'physicallyCorrectLights') }

    setValueOrDefault(options.outputColorSpace, 'outputColorSpace')
    setValueOrDefault(options.toneMappingExposure, 'toneMappingExposure')

    const clearColor = getValue(options.clearColor, 'clearColor')

    if (clearColor) {
      instance.value.setClearColor(
        clearColor
          ? normalizeColor(clearColor)
          : new Color(0x000000), // default clear color is not easily/efficiently retrievable from three
      )
    }
  })

  onUnmounted(() => {
    instance.value.dispose()
    instance.value.forceContextLoss()
  })

  return {
    instance: readonly(instance),

    advance,
    onRender,
    invalidate,

    canBeInvalidated,
  }
}

export type UseRendererReturn = ReturnType<typeof useRenderer>
