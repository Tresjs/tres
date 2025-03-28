<script setup lang="ts">
import type { App, MaybeRefOrGetter, Ref } from 'vue'
import type { TresObject, TresScene } from '../types/'
import { ACESFilmicToneMapping, PCFSoftShadowMap, PerspectiveCamera, Scene } from 'three'
import * as THREE from 'three'
import type { TresContext } from '../composables'
import { useTresContextProvider } from '../composables'
import type { TransformToMaybeRefOrGetter, TresCamera, TresRenderer } from '../types'
import type { ColorSpace, ShadowMapType, ToneMapping, WebGLRendererParameters } from 'three'

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
  watch,
  watchEffect,
} from 'vue'
import pkg from '../../package.json'
import { extend } from '../core/catalogue'
import { nodeOps } from '../core/nodeOps'

import { registerTresDevtools } from '../devtools'
import { disposeObject3D } from '../utils/'

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

// Define emits for Pointer events, pass `emit` into useTresEventManager so we can emit events off of TresCanvas
// Not sure of this solution, but you have to have emits defined on the component to emit them in vue
const emit = defineEmits([
  'render',
  'click',
  'double-click',
  'context-menu',
  'pointer-move',
  'pointer-up',
  'pointer-down',
  'pointer-enter',
  'pointer-leave',
  'pointer-over',
  'pointer-out',
  'pointer-missed',
  'wheel',
  'ready',
])

const slots = defineSlots<{
  default: () => any
}>()

const canvas = ref<HTMLCanvasElement>()

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
    context.renderer.value.dispose()
    context.renderer.value.renderLists.dispose()
    context.renderer.value.forceContextLoss()
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

onMounted(async () => {
  const existingCanvas = canvas as Ref<HTMLCanvasElement>

  context.value = await useTresContextProvider({
    scene: scene.value as TresScene,
    canvas: existingCanvas,
    windowSize: props.windowSize ?? false,
    rendererOptions: props,
    emit,
  })

  const { registerCamera, camera, cameras, deregisterCamera } = context.value

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
      if (newCamera) { registerCamera(newCamera) }
      if (oldCamera) {
        oldCamera.removeFromParent()
        deregisterCamera(oldCamera)
      }
    },
    {
      immediate: true,
    },
  )

  if (!camera.value) {
    addDefaultCamera()
  }

  // HMR support
  if (import.meta.hot && context.value) { import.meta.hot.on('vite:afterUpdate', () => handleHMR(context.value as TresContext)) }
})

onUnmounted(unmountCanvas)
</script>

<script lang="ts">
export type WebGLRendererProps = TransformToMaybeRefOrGetter<Omit<WebGLRendererParameters, 'canvas'>>

export interface TresCanvasProps extends /* @vue-ignore */ WebGLRendererProps {
  /**
   * WebGL Context options (Readonly because they are passed to the renderer constructor)
   * They can't be changed after the renderer is created because they are passed to the canvas context
   */
  /**
   * Enables antialiasing, smoothing out edges of 3D objects.
   * Uses MSAA (Multisample Anti-Aliasing) when available.
   * @readonly
   * @default true (Opinionated default by TresJS)
   */
  antialias?: MaybeRefOrGetter<boolean>

  /**
   * Enables stencil buffer with 8 bits.
   * Required for stencil-based operations like shadow volumes or post-processing effects.
   * @readonly
   * @default true
   */
  stencil?: MaybeRefOrGetter<boolean>

  /**
   * Enables depth buffer with at least 16 bits.
   * Required for proper 3D rendering and depth testing.
   * @readonly
   * @default true
   */
  depth?: MaybeRefOrGetter<boolean>

  /**
   * Enables logarithmic depth buffer. Useful for scenes with large differences in scale.
   * Helps prevent z-fighting in scenes with objects very close and very far from the camera.
   * @readonly
   * @default false
   */
  logarithmicDepthBuffer?: MaybeRefOrGetter<boolean>

  /**
   * Preserves the buffers until manually cleared or overwritten.
   * Needed for screenshots or when reading pixels from the canvas.
   * Warning: This may impact performance.
   * @readonly
   * @default false
   */
  preserveDrawingBuffer?: MaybeRefOrGetter<boolean>

  /**
   * Power preference for the renderer.
    * Power preference for the renderer.
    * - `default`: Automatically chooses the most suitable power setting.
    * - `high-performance`: Prioritizes rendering performance.
    * - `low-power`: Tries to reduce power usage.
   * @see {@link https://threejs.org/docs/#api/en/renderers/WebGLRenderer}
   * @default 'default'
   */
  powerPreference?: MaybeRefOrGetter<WebGLPowerPreference>

  /**
   * WebGL options with set methods
   * @see {@link https://threejs.org/docs/#api/en/renderers/WebGLRenderer}
   */

  /**
   * Clear color for the canvas
   *
   */
  clearColor?: MaybeRefOrGetter<string>

  /**
   * Whether to enable alpha blending
   * @default false
   */
  alpha?: MaybeRefOrGetter<boolean>
  /**
   * Enable shadow rendering in the scene
   * @default false
   */
  shadows?: MaybeRefOrGetter<boolean>

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
  toneMapping?: MaybeRefOrGetter<ToneMapping | number>

  /**
   * Type of shadow map to use for shadow calculations
   * - `BasicShadowMap`: Basic shadow map.
   * - `PCFShadowMap`: Percentage-Closer Filtering shadow map.
   * - `PCFSoftShadowMap`: Percentage-Closer Filtering soft shadow map.
   * - `VSMShadowMap`: Variance shadow map.
   * @see {@link https://threejs.org/docs/#api/en/constants/Renderer}
   * @default PCFSoftShadowMap (Opinionated default by TresJS)
   */
  shadowMapType?: MaybeRefOrGetter<ShadowMapType | number>

  /**
   * Whether to use legacy lights system instead of the new one
   * @deprecated Use `useLegacyLights: false` for the new lighting system
   */
  useLegacyLights?: boolean

  /**
   * Color space for the output render
   * @see {@link https://threejs.org/docs/#api/en/constants/Renderer}
   */
  outputColorSpace?: MaybeRefOrGetter<ColorSpace>

  /**
   * Exposure level of tone mapping
   * @default 1
   */
  toneMappingExposure?: MaybeRefOrGetter<number>

  /**
   * Rendering mode for the canvas
   * - 'always': Renders every frame
   * - 'on-demand': Renders only when changes are detected
   * - 'manual': Renders only when explicitly called
   * @default 'always'
   */
  renderMode?: MaybeRefOrGetter<'always' | 'on-demand' | 'manual'>

  /**
   * Device Pixel Ratio for the renderer
   * Can be a single number or a tuple defining a range [min, max]
   */
  dpr?: MaybeRefOrGetter<number | [number, number]>

  /**
   * Custom WebGL renderer instance
   * Allows using a pre-configured renderer instead of creating a new one
   */
  renderer?: (ctx: TresContext) => Promise<TresRenderer>

  /**
   * Custom camera instance to use as main camera
   * If not provided, a default PerspectiveCamera will be created
   */
  camera?: TresCamera

  /**
   * Whether the canvas should be sized to the window
   * When true, canvas will be fixed positioned and full viewport size
   * @default false
   */
  windowSize?: MaybeRefOrGetter<boolean>

  /**
   * Whether to enable the provide/inject bridge between Vue and TresJS
   * When true, Vue's provide/inject will work across the TresJS boundary
   * @default true
   */
  enableProvideBridge?: MaybeRefOrGetter<boolean>
}
</script>

<template>
  <canvas
    ref="canvas"
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
