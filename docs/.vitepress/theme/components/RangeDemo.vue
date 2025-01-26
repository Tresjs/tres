<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { computed } from 'vue'

const uuid = 'range'
const { planets } = useControls({
  planets: {
    value: 8,
    min: 1,
    max: 20,
    step: 1,
  },
}, {
  uuid,
})

const computedPlanets = computed(() => Array.from({ length: planets.value }, (_, i) => i + 1))
</script>

<template>
  <div class="leches-demo-layout">
    <div class="p-4 flex gap-4 flex-wrap text-xl">
      <i
        v-for="planet in computedPlanets"
        :key="planet"
      >🪐</i>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
