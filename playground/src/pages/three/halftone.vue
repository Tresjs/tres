<script lang="ts" setup>
import { Halftone } from '@tresjs/post-processing'
import { ref } from 'vue'
import BasicScene from '../../components/BasicScene.vue'

const radius = ref(13)
const enabled = ref(true)
const shape = ref(1)
</script>

<template>
  <div class="absolute left-0 top-0 z-10">
    <input v-model.number="radius" type="range" min="1" max="100" />
    <input v-model="enabled" type="checkbox" />
    <input v-model="shape" type="number" min="1" max="4" step="1" />
  </div>
  <BasicScene>
    <template #effects>
      <Halftone :radius="enabled ? radius : undefined" :shape="shape" />
    </template>
  </BasicScene>
</template>
