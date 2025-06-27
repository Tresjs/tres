<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import SubComponentWithInject from './SubComponentWithInject.vue'

provide('test', '✅ Precedence is correct')
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <SubComponentWithInject />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
