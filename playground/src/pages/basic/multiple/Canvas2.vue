<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const boxRef = shallowRef({ position: { x: 0 } })

const onTresReady = ({ useLoop }) => {
  useLoop(({ elapsed }) => {
    boxRef.value.position.x = Math.sin(elapsed)
  })
}
</script>

<template>
  <TresCanvas clear-color="#fff" @ready="onTresReady">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <TresAmbientLight
      :intensity="0.5"
      color="red"
    />
    <TresMesh
      ref="boxRef"
      :position="[0, 2, 0]"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
  <button v-if="isActive" @click="pause">Pause</button>
  <button v-if="!isActive" @click="resume">Resume</button>
</template>
