import { ACESFilmicToneMapping, Color, WebGLRenderer } from 'three'
import { type MaybeRef, computed, onUnmounted, shallowRef, watch, watchEffect } from 'vue'

import {
  type MaybeRefOrGetter,
  toValue,
  unrefElement,
  useDevicePixelRatio,
} from '@vueuse/core'

import type { ColorSpace, Scene, ShadowMapType, ToneMapping, WebGLRendererParameters } from 'three'
import { useLogger } from '../useLogger'
import type { TresColor } from '../../types'
import { useRenderLoop } from '../useRenderLoop'
import { normalizeColor } from '../../utils/normalize'

import type { TresContext } from '../useTresContextProvider'
import { get, merge, set } from '../../utils'

// Solution taken from Thretle that actually support different versions https://github.com/threlte/threlte/blob/5fa541179460f0dadc7dc17ae5e6854d1689379e/packages/core/src/lib/lib/useRenderer.ts
import { revision } from '../../core/revision'
import { rendererPresets } from './const'
import type { RendererPresetsType } from './const'

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
  renderMode?: MaybeRefOrGetter<'always' | 'on-demand' | 'manual'>
}

export function useRenderer(
  {
    scene,
    canvas,
    options,
    disableRender,
    emit,
    contextParts: { sizes, camera, render, invalidate, advance },
  }:
  {
    canvas: MaybeRef<HTMLCanvasElement>
    scene: Scene
    options: UseRendererOptions
    emit: (event: string, ...args: any[]) => void
    contextParts: Pick<TresContext, 'sizes' | 'camera' | 'render'> & { invalidate: () => void, advance: () => void }
    disableRender: MaybeRefOrGetter<boolean>
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

  const renderer = shallowRef<WebGLRenderer>(new WebGLRenderer(webGLRendererConstructorParameters.value))

  function invalidateOnDemand() {
    if (options.renderMode === 'on-demand') {
      invalidate()
    }
  }
  // since the properties set via the constructor can't be updated dynamically,
  // the renderer is recreated once they change
  watch(webGLRendererConstructorParameters, () => {
    renderer.value.dispose()
    renderer.value = new WebGLRenderer(webGLRendererConstructorParameters.value)

    invalidateOnDemand()
  })

  watch([sizes.width, sizes.height], () => {
    renderer.value.setSize(sizes.width.value, sizes.height.value)
    invalidateOnDemand()
  }, {
    immediate: true,
  })

  watch(() => options.clearColor, invalidateOnDemand)

  const { pixelRatio } = useDevicePixelRatio()

  watch(pixelRatio, () => {
    renderer.value.setPixelRatio(pixelRatio.value)
  })

  const { logError } = useLogger()

  // TheLoop

  /*   const { resume, onLoop } = useRenderLoop()

  onLoop(() => {
    if (camera.value && !toValue(disableRender) && render.frames.value > 0) {
      renderer.value.render(scene, camera.value)
      emit('render', renderer.value)
    }

    // Reset priority
    render.priority.value = 0

    if (toValue(options.renderMode) === 'always') {
      render.frames.value = 1
    }
    else {
      render.frames.value = Math.max(0, render.frames.value - 1)
    }
  })

  resume() */

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
    }, 1)
  }

  watchEffect(() => {
    const rendererPreset = toValue(options.preset)

    if (rendererPreset) {
      if (!(rendererPreset in rendererPresets)) { logError(`Renderer Preset must be one of these: ${Object.keys(rendererPresets).join(', ')}`) }

      merge(renderer.value, rendererPresets[rendererPreset])
    }

    // Render mode

    if (renderMode === 'always') {
      // If the render mode is 'always', ensure there's always a frame pending
      render.frames.value = Math.max(1, render.frames.value)
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
      set(renderer.value, pathInThree, getValue(option, pathInThree))

    setValueOrDefault(options.shadows, 'shadowMap.enabled')
    setValueOrDefault(options.toneMapping ?? ACESFilmicToneMapping, 'toneMapping')
    setValueOrDefault(options.shadowMapType, 'shadowMap.type')

    if (revision < 150) { setValueOrDefault(!options.useLegacyLights, 'physicallyCorrectLights') }

    setValueOrDefault(options.outputColorSpace, 'outputColorSpace')
    setValueOrDefault(options.toneMappingExposure, 'toneMappingExposure')

    const clearColor = getValue(options.clearColor, 'clearColor')

    if (clearColor) {
      renderer.value.setClearColor(
        clearColor
          ? normalizeColor(clearColor)
          : new Color(0x000000), // default clear color is not easily/efficiently retrievable from three
      )
    }
  })

  onUnmounted(() => {
    renderer.value.dispose()
    renderer.value.forceContextLoss()
  })

  /* if (import.meta.hot) { import.meta.hot.on('vite:afterUpdate', resume) } */

  return {
    renderer,
  }
}

export type UseRendererReturn = ReturnType<typeof useRenderer>
