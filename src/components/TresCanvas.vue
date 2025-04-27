<script setup lang="ts">
import type {
  ColorSpace,
  ShadowMapType,
  ToneMapping,
  WebGLRendererParameters,
} from 'three'
import type { App, MaybeRef, Ref } from 'vue'
import type { RendererPresetsType } from '../composables/useRenderer/const'
import type { TresCamera, TresObject, TresScene } from '../types/'
import { PerspectiveCamera, Scene } from 'three'
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

import { disposeObject3D } from '../utils/'
import { registerTresDevtools } from '../devtools'

export interface TresCanvasProps
  extends Omit<WebGLRendererParameters, 'canvas'> {
  // required by for useRenderer
  shadows?: boolean
  clearColor?: string
  toneMapping?: ToneMapping
  shadowMapType?: ShadowMapType
  useLegacyLights?: boolean
  outputColorSpace?: ColorSpace
  toneMappingExposure?: number
  renderMode?: 'always' | 'on-demand' | 'manual'
  dpr?: number | [number, number]

  // required by useTresContextProvider
  camera?: MaybeRef<TresCamera>
  preset?: RendererPresetsType
  windowSize?: boolean

  // Misc opt-out flags
  enableProvideBridge?: boolean
}

const props = withDefaults(defineProps<TresCanvasProps>(), {
  alpha: undefined,
  depth: undefined,
  shadows: undefined,
  stencil: undefined,
  antialias: undefined,
  windowSize: undefined,
  useLegacyLights: undefined,
  preserveDrawingBuffer: undefined,
  logarithmicDepthBuffer: undefined,
  failIfMajorPerformanceCaveat: undefined,
  renderMode: 'always',
  enableProvideBridge: true,
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

onMounted(() => {
  const existingCanvas = canvas as Ref<HTMLCanvasElement>

  context.value = useTresContextProvider({
    scene: scene.value as TresScene,
    canvas: existingCanvas,
    windowSize: props.windowSize ?? false,
    rendererOptions: props,
    emit,
  })

  const { camera } = context.value
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

  // HMR support
  if (import.meta.hot && context.value) { import.meta.hot.on('vite:afterUpdate', () => handleHMR(context.value as TresContext)) }
})

onUnmounted(unmountCanvas)
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
