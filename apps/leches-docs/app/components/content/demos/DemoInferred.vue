<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const { enabled, count, title, accent } = useControls({
  enabled: true,
  count: 12,
  title: 'Tres Leches',
  accent: '#f59e0b',
}, { uuid: 'demo-inferred' })
</script>

<template>
  <DemoPanel uuid="demo-inferred">
    <p>enabled: {{ enabled }}</p>
    <p>count: {{ count }}</p>
    <p>title: {{ title }}</p>
    <p>accent: <span :style="{ color: String(accent) }">{{ accent }}</span></p>
  </DemoPanel>
</template>
