<script setup lang="ts">
import type { ColliderProps } from '../../types'
import Collider from './Base.vue'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [points?: Float32Array, indices?: Uint32Array]
}>()
</script>

<template>
  <Collider shape="polyline" v-bind="props" />
</template>
