<script setup lang="ts">
import type { BoxSceneNode } from './types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<BoxSceneNode>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)
const internalModelValue = ref<BoxSceneNode>(structuredClone(toRaw(modelValue.value)))
watch(modelValue, () => {
  internalModelValue.value = structuredClone(toRaw(modelValue.value))
})
function handleModelValueUpdate() {
  emit('update:modelValue', structuredClone(toRaw(internalModelValue.value)))
}
</script>

<template>
  <div class="grid grid-cols-[auto_auto] gap-1">
    Width:
    <input
      v-model="internalModelValue.properties.width"
      class="dark:text-black"
      @update:model-value="handleModelValueUpdate"
    > 
    Length:
    <input
      v-model="internalModelValue.properties.length"
      class="dark:text-black"
      @update:model-value="handleModelValueUpdate"
    >
    Height:
    <input
      v-model="internalModelValue.properties.height"
      class="dark:text-black"
      @update:model-value="handleModelValueUpdate"
    >
  </div>
</template>