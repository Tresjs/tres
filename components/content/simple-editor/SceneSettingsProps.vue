<script setup lang="ts">
import type { SceneSettings } from './types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<SceneSettings>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)
const internalModelValue = ref<SceneSettings>(structuredClone(toRaw(modelValue.value)))
watch(modelValue, () => {
  internalModelValue.value = structuredClone(toRaw(modelValue.value))
})
function handleModelValueUpdate() {
  emit('update:modelValue', structuredClone(toRaw(internalModelValue.value)))
}
</script>

<template>
  <div class="grid grid-cols-[auto_auto] gap-1">
    Width: <input
      v-model="internalModelValue.width"
      class="dark:text-black"
      @update:model-value="handleModelValueUpdate"
    >
    Height: <input
      v-model="internalModelValue.height"
      class="dark:text-black"
      @update:model-value="handleModelValueUpdate"
    >
  </div>
</template>