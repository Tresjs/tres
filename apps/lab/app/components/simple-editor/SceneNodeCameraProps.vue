<script setup lang="ts">
import type { CameraSceneNode } from './types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<CameraSceneNode>,
    required: true,
    validation: (val: CameraSceneNode) => val.type === 'camera',
  },
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)
const internalModelValue = ref<CameraSceneNode>(structuredClone(toRaw(modelValue.value)))
watch(modelValue, () => {
  internalModelValue.value = structuredClone(toRaw(modelValue.value))
})
function handleModelValueUpdate() {
  emit('update:modelValue', structuredClone(toRaw(internalModelValue.value)))
}
</script>

<template>
  <div class="grid grid-cols-[auto_auto] gap-1">
    Fov: <input
      v-model="internalModelValue.properties.fov"
      class="dark:text-black"
      @update:model-value="handleModelValueUpdate"
    >
  </div>
</template>