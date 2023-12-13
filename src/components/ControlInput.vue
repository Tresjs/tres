<script setup lang="ts">
import type { Control } from '../types'
import NumberControl from './NumberControl.vue'
import TextControl from './TextControl.vue'
import BooleanControl from './BooleanControl.vue'
import SliderControl from './SliderControl.vue'
import ColorControl from './ColorControl.vue'
import VectorControl from './VectorControl.vue'
import FPSGraph from './FPSGraph.vue'
import SelectControl from './SelectControl.vue'
import ButtonControl from './ButtonControl.vue'

defineProps<{
  control: Control
}>()

const emit = defineEmits(['change'])

function onChange(value: string) {
  emit('change', value)
}
</script>

<template>
  <div v-if="control.visible">
    <ColorControl
      v-if="control.type === 'color'"
      :label="control.label"
      :control="control"
      @change="onChange"
    />
    <SelectControl
      v-else-if="control.type === 'select'"
      :label="control.label"
      :control="control"
      @change="onChange"
    />
    <VectorControl
      v-else-if="control.type === 'vector'"
      :label="control.label"
      :control="control"
      @change="onChange"
    />
    <BooleanControl
      v-else-if="control.type === 'boolean'"
      :label="control.label"
      :control="control"
      @change="onChange"
    />
    <FPSGraph
      v-else-if="control.type === 'fpsgraph'"
      :label="control.label"
      :control="control"
    />
    <NumberControl
      v-else-if="control.type === 'number'"
      :label="control.label"
      :control="control"
      @change="onChange"
    />
    <SliderControl
      v-else-if="control.type === 'range'"
      :label="control.label"
      :control="control"
      @change="onChange"
    />
    <div
      v-else-if="control.type === 'button'"
      class="tl-p-2"
      :class="control.value.size === 'tl-block' ? 'tl-flex' : 'tl-inline-flex'"
    >
      <ButtonControl
   
        :label="control.label"
        :control="control"
      />
    </div>
    <TextControl
      v-else
      :label="control.label"
      :control="control"
      @change="onChange"
    />
  </div>
</template>
