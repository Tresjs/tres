<script setup lang="ts">
import { AccumulativeShadows, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { once, accumulate, frames, blend, limit, scale, opacity, alphaTest, color, colorBlend, resolution, toneMapped } = useControls({
  once: true,
  accumulate: true,
  frames: { value: 40, min: 1, max: 100, step: 1 },
  blend: { value: 100, min: 0, max: 200, step: 5 },
  limit: Infinity,
  scale: { value: 10, min: 1, max: 30, step: 1 },
  opacity: { value: 1, min: 0, max: 1, step: 0.1 },
  alphaTest: { value: 0.65, min: 0, max: 1, step: 0.05 },
  color: '#000000',
  colorBlend: { value: 2, min: 0, max: 5, step: 0.1 },
  resolution: { value: 1024, min: 256, max: 2048, step: 256 },
  toneMapped: true,
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#fbb03b" :shadows="true">
      <OrbitControls />
      <TresMesh :position-y="0.3" :scale="0.4" :cast-shadow="true">
        <TresTorusKnotGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
      <AccumulativeShadows
        :blend="blend"
        :color="color"
        :once="once"
        :accumulate="accumulate"
        :frames="frames"
        :limit="limit"
        :scale="scale"
        :opacity="opacity"
        :alpha-test="alphaTest"
        :color-blend="colorBlend"
        :resolution="resolution"
        :tone-mapped="toneMapped"
        :position-y="-0.4"
      />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>