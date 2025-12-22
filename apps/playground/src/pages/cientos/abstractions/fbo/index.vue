<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import Experiment from './FBODemo.vue'

const uuid = 'abstractions-fbo'

useControls('fpsgraph', { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#c0ffee">
    <Experiment />
  </TresCanvas>
</template>
