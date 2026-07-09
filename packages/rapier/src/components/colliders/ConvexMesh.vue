<script setup lang="ts">
import type { ColliderDesc } from '@dimforge/rapier3d-compat'

import Collider from './Base.vue'
import type { ColliderProps } from '../../types'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args?: Parameters<typeof ColliderDesc.convexMesh>
}>()
</script>

<template>
  <Collider shape="convexMesh" v-bind="props" />
</template>
