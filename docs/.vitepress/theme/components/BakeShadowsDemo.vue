<script setup lang="ts">
import { BakeShadows } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const cubeRef = shallowRef()

function onLoop({ elapsed }: { elapsed: number }) {
  if (cubeRef.value) {
    cubeRef.value.rotation.y = elapsed * 0.5
    cubeRef.value.rotation.x = elapsed * 0.5
  }
}
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    @loop="onLoop"
  >
    <TresPerspectiveCamera
      :position="[0, 2, 5]"
      :look-at="[0, 0, 0]"
    />
    <BakeShadows />
    <TresMesh
      ref="cubeRef"
      cast-shadow
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial :color="0x00FF00" />
    </TresMesh>
    <TresMesh
      receive-shadow
      :position="[0, -2, 0]"
      :rotation-x="-Math.PI / 2"
    >
      <TresPlaneGeometry :args="[5, 5]" />
      <TresMeshStandardMaterial :color="0xF7F7F7" />
    </TresMesh>
    <TresDirectionalLight
      cast-shadow
      :position="[0, 10, 0]"
    />
  </TresCanvas>
</template>
