<script lang="ts" setup>
import { UnrealBloom } from '@tresjs/post-processing'
import { ref } from 'vue'
import BasicScene from '../../components/BasicScene.vue'

const enabled = ref(true)

const radius = ref(0.85)
const strength = ref(0.4)
const threshold = ref(0.1)
</script>

<template>
  <div class="absolute top-0 left-0 z-10">
    <input v-model="enabled" type="checkbox" /> enabled
    <input v-model.number="radius" type="range" min="0" max="1" step="0.01" /> radius
    <input v-model.number="strength" type="range" min="0" max="1" step="0.01" /> strength
    <input v-model.number="threshold" type="range" min="0" max="1" step="0.01" /> threshold
  </div>
  <BasicScene>
    <template #effects>
      <UnrealBloom v-if="enabled" :radius="radius" :strength="strength" :threshold="threshold" />
    </template>
  </BasicScene>
</template>
