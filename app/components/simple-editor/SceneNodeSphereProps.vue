<script setup lang="ts">
import type { SphereSceneNode } from './types'

const props = defineProps({
  modelValue: {
    type: Object as PropType<SphereSceneNode>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)
const internalModelValue = ref<SphereSceneNode>(structuredClone(toRaw(modelValue.value)))
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
  </div>
</template>