<script setup>
import { shallowRef, watch } from 'vue'
import { useTexture } from '@tresjs/core'
import { Float32BufferAttribute } from 'three'

const wallRef = shallowRef()
const doorRef = shallowRef()
const doorLightRef = shallowRef()

const brickTextures = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/color.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/normal.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/roughness.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/ambientOcclusion.jpg',
})

const doorTextures = await useTexture({
  map: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/color.jpg',
  alphaMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/alpha.jpg',
  ambientOcclusion:
    'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/ambientOcclusion.jpg',
  displacementMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/height.jpg',
  normalMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/normal.jpg',
  metalnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/metalness.jpg',
  roughnessMap: 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/roughness.jpg',
})

const wallOptions = {
  map: brickTextures.map,
  aoMap: brickTextures.aoMap,
  normalMap: brickTextures.normalMap,
  roughnessMap: brickTextures.roughnessMap,
}
const doorOptions = {
  transparent: true,
  displacementScale: 0.1,
  map: doorTextures.map,
  alphaMap: doorTextures.alphaMap,
  aoMap: doorTextures.aoMap,
  displacementMap: doorTextures.displacementMap,
  normalMap: doorTextures.normalMap,
  metalnessMap: doorTextures.metalnessMap,
  roughnessMap: doorTextures.roughnessMap,
}
watch(wallRef, value => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})

watch(doorRef, value => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})
watch(doorLightRef, value => {
  if (!value) return
  value.shadow.mapSize.width = 256
  value.shadow.mapSize.height = 256
  value.shadow.camera.far = 7
})
</script>
<template>
  <TresGroup ref="houseRef">
    <TresMesh ref="doorRef" :position="[0, 0.9, 2.01]">
      <TresPlaneGeometry :args="[2, 2, 100, 100]" />
      <TresMeshStandardMaterial v-bind="doorOptions" />
    </TresMesh>
    <TresMesh ref="roofRef" :position="[0, 3, 0]" :rotation="[0, Math.PI * 0.25, 0]">
      <TresConeGeometry :args="[3.5, 1, 4]" />
      <TresMeshStandardMaterial color="#b35f45" />
    </TresMesh>
    <TresMesh ref="wallRef" :position="[0, 1.25, 0]" cast-shadow>
      <TresBoxGeometry :args="[4, 2.5, 4]" />
      <TresMeshStandardMaterial v-bind="wallOptions" />
    </TresMesh>
    <TresPointLight :position="[0, 2.2, 2.7]" ref="doorLightRef" :args="['#ff7d46', 1, 7]" cast-shadow />
  </TresGroup>
</template>
