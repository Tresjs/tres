<script setup lang="ts">
import type { Ref } from 'vue'
import { onUnmounted, ref, toRaw, useSlots, watch } from 'vue'
import { CubeCamera, HalfFloatType, WebGLCubeRenderTarget } from 'three'
import type { CubeTexture, Texture } from 'three'
import { useLoop, useTresContext } from '@tresjs/core'
import type { EnvironmentOptions } from './const'
import EnvSence from './envSence'
import { useEnvironment } from '.'

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
})

const texture: Ref<Texture | CubeTexture | null> = ref(null)
defineExpose({ texture })

const { extend, renderer, scene } = useTresContext()
let slots = null as any
const fbo = ref<WebGLCubeRenderTarget | null>(null)
let cubeCamera: CubeCamera | null = null

const envSence = ref<EnvSence | null>(null)

const { onBeforeRender } = useLoop()
let count = 1
onBeforeRender(() => {
  if (cubeCamera && envSence.value && fbo.value) {
    if (props.frames === Number.POSITIVE_INFINITY || count < props.frames) {
      cubeCamera.update(renderer.value, toRaw(envSence.value.virtualScene))
      count++
    }
  }
}, -1)
const useEnvironmentTexture = await useEnvironment(props, fbo)
const setTextureEnvAndBG = (fbo?: WebGLCubeRenderTarget) => {
  if (fbo) {
    scene.value.environment = fbo.texture
    if (props.background) {
      scene.value.background = fbo.texture
    }
  }
  else {
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
    slots = value
    if (Array.isArray(slots) && slots.length > 0) {
      if (typeof slots[0]?.type !== 'symbol') {
        extend({ EnvSence })
        fbo.value = new WebGLCubeRenderTarget(props.resolution)
        fbo.value.texture.type = HalfFloatType
        cubeCamera = new CubeCamera(props.near, props.far, fbo.value)
        setTextureEnvAndBG(fbo.value)
        return
      }
    }
  }
  fbo.value?.dispose()
  fbo.value = null
  setTextureEnvAndBG()
}, { immediate: true, deep: true })

texture.value = useEnvironmentTexture.value

onUnmounted(() => {
  envSence.value?.destructor()
  fbo.value?.dispose()
})
</script>

<template>
  <TresEnvSence
    v-if="fbo"
    ref="envSence"
  >
    <slot></slot>
  </TresEnvSence>
</template>
