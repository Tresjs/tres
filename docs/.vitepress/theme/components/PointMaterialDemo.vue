<script setup lang="ts">
import { MathUtils, NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PointMaterial } from '@tresjs/cientos'

const positions = new Float32Array(Array.from({ length: 100 }, () => [
  MathUtils.randFloatSpread(8),
  MathUtils.randFloatSpread(8),
  MathUtils.randFloatSpread(8),
]).flat())
</script>

<template>
  <TresCanvas :tone-mapping="NoToneMapping" clear-color="#4F4F4F" :raycaster="{ params: { Points: { threshold: 0.2 } } }">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <TresPoints :limit="positions.length">
      <PointMaterial
        color="#82dbc5"
        :transparent="true"
        :size="10"
        :size-attenuation="false"
        :depth-test="false"
        :tone-mapped="false"
      />
      <TresBufferGeometry>
        <TresBufferAttribute :args="[positions, 3]" attach="attributes-position" />
      </TresBufferGeometry>
    </TresPoints>
  </TresCanvas>
</template>
