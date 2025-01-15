<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'videogame'
const { value } = useControls({
  videogame: {
    value: 'crashbandicoot',
    options: [{
      text: 'Crash Bandicoot',
      value: 'crashbandicoot',
    }, {
      text: 'Metal Gear Solid',
      value: 'metal-gear-solid',
    }, {
      text: 'Legend of Zelda',
      value: 'legend-of-zelda',
    }],
  },
}, {
  uuid,
})
</script>

<template>
  <div class="w-full h-300px bg-gray-200 mb-8 relative grid grid-cols-2 gap-16 items-center">
    <div class="p-4">
      <pre class="bg-dark p-8 rounded text-white">{{ value }}</pre>
    </div>
    <div class="relative w-280px min-h-200px">
      <TresLeches
        class="important-left-0 -important-top-8"
        :uuid="uuid"
      />
    </div>
  </div>
</template>
