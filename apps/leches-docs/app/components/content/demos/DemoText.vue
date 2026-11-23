<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const { title } = useControls({
  title: 'Tres Leches',
}, { uuid: 'demo-text' })
</script>

<template>
  <DemoPanel uuid="demo-text">
    <p>title: {{ title }}</p>
  </DemoPanel>
</template>
