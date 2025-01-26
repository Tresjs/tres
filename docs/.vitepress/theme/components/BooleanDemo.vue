<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'boolean'
const { awiwi } = useControls({
  awiwi: true,
}, {
  uuid,
})
</script>

<template>
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview">awiwi: {{ awiwi }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
