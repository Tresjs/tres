<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import { Object3D } from 'three'
import { shallowRef, watch } from 'vue'

const props = defineProps<{
  planet: Object3D
}>()

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/cloud.gltf')
const cloudRef = shallowRef()

const cloud = scene.children[0] as Object3D
cloud.castShadow = true
// create a function to return a random number between two values with random sign
function random(min: number, max: number): number {
  const randomNumber = Math.random() * (max - min) + min
  return Math.random() < 0.5 ? -randomNumber : randomNumber
}

cloud.position.set(random(0.5, 1), random(0.5, 1), random(0.5, 1))

const size = random(0.5, 1)
cloud.scale.set(size, size, size)
cloud.updateMatrixWorld()

watch(
  () => props.planet,
  planet => {
    if (!planet) return
    cloud.lookAt(planet.position)
    cloud.updateMatrixWorld()
  },
)
</script>
<template>
  <TresMesh ref="cloudRef" v-bind="scene" cast-shadow />
</template>
