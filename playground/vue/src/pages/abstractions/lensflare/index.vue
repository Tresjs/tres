<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import Experiment from './LensflareDemo.vue'

useControls('fpsgraph')
</script>

<template>
  <TresLeches class="important-top-4 important-left-4" />
  <TresCanvas clear-color="#333" render-mode="on-demand">
    <Experiment />
  </TresCanvas>
</template>
