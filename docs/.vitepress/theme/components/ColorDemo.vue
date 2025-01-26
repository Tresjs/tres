<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'color-demo'
const { color } = useControls({
  color: '#008080',
}, {
  uuid,
})
</script>

<template>
  <div
    class="leches-demo-layout"
    :style="{ backgroundColor: color }"
  >
    <div class="p-4">
      <pre class="leches-demo-preview">{{ color }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
