<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Box } from '@tresjs/cientos'
import { TresLeches, useControls } from '@leches/'
import { reactive, ref, watch, watchEffect } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
})

watchEffect(() => {
  console.log(gl)
})

const wireframe = ref(true)
const boxPositionX = ref(1)

useControls({
  wireframe,
  boxPositionX,
})

/* const boxRef = ref()

watch(boxRef, value => {
  if (value) {
    boxRef.value.position.x = 1
    useControls({
      position: boxRef.value.position.x,
    })
  }
}) */
</script>
<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />
    <TresMesh ref="boxRef" :position-x="boxPositionX" :scale="[2, 2, 2]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial :color="'teal'" :wireframe="wireframe" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
