import type { ColorRepresentation, ColorSpace, Object3D, ShadowMapType, ToneMapping } from 'three'

import type { TresContext } from '../useTresContextProvider'

import {
  createEventHook,
  unrefElement,
  useTimeout,
} from '@vueuse/core'
import { Material, Mesh, WebGLRenderer } from 'three'
import { computed, type MaybeRef, onUnmounted, type Reactive, ref, type ShallowRef, toValue, watch, watchEffect } from 'vue'
import type { Renderer } from 'three/webgpu'

// Solution taken from Thretle that actually support different versions https://github.com/threlte/threlte/blob/5fa541179460f0dadc7dc17ae5e6854d1689379e/packages/core/src/lib/lib/useRenderer.ts
import { setPixelRatio } from './pixelRatio'

import { logWarning } from '../../utils/logger'
import type { SizesType } from '../useSizes'
import type { UseCameraReturn } from '../useCamera'
import type { TresScene } from '../../types'
import { isFunction, isObject } from '../../utils/is'
import { useCreateRafLoop } from '../useCreateRafLoop'

/**
 * If set to 'on-demand', the scene will only be rendered when the current frame is invalidated
 * If set to 'manual', the scene will only be rendered when advance() is called
 * If set to 'always', the scene will be rendered every frame
 */
export type RenderMode = 'always' | 'on-demand' | 'manual'
export type RenderFunction = (notifySuccess: () => void) => void

export type TresRenderer = WebGLRenderer | Renderer

export interface RendererOptions {
  /**
   * WebGL Context options (Readonly because they are passed to the renderer constructor)
   * They can't be changed after the renderer is created because they are passed to the canvas context
   */
  antialias?: boolean
  /**
   * Enables stencil buffer with 8 bits.
   * Required for stencil-based operations like shadow volumes or post-processing effects.
   * @readonly
   * @default true
   */
  stencil?: boolean

  /**
   * Enables depth buffer with at least 16 bits.
   * Required for proper 3D rendering and depth testing.
   * @readonly
   * @default true
   */
  depth?: boolean

  /**
   * Sets the shader precision of the renderer.
   * @see {@link https://threejs.org/docs/#api/en/renderers/WebGLRenderer}
   * @default 'highp'
   */
  precision?: 'highp' | 'mediump' | 'lowp'

