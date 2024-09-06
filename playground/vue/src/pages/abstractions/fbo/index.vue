<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import Experiment from './FBODemo.vue'
import '@tresjs/leches/styles'

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#c0ffee">
    <Experiment />
  </TresCanvas>
</template>
