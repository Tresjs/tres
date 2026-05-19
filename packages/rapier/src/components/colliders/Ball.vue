<script setup lang="ts">
import Collider from './Base.vue'
import type { ColliderProps } from '../../types'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [radius?: number]
}>()
</script>

<template>
  <Collider shape="ball" v-bind="props" />
</template>
