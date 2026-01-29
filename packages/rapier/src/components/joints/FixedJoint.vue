<script setup lang="ts">
import Joint from './BaseJoint.vue'
import type { JointProps, QuaternionArray, VectorArray } from '../../types'

const props = defineProps<Partial<Omit<JointProps, 'type' | 'params'> & {
  params: [
    anchor1: VectorArray,
    frame1: QuaternionArray,
    anchor2: VectorArray,
    frame2: QuaternionArray,
  ]
}>>()
</script>

<template>
  <Joint type="fixed" v-bind="props" />
</template>
