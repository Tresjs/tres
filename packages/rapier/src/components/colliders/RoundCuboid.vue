<script setup lang="ts">
import type { ColliderProps } from '../../types'
import Collider from './Base.vue'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [halfWidth?: number, halfHeight?: number, halfDepth?: number]
}>()
</script>

<template>
  <Collider shape="roundCuboid" v-bind="props" />
</template>
