<script setup lang="ts">
import { inject, onMounted, shallowRef, watch } from 'vue'
import type { GameStore } from './GameStore'

const instancedMeshRef = shallowRef()
const gameStore = inject('gameStore') as GameStore
const { particles, dummy } = gameStore.mutation

watch(() => gameStore.mutation.particles, updateParticles)

onMounted(updateParticles)

function updateParticles() {
  gameStore.mutation.particles.forEach((particle, i) => {
    const { offset, scale } = particle
    dummy.position.copy(offset)
    dummy.scale.set(scale, scale, scale)
    dummy.rotation.set(Math.sin(Math.random()) * Math.PI, Math.sin(Math.random()) * Math.PI, Math.cos(Math.random()) * Math.PI)
    dummy.updateMatrix()
    if (instancedMeshRef.value) { instancedMeshRef.value.setMatrixAt(i, dummy.matrix) }
  })
  if (instancedMeshRef.value) {
    instancedMeshRef.value.instanceMatrix.needsUpdate = true
  }
}
</script>

<template>
  <TresInstancedMesh ref="instancedMeshRef" :args="[undefined, undefined, particles.length]" :frustum-culled="false">
    <TresConeGeometry :args="[2, 2, 3]" />
    <TresMeshStandardMaterial color="#606060" />
  </TresInstancedMesh>
</template>
