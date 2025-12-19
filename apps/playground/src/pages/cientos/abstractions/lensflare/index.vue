<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import Experiment from './LensflareDemo.vue'

const uuid = 'abstractions-lensflare'

useControls('fpsgraph', { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#333" render-mode="on-demand">
    <Experiment />
  </TresCanvas>
</template>
