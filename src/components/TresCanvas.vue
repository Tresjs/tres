<script setup lang="ts">
import { App, Ref, computed, ref, shallowRef, watch } from 'vue'
import { PerspectiveCamera, type ColorSpace, type ShadowMapType, type ToneMapping, Scene } from 'three'

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

export interface TresCanvasProps {
  shadows?: boolean
  shadowMapType?: ShadowMapType
  useLegacyLights?: boolean
  outputColorSpace?: ColorSpace
  toneMapping?: ToneMapping
  toneMappingExposure?: number
  context?: WebGLRenderingContext
  powerPreference?: 'high-performance' | 'low-power' | 'default'
  preserveDrawingBuffer?: boolean
  clearColor?: string
  windowSize?: boolean
  preset?: RendererPresetsType
  disableRender?: boolean
  camera?: TresCamera
}

const props = defineProps<TresCanvasProps>()

const { logWarning } = useLogger()

// Template Refs
const canvas = ref<HTMLCanvasElement>()
const scene = shallowRef(new Scene()) // must be here to make custom renderer work //TODO check

// Canvas & Camera
const { resume } = useRenderLoop()

const slots = defineSlots<{
  default(): any
}>()


let app: App

// Custom Renderer 
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
  // setCamera() //TODO move
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

  // Event handler
  usePointerEventHandler(scene.value, context) // TODO move?

  const { addCamera, clearCameras } = context

  mountCustomRenderer(context)
  setCamera()

  if (props.camera)
    addCamera(props.camera) // TODO move to useTresContextProvicer init

  function setCamera() { // TODO move
    const camera = scene.value.getObjectByProperty('isCamera', true)

    if (!camera) {
      // eslint-disable-next-line max-len
      logWarning('No camera found. Creating a default perspective camera. To have full control over a camera, please add one to the scene.')
      const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(3, 3, 3)
      camera.lookAt(0, 0, 0)
      addCamera(camera)
    } else {
      addCamera(camera as TresCamera)
    }

    watch(
      () => props.camera,
      camera => {
        if (camera) {
          clearCameras()
          addCamera(camera)
        }
      },
    )
    if (import.meta.hot)
      import.meta.hot.on('vite:afterUpdate', dispose)
  }

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