<script setup lang="ts">
import Collider from './Base.vue'
import type { ColliderProps } from '../../types'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: [radius?: number, halfHeight?: number]
}>()
</script>

<template>
  <Collider shape="cone" v-bind="props" />
</template>
