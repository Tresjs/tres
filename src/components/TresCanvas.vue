<script setup lang="ts">
import { PerspectiveCamera, Scene } from 'three'
import type {
  WebGLRendererParameters,
  ColorSpace,
  ShadowMapType,
  ToneMapping,
} from 'three'
import type { Ref } from 'vue'
import {
  computed,
  onMounted,
  provide,
  ref,
  shallowRef,
  watch,
  watchEffect,
  Fragment,
  defineComponent,
  h,
} from 'vue'
import {
  useTresContextProvider,
  useLogger,
  usePointerEventHandler,
  useRenderLoop,
  type TresContext,
} from '../composables'
import { extend } from '../core/catalogue'
import { render } from '../core/renderer'

import {} from '../composables'

import type { RendererPresetsType } from '../composables/useRenderer/const'
import type { TresCamera, TresObject } from '../types/'

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
})

const { logWarning } = useLogger()

const canvas = ref<HTMLCanvasElement>()

/*
 `scene` is defined here and not in `useTresContextProvider` because the custom
 renderer uses it to mount the app nodes. This happens before `useTresContextProvider` is called.
 The custom renderer requires `scene` to be editable (not readonly).
*/
const scene = shallowRef(new Scene())

const { resume } = useRenderLoop()

const slots = defineSlots<{
  default(): any
}>()

const createInternalComponent = (context: TresContext) =>
  defineComponent({
    setup() {
      provide('useTres', context)
      provide('extend', extend)
      return () => h(Fragment, null, slots?.default ? slots.default() : [])
    },
  })

const mountCustomRenderer = (context: TresContext) => {
  const InternalComponent = createInternalComponent(context)
  render(h(InternalComponent), scene.value as unknown as TresObject)
}

const dispose = (context: TresContext) => {
  scene.value.children = []
  mountCustomRenderer(context)
  resume()
}

const disableRender = computed(() => props.disableRender)

onMounted(() => {
  const existingCanvas = canvas as Ref<HTMLCanvasElement>

  const context = useTresContextProvider({
    scene: scene.value,
    canvas: existingCanvas,
    windowSize: props.windowSize,
    disableRender,
    rendererOptions: props,
  })

  usePointerEventHandler({ scene: scene.value, contextParts: context })

  const { addCamera, camera, cameras, removeCamera } = context

  mountCustomRenderer(context)

  const addDefaultCamera = () => {
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.set(3, 3, 3)
    camera.lookAt(0, 0, 0)
    addCamera(camera)

    const unwatch = watchEffect(() => {
      if (cameras.value.length >= 2) {
        camera.removeFromParent()
        removeCamera(camera)
        unwatch?.()
      }
    })
  }

  watch(
    () => props.camera,
    (newCamera, oldCamera) => {
      if (newCamera) addCamera(newCamera)
      else if (oldCamera) {
        oldCamera.removeFromParent()
        removeCamera(oldCamera)
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

  if (import.meta.hot)
    import.meta.hot.on('vite:afterUpdate', () => dispose(context))
})
</script>

<template>
  <canvas
    ref="canvas"
    :data-scene="scene.uuid"
    :style="{
      display: 'block',
      width: '100%',
      height: '100%',
      position: windowSize ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      pointerEvents: 'auto',
      touchAction: 'none',
    }"
  />
</template>
