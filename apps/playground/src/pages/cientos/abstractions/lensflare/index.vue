<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import Experiment from './LensflareDemo.vue'

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#333" render-mode="on-demand">
    <Experiment />
  </TresCanvas>
</template>
