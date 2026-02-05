<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import type { OrthographicCamera } from 'three'
import { Vector3 } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import { useWindowSize } from '@vueuse/core'

const uuid = 'core-cameras-orthographic'

const { width, height } = useWindowSize()
const aspect = computed(() => width.value / height.value)

const { zoom, position, lookAt, near, far, frustum } = useControls({
  position: new Vector3(1, 1, 1),
  lookAt: new Vector3(0, 0, 0),
  frustum: {
    value: 10,
    min: 0,
    max: 100,
    step: 10,
  },
  zoom: {
    value: 1,
    min: -100,
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
}, { uuid })
const cameraRef = ref<OrthographicCamera>()

watch([zoom, near, far, frustum], () => {
  cameraRef.value?.updateProjectionMatrix()
})
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#82DBC5">
    <TresOrthographicCamera
      ref="cameraRef"
      :position="[position.x, position.y, position.z]"
      :look-at="[lookAt.x, lookAt.y, lookAt.z]"
      :args="[-frustum * aspect, frustum * aspect, frustum, -frustum, 0.1, 1000]"
      :zoom="zoom"
      :near="near"
      :far="far"
    />
    <TresGridHelper />
    <TresMesh position-y="1">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
