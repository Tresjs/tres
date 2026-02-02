<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useTres } from '@tresjs/core'
import { ref, watch } from 'vue'
import BlenderCube from '@/components/BlenderCube.vue'

const { invalidate } = useTres()

const blenderCubeRef = ref()

watch(blenderCubeRef, (prev, next) => {
  if (!next) { return }
  invalidate()
})

function onControlChange() {
  invalidate()
}
</script>

<template>
  <TresPerspectiveCamera
    :position="[5, 5, 5]"
    :look-at="[0, 0, 0]"
  />
  <Suspense>
    <BlenderCube ref="blenderCubeRef" />
  </Suspense>
  <TresGridHelper />
  <OrbitControls @change="onControlChange" />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight
    :position="[0, 8, 4]"
    :intensity="0.7"
  />
</template>
