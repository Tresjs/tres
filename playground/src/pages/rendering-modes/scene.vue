<script setup lang="ts">
import { useRenderLoop, useTres } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const { invalidate } = useTres()

function onControlChange() {
  invalidate()
}

invalidate()
</script>

<template>
  <OrbitControls @change="onControlChange" />
  <TresGridHelper />
  <TresMesh>
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
  <TresAmbientLight :intensity="1" />
</template>