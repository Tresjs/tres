<script setup lang="ts">
import { OrbitControls, Stars } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { size, sizeAttenuation, transparent, alphaTest, count, depth, radius } = useControls({
  size: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
  sizeAttenuation: true,
  transparent: true,
  alphaTest: { value: 0.01, min: 0, max: 10, step: 0.1 },
  count: { value: 5000, min: 100, max: 20000, step: 100 },
  depth: { value: 50, min: 10, max: 200, step: 10 },
  radius: { value: 100, min: 50, max: 500, step: 10 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#111">
      <TresPerspectiveCamera :position="[0, 5, 10]" />
      <OrbitControls />
      <Stars
        :size="size"
        :size-attenuation="sizeAttenuation"
        :transparent="transparent"
        :alpha-test="alphaTest"
        :count="count"
        :depth="depth"
        :radius="radius"
      />
      <TresGridHelper :args="[10, 20]" />
    </TresCanvas>
</template>
