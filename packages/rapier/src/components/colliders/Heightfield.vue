<script setup lang="ts">
import type { Vector3 } from '@dimforge/rapier3d-compat'

import type { ColliderProps } from '../../types'
import Collider from './Base.vue'

const props = defineProps<Partial<Omit<ColliderProps, 'shape' | 'args'>> & {
  args: [nrows?: number, ncols?: number, heights?: Float32Array, scale?: Vector3]
}>()
</script>

<template>
  <Collider shape="heightfield" v-bind="props" />
</template>
