<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

import Scene from './scene.vue'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    render-mode="on-demand"
  >
    <Scene />
  </TresCanvas>
</template>