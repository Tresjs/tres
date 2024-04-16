<script setup lang="ts">
import { PerspectiveCamera, Scene } from 'three'
import type {
  ColorSpace,
  ShadowMapType,
  ToneMapping,
  WebGLRendererParameters,
} from 'three'
import * as THREE from 'three'
import type { App, Ref } from 'vue'
import {
  Fragment,
  computed,
  createRenderer,
  defineComponent,
  getCurrentInstance,
  h,
  onMounted,
  provide,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'
import pkg from '../../package.json'

import {
  type TresContext,
  useLogger,
  useRenderLoop,
  useTresContextProvider,
  useTresEventManager,
} from '../composables'
import { extend } from '../core/catalogue'
import { nodeOps } from '../core/nodeOps'

import type { RendererPresetsType } from '../composables/useRenderer/const'
import type { TresCamera, TresObject } from '../types/'
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

  // required by useTresContextProvider
  camera?: TresCamera
  preset?: RendererPresetsType
  windowSize?: boolean
  disableRender?: boolean
}

const props = withDefaults(defineProps<TresCanvasProps>(), {
  alpha: undefined,
  depth: undefined,
  shadows: undefined,
  stencil: undefined,
  antialias: undefined,
  windowSize: undefined,
  disableRender: undefined,
  useLegacyLights: undefined,
  preserveDrawingBuffer: undefined,
  logarithmicDepthBuffer: undefined,
  failIfMajorPerformanceCaveat: undefined,
  renderMode: 'always',
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
])

const slots = defineSlots<{
  default: () => any
}>()

const { logWarning } = useLogger()

const canvas = ref<HTMLCanvasElement>()

/*
 `scene` is defined here and not in `useTresContextProvider` because the custom
 renderer uses it to mount the app nodes. This happens before `useTresContextProvider` is called.
 The custom renderer requires `scene` to be editable (not readonly).
*/
const scene = shallowRef(new Scene())

const { resume } = useRenderLoop()

const instance = getCurrentInstance()?.appContext.app
extend(THREE)

const createInternalComponent = (context: TresContext) =>
  defineComponent({
    setup() {
      const ctx = getCurrentInstance()?.appContext
      if (ctx) { ctx.app = instance as App }
      provide('useTres', context)
      provide('extend', extend)

      if (typeof window !== 'undefined') {
        registerTresDevtools(ctx?.app, context)
      }
      return () => h(Fragment, null, slots?.default ? slots.default() : [])
    },
  })

const mountCustomRenderer = (context: TresContext) => {
  const InternalComponent = createInternalComponent(context)

  const { render } = createRenderer(nodeOps())

  render(h(InternalComponent), scene.value as unknown as TresObject)
}

const dispose = (context: TresContext, force = false) => {
  scene.value.children = []
  if (force) {
    context.renderer.value.dispose()
    context.renderer.value.renderLists.dispose()
    context.renderer.value.forceContextLoss()
  }
  mountCustomRenderer(context)
  resume()
}

const disableRender = computed(() => props.disableRender)

const context = shallowRef<TresContext | null>(null)

defineExpose({ context, dispose: () => dispose(context.value as TresContext, true) })

onMounted(() => {
  const existingCanvas = canvas as Ref<HTMLCanvasElement>

  context.value = useTresContextProvider({
    scene: scene.value,
    canvas: existingCanvas,
    windowSize: props.windowSize ?? false,
    disableRender: disableRender.value ?? false,
    rendererOptions: props,
    emit,
  })

  useTresEventManager(scene.value, context.value, emit)

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
    logWarning(
      'No camera found. Creating a default perspective camera. '
      + 'To have full control over a camera, please add one to the scene.',
    )
    addDefaultCamera()
  }

  if (import.meta.hot && context.value) { import.meta.hot.on('vite:afterUpdate', () => dispose(context.value as TresContext)) }
})
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
