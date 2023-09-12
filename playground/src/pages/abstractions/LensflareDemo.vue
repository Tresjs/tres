<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import type { TresColor } from '@tresjs/core'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Levioso, Lensflare, Dodecahedron, OrbitControls } from '@tresjs/cientos'
import { Color, MeshPhongMaterial } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#000000',
  shadows: false,
  alpha: false,
}

const colors = ['white', 'yellow', 'red', 'orange', 'purple']
const randomColor = () => new Color(colors[Math.trunc(Math.random() * colors.length)])

const colorRef = shallowRef(randomColor() as TresColor)
const seedPropsRef = shallowRef()
const speedRef = shallowRef(1)

const { onLoop } = useRenderLoop()

let cooldown = 5
onLoop(({ delta }) => {
  cooldown -= delta
  while (cooldown < 0) {
    colorRef.value = randomColor()
    cooldown += 5
  }
})

const TEXTURE_PATH
  = 'https://raw.githubusercontent.com/Tresjs/assets/93976c7d63ac83d4a254a41a10b2362bc17e90c9/textures/lensflare/'
const circle = `${TEXTURE_PATH}circle.png`
const circleBlur = `${TEXTURE_PATH}circleBlur.png`
const circleRainbow = `${TEXTURE_PATH}circleRainbow.png`
const line = `${TEXTURE_PATH}line.png`
const poly6 = `${TEXTURE_PATH}poly6.png`
const polyStroke6 = `${TEXTURE_PATH}polyStroke6.png`
const rays = `${TEXTURE_PATH}rays.png`
const rays6 = `${TEXTURE_PATH}rays6.png`
const ring = `${TEXTURE_PATH}ring.png`

const float = (lo: number, hi: number) => Math.random() * (hi - lo) + lo
const floatSpread = (range: number) => Math.random() * range - range * 0.5
const ROCK_COUNT = 1000
const ROCK_DISTANCE = 200
const ROCK_SCALE = 3
const rocks = new Array(ROCK_COUNT).fill(0).map((_, i) => ({
  position: [0, 0, 0].map(() => floatSpread(ROCK_DISTANCE)),
  rotation: [0, 0, 0].map(() => floatSpread(Math.PI * 2)),
  scale: [0, 0, 0].map(() => float(ROCK_SCALE, ROCK_SCALE * 2)),
  key: i,
}))

const rockMaterial = new MeshPhongMaterial({ color: 0x123141, specular: 0xffffff, shininess: 1000 })

const [seedRef, scaleRef] = useControls(
  {
    seed: { value: 847, min: 0, max: 2 ** 31, step: 1 },
    scale: { value: 1, min: 0, max: 2, step: 0.01 },
  })

