<script setup lang="ts">
import { useNodes, useUniforms } from '@tresjs/core/webgpu'
import { useControls } from '@tresjs/leches'
import { normalLocal, positionLocal, sin } from 'three/tsl'

const props = defineProps<{ uuid: string }>()

const { color, amplitude, frequency } = useControls({
  color: { type: 'color', value: '#82dbc5' },
  amplitude: { value: 0.15, min: 0, max: 0.5, step: 0.01 },
  frequency: { value: 4, min: 1, max: 12, step: 0.5 },
}, { uuid: props.uuid })

// Leches refs go in as they are. A change writes `uniform.value`: no rebuild, no recompile.
useUniforms({ uColor: color, uAmplitude: amplitude, uFrequency: frequency }, 'wave')

useNodes(({ uniforms }) => {
  const { uAmplitude, uFrequency } = uniforms.wave
  return {
    wave: positionLocal.add(normalLocal.mul(sin(positionLocal.y.mul(uFrequency)).mul(uAmplitude))),
  }
})
</script>

<template>
  <slot></slot>
</template>
