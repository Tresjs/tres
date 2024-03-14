<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, PositionalAudio, Box, Plane } from '@tresjs/cientos'
import type { Mesh } from 'three'

const gl = {
  clearColor: '#ffDBC5',
  shadows: true,
  alpha: false,
}

const meshRef = shallowRef<Mesh | null>(null);
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Box :args="[1, 1, 1]">
      <TresMeshNormalMaterial />

      <Suspense>
        <PositionalAudio :innerAngle="220" :outerAngle="220" :outerGain=".2" :distance="2" helper
          url="/positional-audio/sound1.mp3" />
      </Suspense>
    </Box>

    <Box :args="[4, 2, 0.1]" :position="[0, 0, -1]">
      <TresMeshBasicMaterial color="#ff0000" transparent :opacity="0.5" />
    </Box>

    <TresGridHelper :position="[0, -.01, 0]" :args="[10, 10]" />
  </TresCanvas>
</template>
