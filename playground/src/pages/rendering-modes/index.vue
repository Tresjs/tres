<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

import Scene from './scene.vue'

const clearColor = ref('#82DBC5')

setTimeout(() => {
  clearColor.value = '#000000'
}, 3000)
</script>

<template>
  <TresCanvas
    :clear-color="clearColor"
    render-mode="on-demand"
    @render="() => console.log('onRender')"
  >
    <Scene />
  </TresCanvas>
</template>