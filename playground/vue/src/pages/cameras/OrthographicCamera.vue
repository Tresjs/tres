<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import type { OrthographicCamera } from 'three'
import { Vector3 } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const { left, right, top, bottom, zoom, position, lookAt, near, far } = useControls({
  position: new Vector3(1, 1, 1),
  lookAt: new Vector3(0, 0, 0),
  top: {
    value: 500,
    min: -1000,
    max: 1000,
    step: 1,
  },
  bottom: {
    value: -500,
    min: -1000,
    max: 1000,
    step: 1,
  },
  left: {
    value: -500,
    min: -1000,
    max: 1000,
    step: 1,
  },
  right: {
    value: 500,
    min: -100,
    max: 1000,
    step: 1,
  },
  zoom: {
    value: 1,
    min: 1,
    max: 100,
    step: 1,
  },
  near: {
    value: -100,
    min: -100,
    max: 100,
    step: 10,
  },
  far: {
    value: 1000,
    min: 0.01,
    max: 1000,
    step: 10,
  },
})
const cameraRef = ref<OrthographicCamera>()

watch([left, right, top, bottom, zoom, near, far], () => {
  cameraRef.value?.updateProjectionMatrix()
})
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#82DBC5">
    <TresOrthographicCamera
      ref="cameraRef"
      :position="[position.x, position.y, position.z]"
      :look-at="[lookAt.x, lookAt.y, lookAt.z]"
      :args="[left, right, top, bottom, near, far]"
    />
    <TresGridHelper />
    <TresMesh position-y="1">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
