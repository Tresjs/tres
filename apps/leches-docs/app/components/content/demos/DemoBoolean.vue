<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const { enabled } = useControls({
  enabled: true,
}, { uuid: 'demo-boolean' })
</script>

<template>
  <DemoPanel uuid="demo-boolean">
    <p>enabled: {{ enabled }}</p>
  </DemoPanel>
</template>
