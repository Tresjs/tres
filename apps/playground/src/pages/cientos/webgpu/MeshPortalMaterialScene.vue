<script setup lang="ts">
import { Environment } from '@tresjs/cientos/webgpu'
import { useLoop } from '@tresjs/core'
import type { Mesh } from 'three'
import { shallowRef } from 'vue'

const props = defineProps<{ preset: 'dawn' | 'night' | 'sunset', color: string }>()

const knotRef = shallowRef<Mesh>()

useLoop().onBeforeRender(({ elapsed }) => {
  knotRef.value?.rotation.set(elapsed * 0.6, elapsed * 0.4, 0)
})
</script>

<template>
  <Suspense>
    <Environment :preset="props.preset" :background="true" />
  </Suspense>

  <TresAmbientLight :intensity="0.25" />

  <TresMesh ref="knotRef" :position="[0, 0.1, -1]">
    <TresTorusKnotGeometry :args="[0.5, 0.2, 128, 32]" />
    <TresMeshStandardMaterial :color="props.color" :metalness="0.8" :roughness="0.12" />
  </TresMesh>

  <TresMesh :position="[0, -1.2, 0]" :rotation="[-Math.PI / 2, 0, 0]">
    <TresPlaneGeometry :args="[12, 12]" />
    <TresMeshStandardMaterial color="#1a1a20" :roughness="0.4" :metalness="0.2" />
  </TresMesh>
</template>
