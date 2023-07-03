<script setup lang="ts">
import { App, Ref, onUnmounted, ref, shallowRef, watch } from 'vue'
import { PerspectiveCamera, type ColorSpace, type ShadowMapType, type ToneMapping, Scene } from 'three'

import { useTresContextProvider } from '../provider'
import { createTres } from '../core/renderer'
import { extend } from '../core/catalogue'

import {
  useLogger,
  useRenderLoop,
  useRenderer,
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
const scene = shallowRef(new Scene())

// Canvas & Camera

const { onLoop } = useRenderLoop()

const slots = defineSlots<{
  default(): any
}>()
function initRenderer() {

  const tres = useTresContextProvider(scene.value, canvas, props)
  const { addCamera, camera: activeCamera, clearCameras } = tres
  // Custom Renderer 
  let app: App

  function mountApp() {
    app = createTres(slots)
    app.provide('useTres', tres)
    app.provide('extend', extend)
    app.mount(scene.value)
    setCamera()
  }
  mountApp()

  const { renderer } = useRenderer(canvas as Ref<HTMLCanvasElement>, tres, props)

  if (props.camera) {
    addCamera(props.camera)
  }

  onLoop(() => {
    if (activeCamera.value && props.disableRender !== true) renderer.value?.render(scene.value, activeCamera.value)
  })

  function setCamera() {
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
  }
}

// Renderer

onMounted(() => {
  initRenderer()
})

onUnmounted(() => {
  /*  setState('renderer', null) */
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