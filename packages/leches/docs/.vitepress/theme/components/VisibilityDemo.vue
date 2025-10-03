<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { watchEffect } from 'vue'

const uuid = 'visibility'
const visibilityControl = useControls({
  isVisible: true,
}, {
  uuid,
})

const { visible } = useControls({
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  },
}, {
  uuid,
})

watchEffect(() => {
  visible.value = visibilityControl.value.value
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 mb-8 relative flex flex-col justify-center items-center">
    <p class="mb-8">
      Try toggling the `isVisible` control
    </p>
    <div class="relative w-280px min-h-200px">
      <TresLeches
        class="important-left-0 -important-top"
        :uuid="uuid"
      />
    </div>
  </div>
</template>
