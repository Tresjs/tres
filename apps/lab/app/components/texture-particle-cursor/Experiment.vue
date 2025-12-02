<script setup lang="ts">
import { Vector2, Uniform, ShaderMaterial, PlaneGeometry, Points, TextureLoader } from 'three';
import { useDevicePixelRatio,  } from '@vueuse/core';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const { state: texture, isLoading } = useTexture('/textures/rockhopper.png')

// const texture = textureLoader.load('/textures/rockhopper.png')
const { sizes } = useTres()
const { pixelRatio } = useDevicePixelRatio()

/** Particles */
const particlesGeometry = new PlaneGeometry(10,10,128,128)

const particlesMaterial = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uResolution: new Uniform(new Vector2(1, 1)),
    uTime: new Uniform(0),
    uPictureTexture: new Uniform(texture),
  },
})

const canRender = computed(() => !isLoading.value && sizes.width.value > 0 && sizes.height.value > 0)

watchEffect(() => {
  console.log({
    pixelRatio: pixelRatio.value,
    width: sizes.width.value,
    height: sizes.height.value,
    resolution: new Vector2(sizes.width.value * pixelRatio.value, sizes.height.value * pixelRatio.value),
  })
})

watch(texture, (newTexture) => {
  if (newTexture) {
    newTexture.needsUpdate = true
    particlesMaterial.uniforms.uPictureTexture!.value = newTexture
  }
})


watch(sizes.height, () => {
  if (sizes.width.value > 0 && sizes.height.value > 0) {
    particlesMaterial.uniforms.uResolution!.value = new Vector2(sizes.width.value * pixelRatio.value, sizes.height.value * pixelRatio.value)
  }
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  particlesMaterial.uniforms.uTime!.value = elapsed 
})
</script>
<template>
  <TresPoints v-if="canRender" :geometry="particlesGeometry" :material="particlesMaterial" />
</template>