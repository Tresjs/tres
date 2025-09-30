<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue: number
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isEditing = ref(false)
const editValue = ref(0)
const inputRef = ref<HTMLInputElement>()

const displayValue = computed(() => Number(props.modelValue).toFixed(2))

const startEditing = () => {
  isEditing.value = true
  editValue.value = props.modelValue
}

const finishEditing = () => {
  emit('update:modelValue', editValue.value)
  isEditing.value = false
}

const cancelEditing = () => {
  editValue.value = props.modelValue
  isEditing.value = false
}
</script>

<template>
  <UBadge
    v-if="!isEditing"
    variant="soft"
    color="neutral"
    size="sm"
    class="font-mono cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
    @click="startEditing"
  >
    {{ displayValue }}
  </UBadge>
  <UInputNumber
    v-else
    ref="inputRef"
    v-model="editValue"
    :step="0.01"
    variant="soft"
    size="xs"
    orientation="vertical"
    :format-options="{
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }"
    class="w-20 font-mono"
    @blur="finishEditing"
    @keyup.enter="finishEditing"
    @keyup.escape="cancelEditing"
  />
</template>
