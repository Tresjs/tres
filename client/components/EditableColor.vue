<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: number
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const editValue = ref(props.modelValue)

const finishEditing = () => {
  emit('update:modelValue', editValue.value)
}
</script>

<template>
  <UPopover @blur="finishEditing">
    <UButton
      :label="editValue"
      color="neutral"
      size="xs"
      variant="soft"
    >
      <template #leading>
        <span
          :style="{
            backgroundColor: editValue,
          }"
          class="size-3 rounded-full"
        />
      </template>
    </UButton>

    <template #content>
      <UColorPicker
        v-model="editValue"
        class="p-2"
        @update:model-value="finishEditing"
      />
    </template>
  </UPopover>
</template>
