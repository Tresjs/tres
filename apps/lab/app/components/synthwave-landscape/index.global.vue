<script lang="ts" setup>
import { SRGBColorSpace, CineonToneMapping } from 'three'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise'
import { clamp } from 'three/src/math/MathUtils'
import { PALETTE } from './palette'
import { EffectComposerPmndrs } from '@tresjs/post-processing'

const gl = {
  clearColor: PALETTE[0],
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: CineonToneMapping,
}

const PI2 = Math.PI * 2
const NOISE_PEAK = 4
const NOISE_SCALE = 6
const TERRAIN_SCALE = [120, 6, 360]
const SPEED = 0.0375
const noise = new ImprovedNoise().noise

const pathGen = (yy: number): [number, number, number] => {
  const path = Math.sin(PI2 * yy * 2) * 0.05
  const wave = Math.sin(PI2 * yy * 3) * 0.3
  return [path, wave, yy]
}

function fract(a: number) {
  return a - Math.floor(a)
}

function pingpong(a: number, b: number) {
  if (b == 0.0) {
    return 0.0
  }
  else {
    return Math.abs(fract((a - b) / (b * 2.0)) * b * 2.0 - b)
  }
}

const terrainGen = (planeX: number, planeY: number): [number, number, number] => {
  const [path, wave, z] = pathGen(planeY)
  const x = planeX
  const noiseV = Math.abs(
    noise(planeX * NOISE_SCALE, pingpong(planeY * 4, 0.5) * (NOISE_SCALE * (2 * Math.sin(PI2 * planeY))), 0),
  )
  const noisePeaks = -(NOISE_PEAK + Math.abs(Math.sin(PI2 * planeY))) * noiseV
  const y = (noisePeaks + noisePeaks * Math.abs(wave)) * Math.abs(Math.sin(PI2 * (planeX - path))) + wave
  return [-x, -y, z]
}
const x = shallowRef(0)
const y = shallowRef(0)
const z = shallowRef(0)
const dayProgress = shallowRef(0)

const onLoop = ({ elapsed }: { elapsed: number }) => {
  const [xx, yy, _] = pathGen(elapsed * SPEED)
  x.value = xx * TERRAIN_SCALE[0]
  y.value = yy * TERRAIN_SCALE[1] + 3
  z.value = 0
  dayProgress.value = clamp(Math.cos(elapsed * SPEED * 2) + 0.5, 0, 1)
}
</script>

<template>
  <SynthwaveLandscapeMusicPlayer />
  <TresCanvas v-bind="gl" :disable-render="false" @loop="onLoop">
    <EffectComposerPmndrs>
      <BloomPmndrs :radius="4" :intensity="0.4" :luminance-threshold="0" :luminance-smoothing="0.3" mipmap-blur />
      <ScanlinePmndrs :density="642" />
    </EffectComposerPmndrs>

    <TresPerspectiveCamera :position="[x, y, z]">
      <TresPointLight :intensity="1000" :position="[0, 3, 0]" :color="PALETTE[6]" />
      <SynthwaveLandscapeMountain :color="PALETTE[8]" :position="[0, 0, -500]" :scale="[24, 24, 12]" />

      <SynthwaveLandscapeSun :scale="100" :color-a="PALETTE[3]" :color-b="PALETTE[7]" :position="[0, 133, -600]" />

      <SynthwaveLandscapeGrid :scale="2660" :position="[0, 71, -600]" :progress="dayProgress" :num-divisions="39"
        :color="PALETTE[1]" :fill="PALETTE[2]" :col-fills="[
          { color: PALETTE[6], colNum: -1 },
          { color: PALETTE[6], colNum: 0 },
          { color: PALETTE[6], colNum: 1 },
        ]" />
      <Stars :scale="5" :count="1000" />
    </TresPerspectiveCamera>
    <TresAmbientLight :color="PALETTE[3]" :intensity="40 * (1 - dayProgress)" />
    <TresDirectionalLight :intensity="20 + 80 * dayProgress" :position="[0, 70, -400]" :color="PALETTE[3]" />
    <TresDirectionalLight :intensity="100 * dayProgress" :position="[200, 0, 100]" :color="PALETTE[1]" />

    <SynthwaveLandscapeTerrain :terrain-gen-fn="terrainGen" :camera-z="z" :color-fills="PALETTE[2]"
      :color-lines="dayProgress > 0.5 ? PALETTE[4] : PALETTE[8]" :color-dust="PALETTE[3]" :scale="TERRAIN_SCALE"
      :speed="SPEED" :shininess="dayProgress" />
    <SynthwaveLandscapeGradientSky :color-sky="PALETTE[3]" :color-ground="PALETTE[5]" :size="1000" :offset="0.3"
      :scale="2" />
    <TheScreenshot />
  </TresCanvas>
</template>
