<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, Precipitation } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL Precipitation.
import { Precipitation as GlslPrecipitation } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { CanvasTexture, NoToneMapping, SRGBColorSpace } from 'three'
import { computed } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-precipitation'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const PrecipitationComponent = rendererFactory ? GlslPrecipitation : Precipitation

// A soft disc: `map` tints it, `alphaMap` cuts the square sprite into a round drop.
const canvas = document.createElement('canvas')
canvas.width = canvas.height = 64
const context = canvas.getContext('2d')!
const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
gradient.addColorStop(0, '#ffffff')
gradient.addColorStop(0.5, '#88ccff')
gradient.addColorStop(1, '#000000')
context.fillStyle = gradient
context.fillRect(0, 0, 64, 64)
const discUrl = canvas.toDataURL()
const discTexture = new CanvasTexture(canvas)
discTexture.colorSpace = SRGBColorSpace

const { speed, randomness, count, size, sizeAttenuation, areaX, areaY, areaZ, color, opacity, texture } = useControls({
  speed: { value: 1, min: 0, max: 10, step: 0.1 },
  randomness: { value: 0.5, min: 0, max: 10, step: 0.1 },
  count: { value: 3000, min: 500, max: 30000, step: 10 },
  size: { value: 0.2, min: 0.001, max: 1, step: 0.001 },
  sizeAttenuation: true,
  areaX: { value: 25, min: 1, max: 30, step: 1 },
  areaY: { value: 25, min: 1, max: 30, step: 1 },
  areaZ: { value: 25, min: 1, max: 30, step: 1 },
  color: '#ffffff',
  opacity: { value: 0.8, min: 0, max: 1, step: 0.05 },
  texture: { value: 'none', options: ['none', 'texture', 'url'] },
}, { uuid })

// `url` passes a string, so the component loads it with `useTexture`.
const textureProp = computed(() => ({ none: null, texture: discTexture, url: discUrl })[texture.value as 'none' | 'texture' | 'url'])

const checks = [
  'White square drops fall down and wrap around at the bottom of the area',
  '`size` changes the drop size at once. Drops near the camera are bigger with `sizeAttenuation` on',
  '`speed` and `randomness` change the fall speed and the sideways drift',
  '`count` and the area controls rebuild the drops, which keep falling',
  '`texture: texture` and `texture: url` set `map` and `alphaMap`: drops become round and light blue at the edge',
  '`color` tints the drops and `opacity` fades them',
  'The result matches `renderer: webgl` (the GLSL Precipitation)',
  'No errors and no <Precipitation> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#222222" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <OrbitControls />
    <component
      :is="PrecipitationComponent"
      :speed="speed"
      :randomness="randomness"
      :area="[areaX, areaY, areaZ]"
      :count="count"
      :size="size"
      :size-attenuation="sizeAttenuation"
      :color="color"
      :opacity="opacity"
      :map="textureProp"
      :alpha-map="textureProp"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
