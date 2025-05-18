<script setup lang="ts">
import Joint from './BaseJoint.vue'
import type { JointProps, VectorArray } from '../../types'

const props = defineProps<Partial<Omit<JointProps, 'type' | 'params'> & {
  params: [
    anchor1: VectorArray,
    anchor2: VectorArray,
    axis: VectorArray,
  ]
}>>()
</script>

<template>
  <Joint type="revolute" v-bind="props" />
</template>
