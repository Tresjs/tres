<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Image } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const URLS = [
  'https://upload.wikimedia.org/wikipedia/commons/d/d4/Mars_2009_Plouaret.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/13/20220713-great-tit.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/00/Friendly_Robin.jpg',
]

const {
  url,
  scaleX,
  scaleY,
  opacity,
  transparent,
  toneMapped,
  radius,
  grayscale,
} = useControls({
  url: { value: URLS[0], options: URLS },
  scaleX: { value: 2, min: 0.1, max: 10, step: 0.1 },
  scaleY: { value: 2, min: 0.1, max: 10, step: 0.1 },
  opacity: { value: 1, min: 0, max: 1, step: 0.01 },
  transparent: false,
  toneMapped: true,
  radius: { value: 0, min: 0, max: 1, step: 0.01 },
  grayscale: { value: 0, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 5]" />

    <Image
      :url="url"
      :scale="[scaleX, scaleY]"
      :opacity="opacity"
      :transparent="transparent"
      :tone-mapped="toneMapped"
      :radius="radius"
      :grayscale="grayscale"
    />
  </TresCanvas>
</template>
