<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'videogame'
const { videogame } = useControls({
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
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview">{{ videogame }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
