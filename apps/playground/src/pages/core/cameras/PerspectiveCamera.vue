<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import type { PerspectiveCamera } from 'three'
import { Vector3 } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'core-cameras-perspective'

const { position, lookAt, fov, near, far, zoom } = useControls({
  position: new Vector3(8, 8, 8),
  lookAt: new Vector3(0, 0, 0),
  // TODO: For some reason, the PerspectiveCamera's fov prop is not updating when the value is changed.
  fov: {
    value: 45,
    min: 1,
    max: 180,
    step: 1,
  },
  near: {
    value: 0.1,
    min: 0.01,
    max: 100,
    step: 0.01,
  },
  far: {
    value: 1000,
    min: 0.01,
    max: 1000,
    step: 0.01,
  },
  zoom: {
    value: 1,
    min: 0.01,
    max: 10,
    step: 0.01,
  },
}, { uuid })

const cameraRef = ref<PerspectiveCamera>()

const computedFov = computed(() => {
  return Number(fov.value)
})
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera
      ref="cameraRef"
      :position="[position.x, position.y, position.z]"
      :look-at="[lookAt.x, lookAt.y, lookAt.z]"
      :fov="computedFov"
      :near="near"
      :far="far"
      :zoom="zoom"
    />
    <TresGridHelper />
    <TresMesh position-y="1">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
