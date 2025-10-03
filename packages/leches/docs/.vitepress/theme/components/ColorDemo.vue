<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'color-demo'
const { value: color } = useControls({
  color: '#008080',
}, {
  uuid,
})
</script>

<template>
  <div
    class="w-full h-300px bg-gray-200 mb-8 relative grid grid-cols-2 gap-16 items-center"
    :style="{ backgroundColor: color }"
  >
    <div class="p-4">
      <pre class="bg-dark p-8 rounded text-white">{{ color }}</pre>
    </div>
    <div class="relative w-280px min-h-200px">
      <TresLeches
        class="important-left-0 -important-top-8"
        :uuid="uuid"
      />
    </div>
  </div>
</template>
