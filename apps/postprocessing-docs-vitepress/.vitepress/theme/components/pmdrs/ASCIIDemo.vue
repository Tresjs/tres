<script setup lang="ts">
import { Environment, Levioso, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ASCIIPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'


const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const leviosoProps = {
  speed: 2,
  rotationFactor: 2,
  range: [-1, 1] as [number, number],
}

const { size: textureSize, characters, font, fontSize, cellCount, enabled, blendFunction, opacity, cellSize, inverted, color, useSceneColor } = useControls({
  enabled: true,
  cellSize: { value: 10, step: 1, min: 2, max: 64 },
  useSceneColor: false,
  color: '#ffffff',
  inverted: false,
  characters: { value: ' .,:-~+=*≡TRESJCIENTOSLECHESPOSTPROCESSING3D#░▒▓█■▲◼◾' },
  font: { value: 'Arial' },
  fontSize: { value: 44, step: 1, min: 10, max: 100 },
  size: { value: 1024, step: 128, min: 256, max: 2048, label: 'textureSize' },
  cellCount: { value: 16, step: 1, min: 4, max: 64 },
  opacity: { value: 1, step: 0.1, min: 0.0, max: 1.0 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.LINEAR_BURN,
  },
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera :position="[5, 3, 7]" />
      <OrbitControls auto-rotate />

      <Levioso v-bind="leviosoProps">
        <TresMesh :position="[-2, .5, 0]">
          <TresBoxGeometry :args="[2, 2, 2]" />
          <TresMeshPhysicalMaterial color="white" />
        </TresMesh>
      </Levioso>

      <Levioso v-bind="leviosoProps">
        <TresMesh :position="[3, .5, 0]">
          <TresSphereGeometry :args="[1.5, 32, 32]" />
          <TresMeshPhysicalMaterial color="white" />
        </TresMesh>
      </Levioso>

      <Suspense>
        <Environment background :blur="0.2" preset="snow" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
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
              size: textureSize,
              cellCount,
            }"
          />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
