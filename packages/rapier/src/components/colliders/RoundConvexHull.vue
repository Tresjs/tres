<script setup lang="ts">
import type { ColliderDesc } from '@dimforge/rapier3d-compat'

import type { ColliderProps } from '../../types'
import Collider from './Base.vue'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: Parameters<typeof ColliderDesc.roundConvexHull>
}>()
</script>

<template>
  <Collider shape="roundConvexHull" v-bind="props" />
</template>
