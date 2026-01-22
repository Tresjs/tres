<script setup lang="ts">
import Joint from './BaseJoint.vue'
import type { JointProps, VectorArray } from '../../types'

const props = defineProps<Partial<Omit<JointProps, 'type' | 'params'> & {
  params: [
    length: number,
    anchor1: VectorArray,
    anchor2: VectorArray,
  ]
}>>()
</script>

<template>
  <Joint type="rope" v-bind="props" />
</template>
