<script setup lang="ts">
import type { ColliderDesc } from '@dimforge/rapier3d-compat'

import type { ColliderProps } from '../../types'
import Collider from './Base.vue'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: Parameters<typeof ColliderDesc.polyline>
}>()
</script>

<template>
  <Collider shape="polyline" v-bind="props" />
</template>
