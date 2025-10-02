<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import Experiment from './LensflareDemo.vue'
import '@tresjs/leches/styles'

useControls('fpsgraph')
</script>

<template>
  <TresLeches class="important-top-4 important-left-4" />
  <TresCanvas clear-color="#333" render-mode="on-demand">
    <Experiment />
  </TresCanvas>
</template>
