<script setup lang="ts">
import { useLocalNodes, useUniforms } from '@tresjs/core/webgpu'
import { float, mix, sin, uv, vec3 } from 'three/tsl'

const props = defineProps<{ pattern: string, layers: number, tint: string, frequency: number }>()
const emit = defineEmits<{ build: [count: number] }>()

// Values: a change writes the uniform, the graph does not rebuild.
useUniforms({ uTint: () => props.tint, uFrequency: () => props.frequency }, 'pattern')

let builds = 0

// Structure: `pattern` picks the node and `layers` unrolls a JS loop, so they are declared sources.
const { colorNode } = useLocalNodes(({ uniforms }) => {
  emit('build', ++builds)
  const { uTint, uFrequency } = uniforms.pattern
  const coord = props.pattern === 'rings' ? uv().sub(0.5).length() : uv().x

  let value = float(0)
  for (let layer = 0; layer < props.layers; layer++) {
    value = value.add(sin(coord.mul(uFrequency).mul(2 ** layer)).mul(0.5 ** (layer + 1)))
  }

  return { colorNode: mix(vec3(0.05), uTint, value.mul(0.5).add(0.5)) }
}, [() => props.pattern, () => props.layers])
</script>

<template>
  <TresMesh :rotation-x="-Math.PI / 2">
    <TresPlaneGeometry :args="[6, 6]" />
    <TresMeshBasicNodeMaterial :color-node="colorNode" />
  </TresMesh>
</template>
