<script setup lang="ts">
import { App, onMounted, onUnmounted, ref, watch } from 'vue'
import { PerspectiveCamera, Scene } from 'three'

import { createTres } from '../core/renderer'
import {
  TRES_CONTEXT_KEY,
  useLogger,
  useCamera,
  useRenderer,
  useRenderLoop,
  useTres,
  usePointerEventHandler,
} from '../composables'
import { extend } from '../core/catalogue'
import { OBJECT_3D_USER_DATA_KEYS } from '../keys'

import type { TresCamera } from '../types/'
import type { RendererPresetsType } from '../composables/useRenderer/const'
import type { ColorSpace, ShadowMapType, ToneMapping } from 'three'

export interface TresSceneProps {
  shadows?: boolean
  shadowMapType?: ShadowMapType
  physicallyCorrectLights?: boolean
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


const { logWarning } = useLogger()

const props = withDefaults(defineProps<TresSceneProps>(), {
  physicallyCorrectLights: false,
})

if (props.physicallyCorrectLights === true) {
  logWarning('physicallyCorrectLights is deprecated, useLegacyLights is now false by default')
}

const container = ref<HTMLElement>()
const canvas = ref<HTMLElement>()
const scene = new Scene()

const pointerEventHandler = usePointerEventHandler()
const { setState } = useTres()

scene.userData[OBJECT_3D_USER_DATA_KEYS.REGISTER_AT_POINTER_EVENT_HANDLER] = pointerEventHandler.registerObject

setState('scene', scene)
setState('canvas', canvas)
setState('container', container)
setState('pointerEventHandler', pointerEventHandler)

const { onLoop, resume } = useRenderLoop()

const { activeCamera, pushCamera, clearCameras } = useCamera()

onMounted(() => {
  initRenderer()
})

onUnmounted(() => {
  setState('renderer', null)
})


function setCamera() {
  const camera = scene.getObjectByProperty('isCamera', true)

  if (!camera) {
    // eslint-disable-next-line max-len
    logWarning('No camera found. Creating a default perspective camera. To have full control over a camera, please add one to the scene.')
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(3, 3, 3)
    camera.lookAt(0, 0, 0)
    pushCamera(camera)
  } else {
    pushCamera(camera as TresCamera)
  }
}

function initRenderer() {
  const { renderer } = useRenderer(props)

  if (props.camera) {
    pushCamera(props.camera)
  }

  onLoop(() => {
    if (activeCamera.value && props.disableRender !== true) renderer.value?.render(scene, activeCamera.value)
  })
}

let app: App

const slots = defineSlots<{
  default(): any
}>()

function mountApp() {
  app = createTres(slots)
  const tres = useTres()
  app.provide('useTres', tres)
  app.provide(TRES_CONTEXT_KEY, tres)
  app.provide('extend', extend)
  app.mount(scene as unknown)
  setCamera()
}
mountApp()

defineExpose({
  scene
})

function dispose() {
  scene.children = []
  app.unmount()
  app = createTres(slots)
  app.provide('extend', extend)
  app.mount(scene as unknown)
  setCamera()
  resume()
}

if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', dispose)
}

watch(
  () => props.camera,
  camera => {
    if (camera) {
      clearCameras()
      pushCamera(camera as any)
    }
  },
)

</script>

<template>
  <div ref="container" :key="scene.uuid" :data-scene="scene.uuid"
    style="position: relative; width: 100%; height: 100%; pointerEvents: auto; touchAction: none;">
    <div style="width: 100%; height: 100%;">
      <canvas ref="canvas" :data-scene="scene.uuid"
        :style="{ display: 'block', width: '100%', height: '100%', position: windowSize ? 'fixed' : 'absolute', top: 0, left: 0 }">
      </canvas>
    </div>
  </div>
</template>