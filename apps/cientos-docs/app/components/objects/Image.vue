<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Image } from '@tresjs/cientos'
import { BackSide, DoubleSide, FrontSide } from 'three'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const {
  scaleX,
  scaleY,
  opacity,
  transparent,
  toneMapped,
  side,
} = useControls({
  scaleX: { value: 2, min: 0.1, max: 10, step: 0.1 },
  scaleY: { value: 2, min: 0.1, max: 10, step: 0.1 },
  opacity: { value: 1, min: 0, max: 1, step: 0.01 },
  transparent: false,
  toneMapped: true,
  side: { value: DoubleSide, options: [FrontSide, BackSide, DoubleSide] },
}, { uuid })
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 5]" />

    <Image
      url="https://upload.wikimedia.org/wikipedia/commons/f/f0/Cyanistes_caeruleus_Oulu_20150516.JPG"
      :scale="[scaleX, scaleY]"
      :opacity="opacity"
      :transparent="transparent"
      :tone-mapped="toneMapped"
      :side="side"
    />
  </TresCanvas>
</template>
