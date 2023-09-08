<script setup lang="ts">
import { shallowRef, watch } from 'vue'
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

function easeInOutQuint(x: number): number {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - (-2 * x + 2) ** 5 / 2
}

const colors = ['white', 'yellow', 'red', 'orange', 'purple']
const randomColor = () => colors[Math.trunc(Math.random() * colors.length)]
const color = randomColor()

const lightRef = shallowRef()
const seedPropsRef = shallowRef()
const elementsRef = shallowRef([{ color, size: 1 }])
elementsRef.value = new Array(11).fill(0).map((_, i) => ({ size: Math.min(256 / (1 + i * i)), color }))

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (!lightRef.value) return

  if (Math.random() > 0.99) {
    lightRef.value.color = new Color(randomColor())
    elementsRef.value = getFlareProps()
  }
})

function getFlareProps() {
  const NUM_ELEMENTS = 15
  return new Array(NUM_ELEMENTS).fill(0).map(
    (_, i) => ({
      size: 216 * (1 - easeInOutQuint(i / NUM_ELEMENTS)),
      distance: i < 5 ? 0 : easeInOutQuint(i / NUM_ELEMENTS),
      color: lightRef.value?.color ?? 'white',
    }))
}

elementsRef.value = getFlareProps()

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
    seed: { value: 847 },
    scale: { value: 1, min: 0, max: 2, step: 0.01 }
  });

{
  const TEXTURE_PATH
    = 'https://raw.githubusercontent.com/andretchen0/tresjs_assets/'
    + 'b1bc3780de73a9328a530767c9a7f4cbab060396/textures/lensflare/'
  const circle = `${TEXTURE_PATH}circle.png`
  const circleBlur = `${TEXTURE_PATH}cirlceBlur.png`
  const circleRainbow = `${TEXTURE_PATH}circleRainbow.png`
  const line = `${TEXTURE_PATH}line.png`
  const poly6 = `${TEXTURE_PATH}poly6.png`
  const polyStroke6 = `${TEXTURE_PATH}polyStroke6.png`
  const rays6 = `${TEXTURE_PATH}rays6.png`
  const ring = `${TEXTURE_PATH}ring.png`


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

  const [bodySize, bodySizeRand, bodyNumElements, bodyNumElementsRand,
    bodyColorA, bodyColorB, bodyColorC, bodySeed] = useControls(
      'Body',
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

  const [frontSize, frontSizeRand, frontOffset, frontSpread, frontNumElements, frontNumElementsRand,
    frontColorA, frontColorB, frontColorC, frontSeed] = useControls(
      'Front',
      {
        size2: { value: 20, min: 0, max: 512, step: 1 },
        sizeRand2: { value: 160, min: 0, max: 512, step: 1 },
        offset2: { value: 0.5, min: 0, max: 4, step: 0.1 },
        spread2: { value: 1, min: 0, max: 4, step: 0.1 },
        count2: { value: 5, min: 0, max: 20, step: 1 },
        countRand2: { value: 16, min: 0, max: 20, step: 1 },
        colorA2: '#ffffff',
        colorB2: '#808080',
        colorC2: '#a9a9a9',
        seed2: { value: 2, min: 0, max: 2 ** 31, step: 1 },
      },
    )

  const [backSize, backSizeRand, backOffset, backSpread, backNumElements, backNumElementsRand,
    backColorA, backColorB, backColorC, backSeed] = useControls(
      'Back',
      {
        size3: { value: 180, min: 0, max: 512, step: 1 },
        sizeRand3: { value: 90, min: 0, max: 512, step: 1 },
        offset3: { value: 0.5, min: 0, max: 4, step: 0.1 },
        spread3: { value: 0.5, min: 0, max: 4, step: 0.1 },
        count3: { value: 3, min: 0, max: 20, step: 1 },
        countRand3: { value: 2, min: 0, max: 20, step: 1 },
        colorA3: '#ffffff',
        colorB3: '#a9a9a9',
        colorC3: '#00008b',
        seed3: { value: 869412245, min: 0, max: 2 ** 31, step: 1 },
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
        texture: [circleBlur, rays6, circleRainbow, circle],
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
    <Levioso :speed="1">
      <TresPerspectiveCamera :position="[11, 11, 100]" />
    </Levioso>
    <OrbitControls />
    <Levioso :speed="1.3" :range="[-13, 13]" :rotation-factor="10">
      <TresPointLight ref="lightRef" :color="color" :intensity="1000" :position="[10, 0, 0]">
        <Lensflare :seed="seedRef.value.value" :scale="0.5" :elements="elementsRef" />
      </TresPointLight>
    </Levioso>
    <TresPointLight
      :color="new Color(1, 1, 1)"
      :intensity="2000"
      :position="[10, 5, 0]"
    >
      <Lensflare
        :seed="seedRef.value.value"
        :seed-props="seedPropsRef"
        :scale="scaleRef.value.value"
      />
    </TresPointLight>
    <Dodecahedron v-for="{ key, position, rotation, scale } in rocks" :key="key" :material="rockMaterial"
      :position="position" :rotation="rotation" :scale="scale" />
  </TresCanvas>
</template>
