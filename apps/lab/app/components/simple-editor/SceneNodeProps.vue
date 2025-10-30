<script setup lang="ts">
import type { SceneNode } from './types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<SceneNode>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)
const internalModelValue = ref<SceneNode>(structuredClone(toRaw(modelValue.value)))
watch(modelValue, () => {
  internalModelValue.value = structuredClone(toRaw(modelValue.value))
}, { deep: true })
function handleModelValueUpdate() {
  emit('update:modelValue', structuredClone(toRaw(internalModelValue.value)))
}
</script>

<template>
  <div>
    Position:
    <div class="grid grid-cols-[auto_auto] gap-1">
      x: <input
        v-model.number="internalModelValue.position[0]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
      y: <input
        v-model.number="internalModelValue.position[1]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
      z: <input
        v-model.number="internalModelValue.position[2]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
    </div>
  </div>
  <div>
    Rotation:
    <div class="grid grid-cols-[auto_auto] gap-1">
      x: <input
        v-model.number="internalModelValue.rotation[0]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
      y: <input
        v-model.number="internalModelValue.rotation[1]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
      z: <input
        v-model.number="internalModelValue.rotation[2]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
    </div>
  </div>
  <div>
    Scale:
    <div class="grid grid-cols-[auto_auto] gap-1">
      x: <input
        v-model.number="internalModelValue.scale[0]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
      y: <input
        v-model.number="internalModelValue.scale[1]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
      z: <input
        v-model.number="internalModelValue.scale[2]"
        class="dark:text-black"
        @update:model-value="handleModelValueUpdate"
      >
    </div>
  </div>
</template>