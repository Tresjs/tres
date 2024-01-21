<script setup lang="ts">
const props = defineProps<{
  label: string
  value: any
  type?: string
  path?: string
}>()

const emit = defineEmits(['change'])

function onChange(event: Event) {
  const { target } = event
  emit('change', (target as HTMLInputElement).checked)
}

function onKeydown(event: KeyboardEvent) {
  if (event.code === 'Space' || event.code === 'Enter') {
    event.preventDefault() // Prevent scrolling when space is pressed
    emit('change', !props.value)
  }
}
</script>

<template>
  <div class="flex px-4 justify-start gap-2 items-center">
    <UBadge
      color="gray"
      variant="soft"
    > 
      {{ value }}
    </UBadge> 
    <input
      :id="path"
      :checked="value"
      class="hidden"
      type="checkbox"
      @input="onChange"
    >
    <label
      :for="path"
      class="inline-flex items-center cursor-pointer"
    >
      <span
        tabindex="0"
        role="checkbox"
        :aria-checked="value.toString()"
        :class="{
          'bg-dark-500': value, 
          'bg-gray-200': !value, 
        }"
        class="w-4 
          h-4 
          flex 
          justify-center 
          items-center 
          rounded 
          border 
          border-gray-300 
          mr-2 
          transition-colors 
          duration-200
          dark:bg-slate-400/50
        "
        @keydown="onKeydown"
      >
        <i
          v-show="value"
          class="i-carbon-checkmark text-light"
        /></span>
    </label>
  </div>
</template>