  /**
   * Enables logarithmic depth buffer. Useful for scenes with large differences in scale.
   * Helps prevent z-fighting in scenes with objects very close and very far from the camera.
   * @readonly
   * @default false
   */
  logarithmicDepthBuffer?: boolean
  /**
   * Preserves the buffers until manually cleared or overwritten.
   * Needed for screenshots or when reading pixels from the canvas.
   * Warning: This may impact performance.
   * @readonly
   * @default false
   */
  preserveDrawingBuffer?: boolean
  /**
   * Power preference for the renderer.
    * Power preference for the renderer.
    * - `default`: Automatically chooses the most suitable power setting.
    * - `high-performance`: Prioritizes rendering performance.
    * - `low-power`: Tries to reduce power usage.
   * @see {@link https://threejs.org/docs/#api/en/renderers/WebGLRenderer}
   * @default 'default'
   * @readonly
   */
  powerPreference?: WebGLPowerPreference
  /**
     * Whether to create the WebGL context with an alpha buffer.
     * This is a WebGL context option that must be set during context creation and cannot be changed later.
     * When true, the canvas can be transparent, showing content behind it.
     * @readonly
     * @default false
     */
  alpha?: boolean
  /**
   * Whether to premultiply the alpha of the canvas.
   * @see {@link https://threejs.org/docs/#api/en/renderers/WebGLRenderer}
   * @default true
   */
  premultipliedAlpha?: boolean
  /**
   * Whether to fail if the major performance caveat is detected.
   * @see {@link https://threejs.org/docs/#api/en/renderers/WebGLRenderer}
   * @default false
   */
  failIfMajorPerformanceCaveat?: boolean
  /**
   * WebGL options with set methods
   * @see {@link https://threejs.org/docs/#api/en/renderers/WebGLRenderer}
   */
  /**
   * Clear color for the canvas
   * Can include alpha value (e.g. '#00808000' for fully transparent teal)
   */
  clearColor?: ColorRepresentation
  /**
   * The opacity of the clear color (0-1)
   * Controls the transparency of the clear color
   * @default 1
   */
  clearAlpha?: number
  /**
   * Enable shadow rendering in the scene
   * @default false
   */
  shadows?: boolean
  /**
   * Tone mapping technique to use for the scene
   * - `NoToneMapping`: No tone mapping is applied.
   * - `LinearToneMapping`: Linear tone mapping.
   * - `ReinhardToneMapping`: Reinhard tone mapping.
   * - `CineonToneMapping`: Cineon tone mapping.
   * - `ACESFilmicToneMapping`: ACES Filmic tone mapping.
   * - `AgXToneMapping`: AgX tone mapping.
   * - `NeutralToneMapping`: Neutral tone mapping.
   * @see {@link https://threejs.org/docs/#api/en/constants/Renderer}
   * @default ACESFilmicToneMapping (Opinionated default by TresJS)
   */
  toneMapping?: ToneMapping
  /**
   * Type of shadow map to use for shadow calculations
   * - `BasicShadowMap`: Basic shadow map.
   * - `PCFShadowMap`: Percentage-Closer Filtering shadow map.
   * - `PCFSoftShadowMap`: Percentage-Closer Filtering soft shadow map.
   * - `VSMShadowMap`: Variance shadow map.
   * @see {@link https://threejs.org/docs/#api/en/constants/Renderer}
   * @default PCFSoftShadowMap (Opinionated default by TresJS)
   */
  shadowMapType?: ShadowMapType
  /**
   * Whether to use legacy lights system instead of the new one
   * @deprecated Use `useLegacyLights: false` for the new lighting system
   */
  useLegacyLights?: boolean
  /**
   * Color space for the output render
   * @see {@link https://threejs.org/docs/#api/en/constants/Renderer}
   */
  outputColorSpace?: ColorSpace
  /**
   * Exposure level of tone mapping
   * @default 1
   */
  toneMappingExposure?: number
  /**
   * Rendering mode for the canvas
   * - 'always': Renders every frame
   * - 'on-demand': Renders only when changes are detected
   * - 'manual': Renders only when explicitly called
   * @default 'always'
   */
  renderMode?: 'always' | 'on-demand' | 'manual'
  /**
   * Device Pixel Ratio for the renderer
   * Can be a single number or a tuple defining a range [min, max]
   */
  dpr?: number | [number, number]
  /**
   * Custom WebGL renderer instance
   * Allows using a pre-configured renderer instead of creating a new one
   */
  renderer?: (ctx: TresRendererSetupContext) => TresRenderer
}

export interface TresRendererSetupContext {
  sizes: SizesType
  scene: ShallowRef<TresScene>
  camera: UseCameraReturn
  canvas: MaybeRef<HTMLCanvasElement>
}

export interface UseRendererOptions {
  scene: ShallowRef<TresScene>
  canvas: MaybeRef<HTMLCanvasElement>
  options: Reactive<RendererOptions>
  contextParts: Pick<TresContext, 'sizes' | 'camera'>
}

