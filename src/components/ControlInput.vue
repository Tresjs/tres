<script setup lang="ts">
import { Control } from '../composables/useControls'
import NumberControl from './NumberControl.vue'
import TextControl from './TextControl.vue'
import BooleanControl from './BooleanControl.vue'
import SliderControl from './SliderControl.vue'
import { computed } from 'vue'

const props = defineProps<{
  control: Control
}>()

const isSlider = computed(
  () => props.control.type === 'number' && (props.control.step || props.control.max || props.control.min),
)
</script>
<template>
  <template v-if="control.visible">
    <TextControl v-if="control.type === 'string'" :label="control.label" :control="control" />
    <BooleanControl v-else-if="control.type === 'boolean'" :label="control.label" :control="control" />
    <NumberControl v-else-if="!isSlider" :label="control.label" :control="control" />
    <SliderControl v-else-if="isSlider" :label="control.label" :control="control" />
  </template>
</template>
