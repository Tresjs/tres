<script setup lang="ts">
import { Control } from '../composables/useControls'
import NumberControl from './NumberControl.vue'
import TextControl from './TextControl.vue'
import BooleanControl from './BooleanControl.vue'

defineProps<{
  control: Control
}>()
</script>
<template>
  <template v-if="control.visible">
    <TextControl v-if="control.type === 'string'" :label="control.label" :control="control" />
    <NumberControl v-else-if="control.type === 'number'" :label="control.label" :control="control" />
    <BooleanControl v-else-if="control.type === 'boolean'" :label="control.label" :control="control" />
  </template>
</template>
