<script setup lang="ts">
import { MathUtils, NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PointMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const positions = new Float32Array(Array.from({ length: 1000 }, () => [
  MathUtils.randFloatSpread(8),
  MathUtils.randFloatSpread(8),
  MathUtils.randFloatSpread(8),
]).flat())

const c = useControls({
  color: false,
  depthTest: false,
  enabled: true,
  size: { value: 10, min: 0.1, max: 20, step: 0.1 },
  sizeAttenuation: false,
  toneMapped: false,
  transparent: true,
})
</script>

<template>
  <TresLeches />
  <TresCanvas :tone-mapping="NoToneMapping" clear-color="#222" :raycaster="{ params: { Points: { threshold: 0.2 } } }">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <TresPoints :limit="positions.length">
      <PointMaterial
        v-if="c.enabled.value.value"
        :color="c.color.value.value ? '#F00' : '#FFF'"
        :size="c.size.value.value"
        :size-attenuation="c.sizeAttenuation.value.value"
        :transparent="c.transparent.value.value"
        :depth-test="c.depthTest.value.value"
        :tone-mapped="c.toneMapped.value.value"
      />
      <TresBufferGeometry>
        <TresBufferAttribute :args="[positions, 3]" attach="attributes-position" />
      </TresBufferGeometry>
    </TresPoints>
  </TresCanvas>
</template>
