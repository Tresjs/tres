<script setup lang="ts">
import { useRenderLoop, useTres } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const { invalidate } = useTres()

function onControlChange() {
  invalidate()
}

const positionX = ref(0)
const showMesh = ref(true)

setTimeout(() => {
  /*  positionX.value = 1 */
/*   showMesh.value = false */
}, 3000)

/* invalidate() */
</script>

<template>
  <OrbitControls @change="onControlChange" />
  <TresGridHelper />
  <TresMesh
    v-if="showMesh"
    :position-x="positionX"
  >
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
  <TresAmbientLight :intensity="1" />
</template>