<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import TheExperience from './TheExperience.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
}

const showCanvas = ref(true)
</script>

<template>
  <input
    v-model="showCanvas"
    type="checkbox"
  />
  <TresCanvas v-if="showCanvas" v-bind="gl">
    <TheExperience />
  </TresCanvas>
</template>
