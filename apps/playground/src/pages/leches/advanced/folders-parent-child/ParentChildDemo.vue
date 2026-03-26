<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import TheChild from './TheChild.vue'

const uuid = 'leches-basic-parent-child'

const { canvasClearColor } = useControls('🎨 canvas', {
  clearColor: '#82DBC5',
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas window-size :clear-color="canvasClearColor">
    <TheChild />
  </TresCanvas>
</template>