export function useRendererManager(
  {
    scene,
    canvas,
    options,
    contextParts: { sizes, camera },
  }: UseRendererOptions,
) {
  const getRenderer = () => {
    if (isFunction(options.renderer)) {
      return options.renderer({
        sizes,
        scene,
        camera,
        canvas,
      })
    }

    return new WebGLRenderer({
      ...options,
      canvas: unrefElement(canvas),
    })
  }

  const renderer = getRenderer()

  const frames = ref(toValue(options.renderMode) === 'manual' ? 0 : 1) // 1 to make sure the first frame is rendered
  const maxFrames = 60
  const canBeInvalidated = computed(() => toValue(options.renderMode) === 'on-demand' && frames.value === 0)

  const forceMaterialUpdate = () =>
    scene.value.traverse((child: Object3D) => {
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

  // be aware that the WebGLRenderer does not extend from Renderer
  const isRenderer = (value: unknown): value is Renderer =>
    isObject(value) && 'isRenderer' in value && Boolean(value.isRenderer)

  const readyEventHook = createEventHook<TresRenderer>()
  const errorEventHook = createEventHook<Error>()
  let hasTriggeredReady = false

  // Track whether the renderer has been initialized (important for WebGPU)
  const isInitialized = ref(false)
  const initializationError = ref<Error | null>(null)

  // Initialize renderer asynchronously (required for WebGPU in Three.js r181+)
  const initializeRenderer = async () => {
    try {
      if (isRenderer(renderer)) {
        // WebGPU renderer requires awaiting init() before any operations
        await renderer.init()
        isInitialized.value = true
        readyEventHook.trigger(renderer)
      }
      else {
        // WebGLRenderer is ready immediately (no async init needed)
        isInitialized.value = true
        // Still need to trigger ready for WebGLRenderer for backward compatibility
        readyEventHook.trigger(renderer)
      }
    }
    catch (error) {
      // Handle initialization errors (e.g., WebGPU not supported, GPU initialization failure)
      const rendererError = error instanceof Error
        ? error
        : new Error('Renderer initialization failed: Unknown error')
      
      initializationError.value = rendererError
      
      // Log detailed error message to help users diagnose the issue
      console.error(
        '[TresJS] Renderer initialization failed. This may occur if:\n'
        + '  - WebGPU is not supported by your browser\n'
        + '  - GPU is not available or lacks required features\n'
        + '  - GPU drivers are outdated\n'
        + `Error details: ${rendererError.message}`,
        rendererError,
      )
      
      // Trigger error event hook for user-defined error handlers
      errorEventHook.trigger(rendererError)
    }
  }

  // Start initialization process
  initializeRenderer()

  const renderEventHook = createEventHook<TresRenderer>()

  const notifyFrameRendered = () => {
    frames.value = isModeAlways.value
      ? 1
      : Math.max(0, frames.value - 1)

    renderEventHook.trigger(renderer)
  }

  let renderFunction: RenderFunction = (_notifyFrameRendered) => {
    if (camera.activeCamera.value) {
      renderer.render(scene.value, camera.activeCamera.value)
      _notifyFrameRendered()
    }
  }

  const replaceRenderFunction = (fn: RenderFunction) => {
    renderFunction = fn
  }

  const loop = useCreateRafLoop(() => {
    if (frames.value) {
      renderFunction(notifyFrameRendered)
    }
  })

  // Only start the render loop after renderer initialization is complete
  readyEventHook.on(() => {
    if (isInitialized.value) {
      loop.start()
    }
  })

  // Watch the sizes and invalidate the renderer when they change
  // Also watch isInitialized to ensure size is set once renderer is ready
  watch([sizes.width, sizes.height, isInitialized], () => {
    // Wait for renderer initialization before setting size (required for WebGPU)
    if (!isInitialized.value) { return }
    
    renderer.setSize(sizes.width.value, sizes.height.value)

    if (!hasTriggeredReady && renderer.domElement.width && renderer.domElement.height) {
      readyEventHook.trigger(renderer)
      hasTriggeredReady = true
    }

    invalidateOnDemand()
  }, {
    immediate: true,
  })

  watchEffect(() => {
    if (!isInitialized.value) { return }
    setPixelRatio(renderer, sizes.pixelRatio.value, toValue(options.dpr))
  })

  if (toValue(options.renderMode) === 'on-demand') {
    // Invalidate for the first time
    invalidate()
  }

  if (toValue(options.renderMode) === 'manual') {
    // Advance for the first time, setTimeout to make sure there is something to render
    useTimeout(100, {
      callback: advance,
    })
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
  // All watchers must wait for renderer initialization (especially for WebGPU)
  watchEffect(() => {
    if (!isInitialized.value) { return }
    const value = clearColorAndAlpha.value
    if (value.color === undefined || value.alpha === undefined) { return }
    renderer.setClearColor(value.color, value.alpha)
  })

  watchEffect(() => {
    if (!isInitialized.value) { return }
    const value = options.toneMapping
    if (value) {
      renderer.toneMapping = value
    }
  })

  watchEffect(() => {
    if (!isInitialized.value) { return }
    const value = options.toneMappingExposure
    if (value) {
      renderer.toneMappingExposure = value
    }
  })

  watchEffect(() => {
    if (!isInitialized.value) { return }
    const value = options.outputColorSpace
    if (value) {
      renderer.outputColorSpace = value
    }
  })

  watchEffect(() => {
    if (!isInitialized.value) { return }
    const value = options.shadows
    if (value === undefined) { return }
    renderer.shadowMap.enabled = value
    forceMaterialUpdate()
  })

  watchEffect(() => {
    if (!isInitialized.value) { return }
    const value = options.shadowMapType
    if (value === undefined) { return }
    renderer.shadowMap.type = value
    forceMaterialUpdate()
  })

  onUnmounted(() => {
    renderer.dispose()
    if ('forceContextLoss' in renderer) {
      renderer.forceContextLoss()
    }
  })

  return {
    loop,
    instance: renderer,
    advance,
    onReady: readyEventHook.on,
    onRender: renderEventHook.on,
    onError: errorEventHook.on,
    invalidate,
    canBeInvalidated,
    mode: toValue(options.renderMode),
    replaceRenderFunction,
    isInitialized,
    initializationError,
  }
}

export type UseRendererManagerReturn = ReturnType<typeof useRendererManager>
