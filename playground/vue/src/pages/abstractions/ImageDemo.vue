<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Image, OrbitControls } from '@tresjs/cientos'
import { Color, DoubleSide, FrontSide, NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const URLS = [
  'https://upload.wikimedia.org/wikipedia/commons/1/13/20220713-great-tit.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/00/Friendly_Robin.jpg',
]

const c = useControls({
  url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Mars_2009_Plouaret.jpg',
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
  enabled: true,
})

const opacity = shallowRef(1)
const url = shallowRef(URLS[0])
const sx = shallowRef(1)

let elapsed = 0
setInterval(() => {
  elapsed += 0.01
  opacity.value = Math.abs(Math.sin(elapsed))
  url.value = Math.sin(elapsed) > 0 ? URLS[0] : URLS[1]
  sx.value = (Math.cos(elapsed) * 0.5 + 0.5)
}, 1000 / 30)
</script>

<template>
  <TresLeches />
  <TresCanvas :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera />
    <OrbitControls />
    <Image
      :position-y="2"
      :url="url"
      :radius="opacity"
      :color="new Color('white')"
    >
      <TresBoxGeometry />
    </Image>
    <Image
      v-if="c.enabled.value.value"
      :url="c.url.value.value"
      :segments="c.segments.value.value"
      :scale="[c.scaleX.value.value, c.scaleY.value.value]"
      :color="c.isRed.value.value ? '#F00' : '#FFF'"
      :zoom="c.zoom.value.value"
      :radius="c.radius.value.value"
      :grayscale="c.grayscale.value.value"
      :tone-mapped="c.toneMapped.value.value"
      :transparent="c.transparent.value.value"
      :opacity="c.opacity.value.value"
      :side="c.isDoubleSided.value.value ? DoubleSide : FrontSide"
    />
    <Image
      :position-x="2"
      :scale="[sx, 1]"
      :url="url"
    />
    <Image
      :position-y="-2"
      :scale="sx"
      :url="url"
    >
      <TresCircleGeometry />
    </Image>

    <Image
      :position-x="-2"
      :url="url"
      :radius="opacity"
      :transparent="true"
    />
  </TresCanvas>
</template>
