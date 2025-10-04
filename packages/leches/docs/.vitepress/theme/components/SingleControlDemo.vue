<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'single'
const control = useControls({
  awiwi: true,
}, {
  uuid,
})
</script>

<template>
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview text-xs">{{ control }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
