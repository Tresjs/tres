<script setup lang="ts">
import { App, Ref, computed, ref, shallowRef, watch, watchEffect } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRendererParameters,
  type ColorSpace,
  type ShadowMapType,
  type ToneMapping,
} from 'three'

import { type TresContext, useTresContextProvider } from '../provider'
import { createTres } from '../core/renderer'
import { extend } from '../core/catalogue'

import {
  useLogger,
  useRenderLoop,
  usePointerEventHandler,
} from '../composables'



import type { TresCamera } from '../types/'
import type { RendererPresetsType } from '../composables/useRenderer/const'
import { onMounted } from 'vue'

export interface TresCanvasProps extends Omit<WebGLRendererParameters, 'canvas'> {
  // required by for useRenderer
  shadows?: boolean
  clearColor?: string
  toneMapping?: ToneMapping
  shadowMapType?: ShadowMapType
  useLegacyLights?: boolean
  outputColorSpace?: ColorSpace
  toneMappingExposure?: number

  // required by useTresContextProvider
  windowSize?: boolean
  preset?: RendererPresetsType
  disableRender?: boolean
  camera?: TresCamera,
}

const props = defineProps<TresCanvasProps>()

const { logWarning } = useLogger()

const canvas = ref<HTMLCanvasElement>()
const scene = shallowRef(new Scene()) // must be here to make custom renderer work

const { resume } = useRenderLoop()

const slots = defineSlots<{
  default(): any
}>()


let app: App

const mountCustomRenderer = (context: TresContext) => {
  app = createTres(slots)
  app.provide('useTres', context) // TODO obsolete?
  app.provide('extend', extend)
  app.mount(scene.value)
}

const dispose = () => {
  scene.value.children = []
  app.unmount()
  app = createTres(slots)
  app.provide('extend', extend)
  app.mount(scene as unknown)
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

  usePointerEventHandler(scene.value, context)

  const { addCamera, camera, cameras, removeCamera } = context

  mountCustomRenderer(context)

  const addDefaultCamera = () => {
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(3, 3, 3)
    camera.lookAt(0, 0, 0)
    addCamera(camera)

    const unwatch = watchEffect(
      () => {
        if (cameras.value.length >= 2) {
          camera.removeFromParent()
          removeCamera(camera)
          unwatch?.()
        }
      },
    )
  }

  watch(() => props.camera, (newCamera, oldCamera) => {
    if (newCamera)
      addCamera(newCamera)
    else if (oldCamera) {
      oldCamera.removeFromParent()
      removeCamera(oldCamera)
    }
  }, {
    immediate: true
  })

  if (!camera.value) {
    logWarning(
      'No camera found. Creating a default perspective camera. ' +
      'To have full control over a camera, please add one to the scene.'
    )
    addDefaultCamera()
  }

  if (import.meta.hot)
    import.meta.hot.on('vite:afterUpdate', dispose)
})
</script>
<template>
  <canvas ref="canvas" :data-scene="scene.uuid" :style="{
    display: 'block',
    width: '100%',
    height: '100%',
    position: windowSize ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    pointerEvents: 'auto',
    touchAction: 'none',
    zIndex: 1,
  }">
  </canvas>
</template>