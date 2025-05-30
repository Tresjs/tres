<script setup lang="ts">
import type {
  Camera,
  ColorRepresentation,
  ColorSpace,
  ShadowMapType,
  ToneMapping,
  WebGLRenderer,
} from 'three'
import type { App, Ref } from 'vue'
import type { TresObject, TresPointerEvent, TresScene } from '../types/'
import { ACESFilmicToneMapping, PCFSoftShadowMap, PerspectiveCamera, Scene } from 'three'
import * as THREE from 'three'

import {
  createRenderer,
  defineComponent,
  Fragment,
  getCurrentInstance,
  h,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowRef,
  toValue,
  watch,
  watchEffect,
} from 'vue'
import pkg from '../../package.json'
import {
  type TresContext,
  useTresContextProvider,
} from '../composables'
import { extend } from '../core/catalogue'
import { nodeOps } from '../core/nodeOps'

import { disposeObject3D, kebabToCamel } from '../utils/'
import { registerTresDevtools } from '../devtools'
import { whenever } from '@vueuse/core'

const props = withDefaults(defineProps<TresCanvasProps>(), {
  alpha: undefined,
  depth: undefined,
  shadows: undefined,
  stencil: undefined,
  antialias: true,
  windowSize: undefined,
  useLegacyLights: undefined,
  preserveDrawingBuffer: undefined,
  logarithmicDepthBuffer: undefined,
  failIfMajorPerformanceCaveat: undefined,
  renderMode: 'always',
  enableProvideBridge: true,
  toneMapping: ACESFilmicToneMapping,
  shadowMapType: PCFSoftShadowMap,
})

const emit = defineEmits<{
  ready: [context: TresContext]
  render: [renderer: WebGLRenderer]

  click: [event: TresPointerEvent]
  doubleClick: [event: TresPointerEvent]
  contextMenu: [event: TresPointerEvent]
  pointerMove: [event: TresPointerEvent]
  pointerUp: [event: TresPointerEvent]
  pointerDown: [event: TresPointerEvent]
  pointerEnter: [event: TresPointerEvent]
  pointerLeave: [event: TresPointerEvent]
  pointerOver: [event: TresPointerEvent]
  pointerOut: [event: TresPointerEvent]
  pointerMissed: [event: TresPointerEvent]
  wheel: [event: TresPointerEvent]
}>()

const slots = defineSlots<{
  default: () => any
}>()

const canvasRef = ref<HTMLCanvasElement>()

/*
 `scene` is defined here and not in `useTresContextProvider` because the custom
 renderer uses it to mount the app nodes. This happens before `useTresContextProvider` is called.
 The custom renderer requires `scene` to be editable (not readonly).
*/
const scene = shallowRef<TresScene | Scene>(new Scene())

const instance = getCurrentInstance()
extend(THREE)

const createInternalComponent = (context: TresContext, empty = false) =>
  defineComponent({
    setup() {
      const ctx = getCurrentInstance()?.appContext
      if (ctx) { ctx.app = instance?.appContext.app as App }
      const provides: { [key: string | symbol]: unknown } = {}

      // Helper function to recursively merge provides from parents
      function mergeProvides(currentInstance: any) {
        if (!currentInstance) { return }

        // Recursively process the parent instance
        if (currentInstance.parent) {
          mergeProvides(currentInstance.parent)
        }
        // Extract provides from the current instance and merge them
        if (currentInstance.provides) {
          Object.assign(provides, currentInstance.provides)
        }
      }

      // Start the recursion from the initial instance
      if (instance?.parent && props.enableProvideBridge) {
        mergeProvides(instance.parent)

        Reflect.ownKeys(provides)
          .forEach((key) => {
            provide(key, provides[key])
          })
      }

      provide('useTres', context)
      provide('extend', extend)

      if (typeof window !== 'undefined') {
        registerTresDevtools(ctx?.app, context)
      }
      return () => h(Fragment, null, !empty ? slots.default() : [])
    },
  })

