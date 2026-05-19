<script setup lang="ts">
import type { ColliderProps } from '../../types'
import Collider from './Base.vue'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [vertices: Float32Array]
}>()
</script>

<template>
  <Collider shape="roundConvexHull" v-bind="props" />
</template>
