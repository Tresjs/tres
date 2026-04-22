<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { EffectComposerPmndrs, FXAAPmndrs } from '@tresjs/post-processing'

const uuid = inject<string>('uuid')

const gl = {
  antialias: false,
  clearColor: '#2e3440',
  toneMapping: NoToneMapping,
}

const { blendFunction, wireframe, boxColor, opacity, samples, minEdgeThreshold, maxEdgeThreshold, subpixelQuality } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.SRC,
  },
  samples: { value: 12, min: 0, max: 32, step: 1 },
  minEdgeThreshold: { value: 0.0312, min: 0, max: 1, step: 0.001 },
  maxEdgeThreshold: { value: 0.125, min: 0, max: 1, step: 0.001 },
  subpixelQuality: { value: 0.75, min: 0, max: 1, step: 0.01 },
  boxColor: '#ffffff',
  wireframe: false,
  opacity: { value: 1, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 3.5]" />
    <OrbitControls
      auto-rotate
      :target="[0, 0.25, 0]"
    />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshBasicMaterial
        :color="boxColor"
        :wireframe="wireframe"
      />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <FXAAPmndrs
          :blend-function="Number(blendFunction)"
          :opacity="opacity"
          :samples="samples"
          :max-edge-threshold="maxEdgeThreshold"
          :min-edge-threshold="minEdgeThreshold"
          :subpixel-quality="subpixelQuality"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
