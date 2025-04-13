<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { BarrelBlurPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const neonColors = [
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#00FF00', // Lime
  '#FFFF00', // Yellow
  '#FF0000', // Red
  '#FF1493', // Deep Pink
  '#7FFF00', // Chartreuse
  '#FF4500', // Orange Red
  '#8A2BE2', // Blue Violet
  '#00FF7F', // Spring Green
  '#FFD700', // Gold
  '#FF69B4', // Hot Pink
  '#ADFF2F', // Green Yellow
  '#FF6347', // Tomato
  '#40E0D0', // Turquoise
  '#EE82EE', // Violet
]

const { blendFunction, amount, offsetX, offsetY } = useControls({
  amount: { value: 0.2, step: 0.001, max: 1 },
  offsetX: { value: 0.5, step: 0.01, min: 0, max: 1 },
  offsetY: { value: 0.5, step: 0.01, min: 0, max: 1 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.OVERLAY,
  },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 6.5, 6.5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresAmbientLight :intensity="1" />

    <template v-for="(color, index) in neonColors" :key="index">
      <TresMesh :position="[index % 4 * 2 - 3, 0, Math.floor(index / 4) * 2 - 3]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshStandardMaterial :color="color" :roughness=".5" :metalness="1" />
      </TresMesh>
    </template>

    <Suspense>
      <Environment :blur=".25" preset="snow" />
    </Suspense>

    <TresDirectionalLight color="white" />

    <ContactShadows
      :opacity=".65"
      :position-y="-1"
      :scale="35"
      :blur="1"
    />

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <BarrelBlurPmndrs :amount="amount" :offset="[offsetX, offsetY]" :blendFunction="Number(blendFunction)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
