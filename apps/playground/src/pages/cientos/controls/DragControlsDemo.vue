<script setup lang="ts">
import { shallowRef } from 'vue'
import { DragControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef = shallowRef()

function onDrag(event: any) {
  console.log('hover', event)
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 7.5, 7.5]" :look-at="[0, 0, 0]" />
    <TresMesh ref="boxRef">
      <TresBoxGeometry />
      <TresMeshBasicMaterial />
    </TresMesh>
    <DragControls :objects="[boxRef]" @dragstart="onDrag" />
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
