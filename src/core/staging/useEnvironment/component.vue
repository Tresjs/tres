<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { BackSide, BoxGeometry, CubeCamera, HalfFloatType, Mesh, MeshBasicMaterial, WebGLCubeRenderTarget } from 'three'
import { onUnmounted, ref, toRaw, useSlots, watch } from 'vue'
import type { CubeTexture, Texture } from 'three'
import type { Ref } from 'vue'
import { useEnvironment } from '.'
import EnvironmentScene from './EnvironmentScene'
import type { EnvironmentOptions } from './const'

const props = withDefaults(defineProps<EnvironmentOptions>(), {
  background: false,
  blur: 0,
  files: () => [],
  path: '',
  preset: undefined,
  resolution: 256,
  near: 1,
  far: 1000,
  frames: Number.POSITIVE_INFINITY,
  backgroundIntensity: 1,
  environmentIntensity: 1,
})

const texture: Ref<Texture | CubeTexture | null> = ref(null)
defineExpose({ texture })

const { extend, renderer, scene } = useTresContext()
extend({ EnvironmentScene })

let slots = null as any
const fbo = ref<WebGLCubeRenderTarget | null>(null)
let cubeCamera: CubeCamera | null = null
const environmentScene = ref<EnvironmentScene | null>(null)

const useEnvironmentTexture = await useEnvironment(props, fbo)

const { onBeforeRender } = useLoop()
let count = 1
onBeforeRender(() => {
  if (cubeCamera && environmentScene.value && fbo.value) {
    if (props.frames === Number.POSITIVE_INFINITY || count < props.frames) {
      // Update cube camera
      const autoClear = renderer.value.autoClear
      renderer.value.autoClear = true
      // Use raw scene to avoid proxy issues
      const rawScene = toRaw(environmentScene.value).virtualScene
      cubeCamera.update(renderer.value, rawScene)
      renderer.value.autoClear = autoClear
      count++
    }
  }
}, -1)

// Add environment map to virtual scene when available
watch([useEnvironmentTexture, environmentScene], ([texture, scene]) => {
  if (texture && scene?.virtualScene) {
    const rawScene = toRaw(scene).virtualScene

    // Find existing environment mesh or create a new one
    let envMesh = rawScene.children.find(
      child => child instanceof Mesh && child.userData.isEnvironment,
    ) as Mesh | undefined

    if (!envMesh) {
      // Create new environment mesh if none exists
      envMesh = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ side: BackSide }),
      )
      envMesh.userData.isEnvironment = true
      rawScene.add(envMesh)
    }

    // Update the environment map
    rawScene.background = texture
    rawScene.backgroundBlurriness = props.blur
  }
}, { immediate: true })

const setTextureEnvAndBG = (fbo?: WebGLCubeRenderTarget) => {
  if (fbo && slots?.length) {
    // If we have lightformers, use FBO texture for both environment and background
    scene.value.environment = fbo.texture
    if (props.background) {
      scene.value.background = fbo.texture
    }
  }
  else if (useEnvironmentTexture.value) {
    // Otherwise use the original environment texture
    scene.value.environment = useEnvironmentTexture.value
    if (props.background) {
      scene.value.background = useEnvironmentTexture.value
    }
  }
}

watch(useEnvironmentTexture, () => {
  if (fbo.value) {
    setTextureEnvAndBG(fbo.value)
  }
}, { immediate: true, deep: true })

watch(() => useSlots().default, (value) => {
  if (value) {
    slots = value()
    if (Array.isArray(slots) && slots.length > 0) {
      extend({ EnvironmentScene })
      fbo.value = new WebGLCubeRenderTarget(props.resolution)
      fbo.value.texture.type = HalfFloatType
      cubeCamera = new CubeCamera(props.near, props.far, fbo.value)
      setTextureEnvAndBG(fbo.value)
      return
    }
  }
  fbo.value?.dispose()
  fbo.value = null
  setTextureEnvAndBG()
}, { immediate: true, deep: true })

texture.value = useEnvironmentTexture.value

onUnmounted(() => {
  environmentScene.value?.dispose()
  fbo.value?.dispose()
})
</script>

<template>
  <TresEnvironmentScene
    v-if="fbo"
    ref="environmentScene"
  >
    <slot></slot>
  </TresEnvironmentScene>
</template>
