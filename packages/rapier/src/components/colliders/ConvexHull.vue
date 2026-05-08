<script setup lang="ts">
import Collider from './Base.vue'
import type { ColliderProps } from '../../types'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [vertices: Float32Array]
}>()
</script>

<template>
  <Collider shape="convexHull" v-bind="props" />
</template>
