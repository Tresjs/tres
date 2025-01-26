<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { ref } from 'vue'

const value = ref('Click a button')
// const size = ref('sm')
const uuid = 'button-sizes'
useControls({
  sm: {
    label: 'Small',
    type: 'button',
    size: 'sm',
    onClick: () => {
      value.value = 'Size: sm'
    },
  },
  md: {
    label: 'Medium',
    type: 'button',
    size: 'md',
    onClick: () => {
      value.value = 'Size: md'
    },
  },
  lg: {
    label: 'Large',
    type: 'button',
    size: 'lg',
    onClick: () => {
      value.value = 'Size: lg'
    },
  },
  block: {
    label: 'Block',
    type: 'button',
    size: 'block',
    onClick: () => {
      value.value = 'Size: block'
    },
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
