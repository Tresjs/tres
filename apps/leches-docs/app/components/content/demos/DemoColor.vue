<script setup lang="ts">
import { useControls } from '@tresjs/leches'

const { accent } = useControls({
  accent: '#f59e0b',
}, { uuid: 'demo-color' })
</script>

<template>
  <DemoPanel uuid="demo-color" :bg="String(accent)" />
</template>
