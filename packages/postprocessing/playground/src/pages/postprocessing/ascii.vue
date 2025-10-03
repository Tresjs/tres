<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ASCIIPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const { enabled, blendFunction, opacity, cellSize, inverted, color, useSceneColor, characters, font, fontSize, size, cellCount } = useControls({
  enabled: true,
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  opacity: { value: 1, step: 0.1, min: 0.0, max: 1.0 },
  cellSize: { value: 12, step: 1, min: 2, max: 64 },
  useSceneColor: false,
  color: '#ffffff',
  inverted: false,
  characters: { value: '@#8&$%*o!;.' },
  font: { value: 'Arial' },
  fontSize: { value: 54, step: 1, min: 10, max: 100 },
  size: { value: 1024, step: 128, min: 256, max: 2048, label: 'textureSize' },
  cellCount: { value: 16, step: 1, min: 4, max: 64 },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 6.5, 7.5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="white" />
    </TresMesh>

    <Suspense>
      <Environment background preset="dawn" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <ASCIIPmndrs
          :blendFunction="enabled ? Number(blendFunction) : Number(BlendFunction.SKIP)"
          :opacity="opacity"
          :cellSize="cellSize"
          :inverted="inverted"
          :color="color"
          :useSceneColor="useSceneColor"
          :asciiTexture="{
            characters,
            font,
            fontSize,
            size,
            cellCount,
          }"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
