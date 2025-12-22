<script setup lang="ts">
import { Precipitation } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { size, color, alphaTest, opacity, count, speed, randomness } = useControls({
  size: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
  color: '#ffffff',
  alphaTest: { value: 0.01, min: 0, max: 1, step: 0.01 },
  opacity: { value: 0.8, min: 0, max: 1, step: 0.1 },
  count: { value: 5000, min: 500, max: 20000, step: 500 },
  speed: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
  randomness: { value: 0.5, min: 0, max: 1, step: 0.1 },
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#333">
      <TresPerspectiveCamera :position="[0, 2, 15]" />
      <Precipitation
        :size="size"
        :color="color"
        :alpha-test="alphaTest"
        :opacity="opacity"
        :count="count"
        :speed="speed"
        :randomness="randomness"
      />
      <TresGridHelper :args="[10, 10]" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
