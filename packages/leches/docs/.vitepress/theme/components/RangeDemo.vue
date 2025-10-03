<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { computed } from 'vue'

const uuid = 'range'
const { value } = useControls({
  planets: {
    value: 8,
    min: 1,
    max: 20,
    step: 1,
  },
}, {
  uuid,
})

const planets = computed(() => Array.from({ length: value.value }, (_, i) => i + 1))
</script>

<template>
  <div class="w-full h-300px bg-gray-200 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4 flex gap-4 flex-wrap text-xl">
      <i
        v-for="planet in planets"
        :key="planet"
      >🪐</i>
    </div>
    <div class="relative w-280px min-h-200px">
      <TresLeches
        class="important-left-0 -important-top-8"
        :uuid="uuid"
      />
    </div>
  </div>
</template>
