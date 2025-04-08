<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import DirectiveSubComponent from './DirectiveSubComponent.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresGridHelper />
    <DirectiveSubComponent />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
