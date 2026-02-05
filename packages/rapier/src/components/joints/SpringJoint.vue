<script setup lang="ts">
import Joint from './BaseJoint.vue'
import type { JointProps, VectorArray } from '../../types'

const props = defineProps<Partial<Omit<JointProps, 'type' | 'params'> & {
  params: [
    rest_length: number,
    stiffness: number,
    damping: number,
    anchor1: VectorArray,
    anchor2: VectorArray,
  ]
}>>()
</script>

<template>
  <Joint type="spring" v-bind="props" />
</template>
