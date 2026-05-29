<script setup lang="ts">
import type { ColliderProps } from '../../types'
import Collider from './Base.vue'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [radius?: number, halfHeight?: number]
}>()
</script>

<template>
  <Collider shape="roundConvexMesh" v-bind="props" />
</template>
