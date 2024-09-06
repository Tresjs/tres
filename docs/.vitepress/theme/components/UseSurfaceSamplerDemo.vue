<script setup lang="ts">
import { OrbitControls, useSurfaceSampler } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ref, watch } from 'vue'

const torusRef = ref()
const instancesRef = ref()

watch(torusRef, (value) => {
  useSurfaceSampler(value, 50, instancesRef.value, 'color')
})
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresMesh ref="torusRef">
      <TresTorusGeometry />
    </TresMesh>

    <TresInstancedMesh
      ref="instancesRef"
      :args="[null!, null!, 1_000]"
    >
      <TresSphereGeometry :args="[0.1, 32, 32]" />
      <TresMeshNormalMaterial />
    </TresInstancedMesh>

    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
