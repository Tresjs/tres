<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { ref } from 'vue'

const value = ref('Click a button')
const uuid = 'button-variant'
useControls({
  accept: {
    label: 'Button Secondary',
    type: 'button',
    variant: 'secondary',
    onClick: () => {
      value.value = 'Accept clicked'
    },
    icon: 'i-carbon-checkmark',
    size: 'sm',
  },
}, {
  uuid,
})
</script>

<template>
  <div class="leches-demo-layout">
    <div class="p-4">
      <pre class="leches-demo-preview">{{ value }}</pre>
    </div>
    <TresLeches
      :uuid="uuid"
    />
  </div>
</template>
