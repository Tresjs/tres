<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'str'
const { message } = useControls({
  message: 'I`m a pretty penguin',
}, {
  uuid,
})
</script>

<template>
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview">{{ message }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
