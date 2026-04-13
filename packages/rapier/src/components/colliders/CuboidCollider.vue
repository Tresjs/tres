<script setup lang="ts">
import Collider from './BaseCollider.vue'
import type { ColliderProps } from '../../types'

const props = defineProps<Partial<Omit<ColliderProps, 'shape'>>>()
</script>

<template>
  <Collider shape="cuboid" v-bind="props" />
</template>
