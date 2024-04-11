<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, useSlots, onUnmounted, watch, toRaw } from 'vue'
import { WebGLCubeRenderTarget, CubeCamera, HalfFloatType } from 'three'
import type { CubeTexture, Texture } from 'three'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import type { EnvironmentOptions } from './const'
import EnvSence from './envSence'
import { useEnvironment } from '.'

const props = withDefaults(defineProps<EnvironmentOptions>(), {
  background: false,
  blur: 0,
  files: [],
  path: '',
  preset: undefined,
  resolution: 256,
  near: 1,
  far: 1000,
  frames: Infinity,
})

const texture: Ref<Texture | CubeTexture | null> = ref(null)
defineExpose({ texture })

const { extend, renderer, scene } = useTresContext()
let slots = null as any
let fbo = null as null | WebGLCubeRenderTarget
let cubeCamera = null as null | CubeCamera
if (useSlots().default !== undefined) {
  extend({ EnvSence })
  slots = (useSlots() as any).default()
  fbo = new WebGLCubeRenderTarget(props.resolution)
  fbo.texture.type = HalfFloatType
  cubeCamera = new CubeCamera(props.near, props.far, fbo)
}
const envSence = ref<EnvSence | null>(null)
onUnmounted(() => {
  envSence.value?.destructor()
  fbo?.dispose()
})
const { onBeforeLoop } = useRenderLoop()
let count = 1
onBeforeLoop(() => {
  if (cubeCamera && envSence.value) {
    if (props.frames === Infinity || count < props.frames) {
      cubeCamera.update(renderer.value, toRaw(envSence.value.virtualScene))
      count++
    }
  }
})
const useEnvironmentTexture = (await useEnvironment(props) as any).texture
watch(useEnvironmentTexture, (value) => {
  if (fbo) {
    scene.value.environment = fbo.texture
    if (props.background) {
      scene.value.background = fbo.texture
    }
  }
}, { immediate: true, deep: true })

texture.value = useEnvironmentTexture
</script>

<template>
  <TresEnvSence v-if="fbo" ref="envSence">
    <slot />
  </TresEnvSence>
</template>
