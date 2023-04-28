<script setup lang="ts">
import { Control } from '../composables/useControls'
import NumberControl from './NumberControl.vue'
import TextControl from './TextControl.vue'
import BooleanControl from './BooleanControl.vue'

defineProps<{
  label: string
  control: Control
}>()
</script>
<template>
  <TextControl v-if="control.type === 'string'" :label="label" :control="control" />
  <NumberControl v-else-if="control.type === 'number'" :label="label" :control="control" />
  <BooleanControl v-else-if="control.type === 'boolean'" :label="label" :control="control" />
</template>
