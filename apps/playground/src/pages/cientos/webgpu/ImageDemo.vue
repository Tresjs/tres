<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Image, OrbitControls, useTexture } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL Image.
import { Image as GlslImage } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { DoubleSide, FrontSide, NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-image'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const ImageComponent = rendererFactory ? GlslImage : Image

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
  transparent,
  opacity,
  isDoubleSided,
} = useControls({
  url: { value: URLS[0], options: URLS },
  segments: { value: 1, min: 1, max: 10, step: 1 },
  scaleX: { value: 1.5, min: 0.1, max: 3, step: 0.01 },
  scaleY: { value: 1, min: 0.1, max: 3, step: 0.01 },
  isRed: false,
  zoom: { value: 1, min: 0.1, max: 3, step: 0.01 },
  radius: { value: 0.1, min: 0, max: 1, step: 0.01 },
  grayscale: { value: 0, min: 0, max: 1, step: 0.01 },
  transparent: true,
  opacity: { value: 1, min: 0, max: 1, step: 0.01 },
  isDoubleSided: true,
}, { uuid })

const checks = [
  'The center image fills its plane without stretching, like CSS `object-fit: cover`. Change `scaleX` and `scaleY`: the image crops, it does not squash',
  '`radius` rounds the corners of the center image (needs `transparent`). `zoom` scales the image about its center',
  '`grayscale` fades the colors to gray. `isRed` tints the image red. `opacity` fades it (needs `transparent`)',
  'Switching `url` swaps the image, with no errors. The left image uses the `texture` prop. The right image is on a circle',
  'The colors match `renderer: webgl` (the GLSL Image), and match the photo in a browser tab',
  'No errors and no <Image> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#333333" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <OrbitControls />
    <component :is="ImageComponent" :url="url" :position="[2.5, 0, 0]">
      <TresCircleGeometry />
    </component>
    <component
      :is="ImageComponent"
      :url="url"
      :segments="segments"
      :scale="[scaleX, scaleY]"
      :color="isRed ? '#F00' : '#FFF'"
      :zoom="zoom"
      :radius="radius"
      :grayscale="grayscale"
      :transparent="transparent"
      :opacity="opacity"
      :side="isDoubleSided ? DoubleSide : FrontSide"
    />
    <component :is="ImageComponent" v-if="birdsTexture" :texture="birdsTexture" :position="[-2.5, 0, 0]" />
  </TresCanvas>
</template>
