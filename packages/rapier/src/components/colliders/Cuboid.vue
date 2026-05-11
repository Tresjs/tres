<script setup lang="ts">
import Collider from './Base.vue'
import type { ColliderProps } from '../../types'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [halfWidth?: number, halfHeight?: number, halfDepth?: number]
}>()
</script>

<template>
  <Collider shape="cuboid" v-bind="props" />
</template>
