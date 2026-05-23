<script setup lang="ts">
import Collider from './Base.vue'
import type { ColliderProps } from '../../types'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [vertices: Float32Array, indices: Uint32Array]
}>()
</script>

<template>
  <Collider shape="trimesh" v-bind="props" />
</template>
