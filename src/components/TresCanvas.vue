<script setup lang="ts">
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import type { App, Ref } from 'vue'
import type { TresCamera, TresObject, TresScene } from '../types/'
import type { PointerEvent } from '@pmndrs/pointer-events'
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
import type { RendererOptions, TresContext, TresRenderer } from '../composables'
import { useTresContextProvider } from '../composables'
import { extend } from '../core/catalogue'
import { nodeOps } from '../core/nodeOps'

import { disposeObject3D } from '../utils/'
import { registerTresDevtools } from '../devtools'
import type { TresPointerEventName } from '../utils/pointerEvents'

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
  clearColor: '#000000',
  clearAlpha: 1,
  enableProvideBridge: true,
  toneMapping: ACESFilmicToneMapping,
  shadowMapType: PCFSoftShadowMap,
})

const emit = defineEmits<{
  ready: [context: TresContext]
  render: [renderer: TresRenderer]
  pointermissed: [event: PointerEvent<MouseEvent>]
} & {
  // all pointer events are supported because they bubble up
  [key in TresPointerEventName]: [event: PointerEvent<MouseEvent>]
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

      if (typeof window !== 'undefined' && ctx?.app) {
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
    if (context.renderer.instance.value instanceof WebGLRenderer) {
      context.renderer.instance.value.renderLists.dispose()
      context.renderer.instance.value.forceContextLoss()
    }
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

  context.value.events.onPointerMissed((event) => {
    emit('pointermissed', event)
  })

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

  renderer.onRender((renderer) => {
    emit('render', renderer)
  })

  renderer.onReady(() => {
    emit('ready', context.value!)
  })

  // HMR support
  if (import.meta.hot && context.value) { import.meta.hot.on('vite:afterUpdate', () => handleHMR(context.value as TresContext)) }
})

onUnmounted(unmountCanvas)
</script>

<script lang="ts">
export interface TresCanvasProps extends RendererOptions {
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