const mountCustomRenderer = (context: TresContext, empty = false) => {
  const InternalComponent = createInternalComponent(context, empty)
  const { render } = createRenderer(nodeOps(context))
  render(h(InternalComponent), scene.value as unknown as TresObject)
}

const dispose = (context: TresContext, force = false) => {
  disposeObject3D(context.scene.value as unknown as TresObject)
  if (force) {
    context.renderer.instance.value.dispose()
    context.renderer.instance.value.renderLists.dispose()
    context.renderer.instance.value.forceContextLoss()
  }
  (scene.value as TresScene).__tres = {
    root: context,
  }
}

const context = shallowRef<TresContext | null>(null)

defineExpose({ context, dispose: () => dispose(context.value as TresContext, true) })

const handleHMR = (context: TresContext) => {
  dispose(context)
  mountCustomRenderer(context)
}

const unmountCanvas = () => {
  dispose(context.value as TresContext)
  mountCustomRenderer(context.value as TresContext, true)
}

onMounted(() => {
  const existingCanvas = canvasRef as Ref<HTMLCanvasElement>

  context.value = useTresContextProvider({
    scene: scene.value as TresScene,
    canvas: existingCanvas,
    windowSize: props.windowSize ?? false,
    rendererOptions: props,
  })

  const { camera, renderer } = context.value
  const { registerCamera, cameras, activeCamera, deregisterCamera } = camera

  mountCustomRenderer(context.value)

  const addDefaultCamera = () => {
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.set(3, 3, 3)
    camera.lookAt(0, 0, 0)
    registerCamera(camera)

    const unwatch = watchEffect(() => {
      if (cameras.value.length >= 2) {
        camera.removeFromParent()
        deregisterCamera(camera)
        unwatch?.()
      }
    })
  }

  watch(
    () => props.camera,
    (newCamera, oldCamera) => {
      if (newCamera) {
        registerCamera(toValue(newCamera), true)
      }
      if (oldCamera) {
        toValue(oldCamera).removeFromParent()
        deregisterCamera(toValue(oldCamera))
      }
    },
    {
      immediate: true,
    },
  )

  if (!activeCamera.value) {
    addDefaultCamera()
  }

  renderer.onRender.on((renderer) => {
    emit('render', renderer)
  })

  context.value.eventManager?.onEvent(({ type, event, intersection }) => {
    emit(
      kebabToCamel(type) as any, // typescript doesn't know that kebabToCamel(type) is a valid key of PointerEmits
      { type, event, intersection },
    )
  })

  // HMR support
  if (import.meta.hot && context.value) { import.meta.hot.on('vite:afterUpdate', () => handleHMR(context.value as TresContext)) }
})

whenever(() => context.value?.renderer.isReady, () => {
  if (context.value) { emit('ready', context.value) }
}, { once: true })

onUnmounted(unmountCanvas)
</script>

<script lang="ts">
export interface TresCanvasProps {
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
  // renderer?: (ctx: TresRendererSetupContext) => Promise<TresRenderer> | TresRenderer
  /**
   * Custom camera instance to use as main camera
   * If not provided, a default PerspectiveCamera will be created
   */
  camera?: Camera
  /**
   * Whether the canvas should be sized to the window
   * When true, canvas will be fixed positioned and full viewport size
   * @default false
   */
  windowSize?: boolean
  /**
   * Whether to enable the provide/inject bridge between Vue and TresJS
   * When true, Vue's provide/inject will work across the TresJS boundary
   * @default true
   */
  enableProvideBridge?: boolean
}
</script>

<template>
  <canvas
    ref="canvasRef"
    :data-scene="scene.uuid"
    :class="$attrs.class"
    :data-tres="`tresjs ${pkg.version}`"
    :style="{
      display: 'block',
      width: '100%',
      height: '100%',
      position: windowSize ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      pointerEvents: 'auto',
      touchAction: 'none',
      ...$attrs.style as Object,
    }"
  ></canvas>
</template>
