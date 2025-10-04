<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'getting-started'
const controls = useControls({
  pepe: true,
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  },
  color: '#008080',
}, {
  uuid,
})
</script>

<template>
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview">{{ controls }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
