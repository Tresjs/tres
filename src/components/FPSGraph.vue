<script lang="ts" setup>
import type { Control } from '../types'
import { usePerfProvider } from '../composables/usePerf'
import Graph from './Graph.vue'

defineProps<{
  label: string
  control: Control
}>()

const { fps } = usePerfProvider()
</script>

<template>
  <Graph
    :points="fps.accumulator"
    :value="fps.value"
    unit="FPS"
    :label="label"
  />
</template>
