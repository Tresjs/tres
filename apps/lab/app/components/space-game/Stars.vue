<script setup lang="ts">
import { BufferAttribute, BufferGeometry } from 'three'

interface StarsProps {
  count?: number
}

const props = withDefaults(defineProps<StarsProps>(), { count: 2000 })

const positions = new Float32Array(props.count * 3)

for (let i = 0; i < props.count; i++) {
  const r = 8000
  const theta = 2 * Math.PI * Math.random()
  const phi = Math.acos(2 * Math.random() - 1)
  const x = r * Math.cos(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
  const y = r * Math.sin(theta) * Math.sin(phi) + (-2000 + Math.random() * 4000)
  const z = r * Math.cos(phi) + (-1000 + Math.random() * 2000)
  positions[i * 3 + 0] = x
  positions[i * 3 + 1] = y
  positions[i * 3 + 2] = z
}

const geom = new BufferGeometry()
geom.setAttribute('position', new BufferAttribute(positions, 3))
</script>

<template>
  <TresPoints :args="[geom]">
    <TresBufferGeometry :position="[positions, 3]" />
    <TresPointsMaterial color="#DDEEFF" :size="15" :size-attenuation="true" :fog="false" />
  </TresPoints>
</template>
