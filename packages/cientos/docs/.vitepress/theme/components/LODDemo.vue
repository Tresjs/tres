<script setup lang="ts">
import { LOD } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BoxGeometry, IcosahedronGeometry, MeshBasicMaterial, Vector3 } from 'three'
import { onMounted, onUnmounted, ref } from 'vue'

const COUNT = 1000
const positions = Array.from({ length: COUNT }).fill(0).map((_, i) => {
  return new Vector3(
    Math.cos(i) * 1000,
    Math.sin(i) * 1000,
    8000 * (2 * i / COUNT - 1),
  )
})

const geometries = [
  new IcosahedronGeometry(100, 4),
  new IcosahedronGeometry(100, 0),
  new BoxGeometry(100, 100, 100),
]

const materials = [
  new MeshBasicMaterial({ color: '#fbb03b', wireframe: true }),
  new MeshBasicMaterial({ color: '#82dbc5', wireframe: true }),
  new MeshBasicMaterial({ color: '#4f4f4f', wireframe: true }),
]

const z = ref(0)
let intervalId: ReturnType<typeof setInterval>
let elapsed = 0

onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 0.005
    z.value = Math.cos(elapsed) * 5000
  }, 1000 / 30)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <TresCanvas clear-color="gray">
    <TresPerspectiveCamera :near="1" :far="25000" :position="[0, 0, 0]" />
    <TresGroup :position-z="z">
      <LOD v-for="position, i of positions" :key="i" :levels="[1500, 3000, 4000]" :position="position">
        <TresMesh :geometry="geometries[0]" :material="materials[0]" />
        <TresMesh :geometry="geometries[1]" :material="materials[1]" />
        <TresMesh :geometry="geometries[2]" :material="materials[2]" />
      </LOD>
    </TresGroup>
  </TresCanvas>
</template>