{
  const [oversizeSize, oversizeSizeRand, oversizeNumElements,
    oversizeNumElementsRand, oversizeColorA, oversizeColorB, oversizeColorC, oversizeSeed] = useControls(
    'Oversize',
    {
      size0: { value: 768, min: 0, max: 1024, step: 1 },
      sizeRand0: { value: 512, min: 0, max: 1024, step: 1 },
      count0: { value: 1, min: 0, max: 20, step: 1 },
      countRand0: { value: 2, min: 0, max: 20, step: 1 },
      colorA0: '#ffffff',
      colorB0: '#ffffff',
      colorC0: '#ffffff',
      seed0: { value: 930104199, min: 0, max: 2 ** 31, step: 1 },
    })

  const [raysSize, raysSizeRand, raysNumElements, raysNumElementsRand,
    raysColorA, raysColorB, raysColorC, raysSeed] = useControls(
    'Rays',
    {
      size1: { value: 180, min: 0, max: 512, step: 1 },
      sizeRand1: { value: 256, min: 0, max: 512, step: 1 },
      count1: { value: 2, min: 0, max: 20, step: 1 },
      countRand1: { value: 1, min: 0, max: 20, step: 1 },
      colorA1: '#ffffff',
      colorB1: '#ffffff',
      colorC1: '#808080',
      seed1: { value: 1021142105, min: 0, max: 2 ** 31, step: 1 },
    })

  const [bodySize, bodySizeRand, bodyNumElements, bodyNumElementsRand,
    bodyColorA, bodyColorB, bodyColorC, bodySeed] = useControls(
    'Body',
    {
      size2: { value: 180, min: 0, max: 512, step: 1 },
      sizeRand2: { value: 256, min: 0, max: 512, step: 1 },
      count2: { value: 2, min: 0, max: 20, step: 1 },
      countRand2: { value: 1, min: 0, max: 20, step: 1 },
      colorA2: '#ffffff',
      colorB2: '#ffffff',
      colorC2: '#808080',
      seed2: { value: 1248736959, min: 0, max: 2 ** 31, step: 1 },
    })

  const [frontSize, frontSizeRand, frontOffset, frontSpread, frontNumElements, frontNumElementsRand,
    frontColorA, frontColorB, frontColorC, frontSeed] = useControls(
    'Front',
    {
      size3: { value: 20, min: 0, max: 512, step: 1 },
      sizeRand3: { value: 160, min: 0, max: 512, step: 1 },
      offset3: { value: 0.5, min: 0, max: 4, step: 0.1 },
      spread3: { value: 1, min: 0, max: 4, step: 0.1 },
      count3: { value: 5, min: 0, max: 20, step: 1 },
      countRand3: { value: 16, min: 0, max: 20, step: 1 },
      colorA3: '#ffffff',
      colorB3: '#808080',
      colorC3: '#a9a9a9',
      seed3: { value: 1673580564, min: 0, max: 2 ** 31, step: 1 },
    },
  )

  const [backSize, backSizeRand, backOffset, backSpread, backNumElements, backNumElementsRand,
    backColorA, backColorB, backColorC, backSeed] = useControls(
    'Back',
    {
      size4: { value: 180, min: 0, max: 512, step: 1 },
      sizeRand4: { value: 90, min: 0, max: 512, step: 1 },
      offset4: { value: 0.5, min: 0, max: 4, step: 0.1 },
      spread4: { value: 0.5, min: 0, max: 4, step: 0.1 },
      count4: { value: 3, min: 0, max: 20, step: 1 },
      countRand4: { value: 2, min: 0, max: 20, step: 1 },
      colorA4: '#ffffff',
      colorB4: '#a9a9a9',
      colorC4: '#00008b',
      seed4: { value: 1764618553, min: 0, max: 2 ** 31, step: 1 },
    },
  )

  const updateSeedProps = () => {
    seedPropsRef.value = [
      {
        texture: [line, ring],
        color: [oversizeColorA.value.value, oversizeColorB.value.value, oversizeColorC.value.value],
        distance: [0, 0],
        size: [
          Math.max(0, Math.floor(oversizeSize.value.value - 0.5 * oversizeSizeRand.value.value)),
          Math.max(0, Math.floor(oversizeSize.value.value + 0.5 * oversizeSizeRand.value.value)),
        ],
        length: [
          Math.max(0, Math.floor(oversizeNumElements.value.value - 0.5 * oversizeNumElementsRand.value.value)),
          Math.max(0, Math.floor(oversizeNumElements.value.value + 0.5 * oversizeNumElementsRand.value.value)),
        ],
        seed: oversizeSeed.value.value,
      },
      {
        texture: [rays, rays6],
        color: [raysColorA.value.value, raysColorB.value.value, raysColorC.value.value],
        distance: [0, 0],
        size: [
          Math.max(0, Math.floor(raysSize.value.value - 0.5 * raysSizeRand.value.value)),
          Math.max(0, Math.floor(raysSize.value.value + 0.5 * raysSizeRand.value.value)),
        ],
        length: [
          Math.max(0, Math.floor(raysNumElements.value.value - 0.5 * raysNumElementsRand.value.value)),
          Math.max(0, Math.floor(raysNumElements.value.value + 0.5 * raysNumElementsRand.value.value)),
        ],
        seed: raysSeed.value.value,
      },
      {
        texture: [circleBlur, circleRainbow, circle],
        color: [bodyColorA.value.value, bodyColorB.value.value, bodyColorC.value.value],
        distance: [0, 0],
        size: [
          Math.max(0, Math.floor(bodySize.value.value - 0.5 * bodySizeRand.value.value)),
          Math.max(0, Math.floor(bodySize.value.value + 0.5 * bodySizeRand.value.value)),
        ],
        length: [
          Math.max(0, Math.floor(bodyNumElements.value.value - 0.5 * bodyNumElementsRand.value.value)),
          Math.max(0, Math.floor(bodyNumElements.value.value + 0.5 * bodyNumElementsRand.value.value)),
        ],
        seed: bodySeed.value.value,
      },
      {
        texture: [circleBlur, ring, poly6, polyStroke6],
        color: [frontColorA.value.value, frontColorB.value.value, frontColorC.value.value],
        distance: [frontOffset.value.value, frontOffset.value.value + frontSpread.value.value],
        size: [
          Math.max(0, Math.floor(frontSize.value.value - 0.5 * frontSizeRand.value.value)),
          Math.max(0, Math.floor(frontSize.value.value + 0.5 * frontSizeRand.value.value)),
        ],
        length: [
          Math.max(0, Math.floor(frontNumElements.value.value - 0.5 * frontNumElementsRand.value.value)),
          Math.max(0, Math.floor(frontNumElements.value.value + 0.5 * frontNumElementsRand.value.value)),
        ],
        seed: frontSeed.value.value,
      },
      {
        texture: [circleBlur, ring, poly6, polyStroke6],
        color: [backColorA.value.value, backColorB.value.value, backColorC.value.value],
        distance: [-backOffset.value.value, -backOffset.value.value - backSpread.value.value],
        size: [
          Math.max(0, Math.floor(backSize.value.value - 0.5 * backSizeRand.value.value)),
          Math.max(0, Math.floor(backSize.value.value + 0.5 * backSizeRand.value.value)),
        ],
        length: [
          Math.max(0, Math.floor(backNumElements.value.value - 0.5 * backNumElementsRand.value.value)),
          Math.max(0, Math.floor(backNumElements.value.value + 0.5 * backNumElementsRand.value.value)),
        ],
        seed: backSeed.value.value,
      },
    ]
  }

  watch(() => [
    seedRef.value,

    oversizeSize.value.value, oversizeSizeRand.value.value,
    oversizeNumElements.value.value, oversizeNumElementsRand.value.value,
    oversizeColorA.value.value, oversizeColorB.value.value, oversizeColorC.value.value,
    oversizeSeed.value.value,

    raysSize.value.value, raysSizeRand.value.value,
    raysNumElements.value.value, raysNumElementsRand.value.value,
    raysColorA.value.value, raysColorB.value.value, raysColorC.value.value,
    raysSeed.value.value,

    bodySize.value.value, bodySizeRand.value.value,
    bodyNumElements.value.value, bodyNumElementsRand.value.value,
    bodyColorA.value.value, bodyColorB.value.value, bodyColorC.value.value,
    bodySeed.value.value,

    frontSize.value.value, frontSizeRand.value.value,
    frontNumElements.value.value, frontNumElementsRand.value.value,
    frontOffset.value.value, frontSpread.value.value,
    frontColorA.value.value, frontColorB.value.value, frontColorC.value.value,
    frontSeed.value.value,

    backSize.value.value, backSizeRand.value.value,
    backNumElements.value.value, backNumElementsRand.value.value,
    backOffset.value.value, backSpread.value.value,
    backColorA.value.value, backColorB.value.value, backColorC.value.value,
    backSeed.value.value,
  ], updateSeedProps)

  updateSeedProps()
}
</script>

