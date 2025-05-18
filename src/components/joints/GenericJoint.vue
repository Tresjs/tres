<script setup lang="ts">
import type { JointAxesMask } from '@dimforge/rapier3d-compat'

import Joint from './BaseJoint.vue'
import type { JointProps, VectorArray } from '../../types'

const props = defineProps<Partial<Omit<JointProps, 'type' | 'params'> & {
  params: [
    anchor1: VectorArray,
    anchor2: VectorArray,
    axis: VectorArray,
    axesMask: JointAxesMask,
  ]
}>>()
</script>

<template>
  <Joint type="generic" v-bind="props" />
</template>
