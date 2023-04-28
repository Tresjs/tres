<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Box } from '@tresjs/cientos'
import { Leches, useControls } from '@leches/'
import { reactive, ref, watch, watchEffect } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
})

watchEffect(() => {
  console.log(gl)
})

const awiwi = ref(false)

useControls(gl)

const boxRef = ref()

watch(boxRef, value => {
  if (value) {
    useControls({
      position: value.position.x,
    })
  }
})
</script>
<template>
  <Leches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />
    <TresMesh ref="boxRef" :position="[0, 1, 0]" :scale="[2, 2, 2]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial :color="'teal'" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
