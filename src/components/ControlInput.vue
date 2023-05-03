<script setup lang="ts">
import { computed } from 'vue'
import { Vector2, Vector3 } from 'three'
import { Control } from '../composables/useControls'
import NumberControl from './NumberControl.vue'
import TextControl from './TextControl.vue'
import BooleanControl from './BooleanControl.vue'
import SliderControl from './SliderControl.vue'
import ColorControl from './ColorControl.vue'
import VectorControl from './VectorControl.vue'

const props = defineProps<{
  control: Control
}>()

const isSlider = computed(
  () => props.control.type === 'number' && (props.control.step || props.control.max || props.control.min),
)

const isColor = computed(() => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^0x([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return props.control.type === 'color' || colorRegex.test(props.control.value)
})

const isVector = computed(
  () =>
    props.control.value instanceof Array<number> ||
    props.control.value instanceof Vector2 ||
    props.control.value instanceof Vector3,
)
</script>
<template>
  <template v-if="control.visible">
    <TextControl v-if="control.type === 'string' && !isColor" :label="control.label" :control="control" />
    <ColorControl v-if="isColor" :label="control.label" :control="control" />
    <VectorControl v-else-if="isVector" :label="control.label" :control="control" />
    <BooleanControl v-else-if="control.type === 'boolean'" :label="control.label" :control="control" />
    <NumberControl v-else-if="!isSlider" :label="control.label" :control="control" />
    <SliderControl v-else-if="isSlider" :label="control.label" :control="control" />
  </template>
</template>
