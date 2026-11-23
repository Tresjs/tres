<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { reactive } from 'vue'

const settings = reactive({
  enabled: true,
  exposure: 1,
  background: '#111827',
})

useControls(settings, { uuid: 'demo-reactive' })
</script>

<template>
  <DemoPanel uuid="demo-reactive">
    <p>settings: {{ settings }}</p>
  </DemoPanel>
</template>
