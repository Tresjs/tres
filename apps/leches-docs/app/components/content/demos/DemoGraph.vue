<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const frameTime = ref(0)

useControls({
  frameTime: {
    type: 'graph',
    value: frameTime,
  },
}, { uuid: 'demo-graph' })

useControls('fpsgraph', { uuid: 'demo-graph' })

let raf = 0

onMounted(() => {
  const loop = (t: number) => {
    frameTime.value = (Math.sin(t / 400) + 1) * 8 + 8
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <DemoPanel uuid="demo-graph">
    <p>frameTime: {{ Number(frameTime).toFixed(1) }}</p>
  </DemoPanel>
</template>
