<script setup lang="ts">
import { ContactShadows, Levioso, TorusKnot } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { opacity, blur, color, tint, scale, width, height, far, smooth, resolution, frames } = useControls({
  opacity: { value: 1, min: 0, max: 1, step: 0.1 },
  blur: { value: 1, min: 0, max: 5, step: 0.1 },
  color: '#000000',
  tint: '#335',
  scale: { value: 20, min: 1, max: 50, step: 1 },
  width: { value: 1, min: 0.1, max: 5, step: 0.1 },
  height: { value: 1, min: 0.1, max: 5, step: 0.1 },
  far: { value: 10, min: 1, max: 50, step: 1 },
  smooth: true,
  resolution: { value: 512, min: 256, max: 1024, step: 256 },
  frames: Number.POSITIVE_INFINITY,
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <Levioso :speed="2" :range="[0, 0.7]" :rotation-factor="9">
      <TorusKnot :scale="0.45">
        <TresMeshNormalMaterial />
      </TorusKnot>
    </Levioso>
    <ContactShadows
      :position-y="-1"
      :color="color"
      :tint="tint"
      :scale="scale"
      :opacity="opacity"
      :blur="blur"
      :width="width"
      :height="height"
      :far="far"
      :smooth="smooth"
      :resolution="resolution"
      :frames="frames"
    />
  </TresCanvas>
</template>
