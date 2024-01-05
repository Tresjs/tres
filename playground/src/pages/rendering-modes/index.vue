<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

import Scene from './scene.vue'

const clearColor = ref('#82DBC5')
</script>

<template>
  <TresCanvas
    :clear-color="clearColor"
    render-mode="on-demand"
  >
    <Scene />
  </TresCanvas>
</template>