<script setup lang="ts">
import type { ConeSceneNode } from './types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<ConeSceneNode>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)
const internalModelValue = ref<ConeSceneNode>(structuredClone(toRaw(modelValue.value)))
watch(modelValue, () => {
  internalModelValue.value = structuredClone(toRaw(modelValue.value))
})
function handleModelValueUpdate() {
  emit('update:modelValue', structuredClone(toRaw(internalModelValue.value)))
}
</script>

<template>
  <div class="grid grid-cols-[auto_auto] gap-1">
    Radius: <input
      v-model="internalModelValue.properties.radius"
      class="dark:text-black"
      @update:model-value="handleModelValueUpdate"
    >
    Height: <input
      v-model="internalModelValue.properties.height"
      class="dark:text-black"
      @update:model-value="handleModelValueUpdate"
    >
  </div>
</template>