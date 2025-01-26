<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'number'
const { stars } = useControls({
  stars: 100,
}, {
  uuid,
})
</script>

<template>
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview">{{ stars }} ⭐️</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