<template>
  <TresLeches class="important-fixed" />
  <TresCanvas v-bind="gl">
    <Levioso :speed="speedRef">
      <TresPerspectiveCamera :position="[11, 11, 100]" />
    </Levioso>
    <OrbitControls />
    <Levioso
      :speed="1.3"
      :range="[-13, 13]"
      :rotation-factor="10"
    >
      <TresPointLight
        :color="colorRef"
        :intensity="1000"
        :position="[10, 0, 0]"
      >
        <Lensflare
          :color="colorRef"
          :texture="circleBlur"
          :distance="0.2"
          :size="216"
          :scale="0.45"
          :elements="[
            { texture: ring, size: 512, distance: 0 },
            { texture: rays, distance: 0, color: 'white' },
            { distance: 0 },
            { distance: 0.1, size: 124 },
            { distance: 0.14, size: 90 },
            { texture: ring, size: 80 },
          ]"
        />
      </TresPointLight>
    </Levioso>

    <TresPointLight
      color="white"
      :intensity="2000"
      :position="[10, 5, 0]"
    >
      <Lensflare
        :scale="scaleRef.value.value"
        :seed="seedRef.value.value"
        :seed-props="seedPropsRef"
      />
    </TresPointLight>

    <Dodecahedron
      v-for="{ key, position, rotation, scale } in rocks"
      :key="key"
      :material="rockMaterial"
      :position="position"
      :rotation="rotation"
      :scale="scale"
    />
  </TresCanvas>
</template>
