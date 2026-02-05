<script setup lang="ts">
import { MathUtils, NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PointMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'materials-point'

const positions = new Float32Array(Array.from({ length: 1000 }, () => [
  MathUtils.randFloatSpread(8),
  MathUtils.randFloatSpread(8),
  MathUtils.randFloatSpread(8),
]).flat())

const {
  color,
  depthTest,
  enabled,
  size,
  sizeAttenuation,
  toneMapped,
  transparent,
} = useControls({
  color: false,
  depthTest: false,
  enabled: true,
  size: { value: 10, min: 0.1, max: 20, step: 0.1 },
  sizeAttenuation: false,
  toneMapped: false,
  transparent: true,
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas :tone-mapping="NoToneMapping" clear-color="#222" :raycaster="{ params: { Points: { threshold: 0.2 } } }">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <TresPoints :limit="positions.length">
      <PointMaterial
        v-if="enabled"
        :color="color ? '#F00' : '#FFF'"
        :size="size"
        :size-attenuation="sizeAttenuation"
        :transparent="transparent"
        :depth-test="depthTest"
        :tone-mapped="toneMapped"
      />
      <TresBufferGeometry>
        <TresBufferAttribute :args="[positions, 3]" attach="attributes-position" />
      </TresBufferGeometry>
    </TresPoints>
  </TresCanvas>
</template>
