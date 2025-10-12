<script setup lang="ts">
import { defineEmits } from 'vue'

// Define the emit for closing the modal
const emit = defineEmits<{ (e: 'close'): void }>()

/**
 * Emits the close event when the user acknowledges the dialog or closes the modal.
 */
function handleClose() {
  emit('close')
}
</script>

<template>
  <!--
    UModal from Nuxt UI provides accessibility, transitions, and overlay out of the box.
    We use the title and body slots for content, and the close event for overlay integration.
  -->
  <UModal :model-value="true" title="Microphone Permission Required" :dismissible="true" :overlay="true"
    :transition="true" @close="handleClose">
    <template #body>
      <div class="flex flex-col items-center justify-center py-4">
        <p class="max-w-xl text-center">
          Hey! <br>
          This site requires microphone permissions. The microphone is only used to calculate the frequency necessary
          for
          the blob to dance. A browser pop-up will ask you for permission.
        </p>
        <UButton class="mt-8" color="primary" @click="handleClose">
          OK
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<!--
  No additional styles needed; UModal and UnoCSS handle layout and theming.
-->