<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import Experiment from '../lensflare/LensflareElementsDemo.vue'

const uuid = 'abstractions-lensflare-elements'

useControls('fpsgraph', { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#333">
    <Experiment />
  </TresCanvas>
</template>
