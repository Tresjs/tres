<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Image, OrbitControls, useTexture } from '@tresjs/cientos'
import { Color, DoubleSide, FrontSide, NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'abstractions-image'

const { state: birdsTexture } = useTexture('https://upload.wikimedia.org/wikipedia/commons/1/13/20220713-great-tit.jpg')

const URLS = [
  'https://upload.wikimedia.org/wikipedia/commons/d/d4/Mars_2009_Plouaret.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/13/20220713-great-tit.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/00/Friendly_Robin.jpg',
]

const {
  url,
  segments,
  scaleX,
  scaleY,
  isRed,
  zoom,
  radius,
  grayscale,
  toneMapped,
  transparent,
  opacity,
  isDoubleSided,
} = useControls(
  {
    url: { value: URLS[0], options: URLS },
    segments: { value: 1, min: 1, max: 10, step: 1 },
    scaleX: { value: 1, min: 0, max: 3, step: 0.01 },
    scaleY: { value: 1, min: 0, max: 3, step: 0.01 },
    isRed: false,
    zoom: { value: 1, min: 0, max: 3, step: 0.01 },
    radius: { value: 0, min: 0, max: 1, step: 0.01 },
    grayscale: { value: 0, min: 0, max: 1, step: 0.01 },
    toneMapped: false,
    transparent: true,
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    isDoubleSided: true,
  },
  { uuid },
)
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <OrbitControls />
    <Image :url="url" :position="[2, 0, 0]">
      <TresCircleGeometry />
    </Image>
    <Image
      :url="url"
      :segments="segments"
      :scale="[scaleX, scaleY]"
      :color="isRed ? '#F00' : '#FFF'"
      :zoom="zoom"
      :radius="radius"
      :grayscale="grayscale"
      :tone-mapped="toneMapped"
      :transparent="transparent"
      :opacity="opacity"
      :side="isDoubleSided ? DoubleSide : FrontSide"
    />
    <Image :texture="birdsTexture" :position="[-2, 0, 0]" />
    <TresGridHelper />
  </TresCanvas>
</template>
