<script setup lang="ts">
import { LOD } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BoxGeometry, IcosahedronGeometry, MeshBasicMaterial, Vector3 } from 'three'

const COUNT = 1000
const positions = Array.from({ length: COUNT }).fill(0).map(() => {
  return new Vector3(
    10000 * (Math.random() * 2 - 1),
    7500 * (Math.random() * 2 - 1),
    10000 * (Math.random() * 2 - 1),
  )
})

const geometries = [
  new IcosahedronGeometry(100, 16),
  new IcosahedronGeometry(100, 8),
  new IcosahedronGeometry(100, 4),
  new IcosahedronGeometry(100, 2),
  new BoxGeometry(100, 100, 100),
]

const materials = [
  new MeshBasicMaterial({ color: 'red', wireframe: true }),
  new MeshBasicMaterial({ color: 'orange', wireframe: true }),
  new MeshBasicMaterial({ color: 'yellow', wireframe: true }),
  new MeshBasicMaterial({ color: 'green', wireframe: true }),
  new MeshBasicMaterial({ color: 'blue', wireframe: true }),
]

const x = ref(0)
let intervalId: ReturnType<typeof setInterval>
let elapsed = 0

const levels = ref([1000, 2000, 3000, 4000, 5000])

onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 0.01
    x.value = Math.cos(elapsed) * 5000
  })
})

function resetLevels() {
  const i = Math.random() * 10000
  levels.value = [i, i * 2, i * 3, i * 4, i * 5]

  // NOTE: Make `levels` too short sometimes.
  if (Math.random() > 0.5) {
    while (levels.value.length && Math.random() > 0.5) {
      levels.value.pop()
    }
  }
  else {
    // NOTE: Reverse levels sometimes.
    levels.value.reverse()
  }
}

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <TresCanvas clear-color="gray" @pointerdown="resetLevels">
    <TresPerspectiveCamera :near="1" :far="25000" :position="[0, 0, 0]" />
    <TresGroup :position-z="x">
      <LOD v-for="position, i of positions" :key="i" :levels="levels" :position="position">
        <TresMesh :geometry="geometries[0]" :material="materials[0]" />
        <TresMesh :geometry="geometries[1]" :material="materials[1]" />
        <TresMesh :geometry="geometries[2]" :material="materials[2]" />
        <TresMesh :geometry="geometries[3]" :material="materials[3]" />
        <TresMesh :geometry="geometries[4]" :material="materials[4]" />
      </LOD>
    </TresGroup>
  </TresCanvas>
</template>
