<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, TiltShiftPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#33FFF5',
  '#FF5733',
  '#FF8D33',
]

const { blendFunction, offset, rotation, focusArea, feather } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  offset: { value: 0.0, min: -0.5, max: 0.5, step: 0.01 },
  rotation: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.01 },
  focusArea: { value: 0.7, min: 0, max: 1, step: 0.01 },
  feather: { value: 0.1, min: 0, max: 1, step: 0.01 },
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 4, 8]" />
      <OrbitControls auto-rotate />

      <template v-for="index in 50" :key="index">
        <TresMesh :position="[(index % 10) * 3 - 13.5, 0, Math.floor(index / 10) * 3 - 7.5]" :scale="[2, Math.random() * 5 + 2, 2]">
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshPhysicalMaterial
            :color="colors[index % colors.length]"
            :roughness="0.35"
            :metalness="0.5"
            :clearcoat="0.3"
            :clearcoatRoughness="0.25"
          />
        </TresMesh>
      </template>

      <Suspense>
        <Environment background :blur=".35" preset="snow" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
          <TiltShiftPmndrs
            :blendFunction="Number(blendFunction)"
            :offset="offset"
            :rotation="rotation"
            :focusArea="focusArea"
            :feather="feather"
          />
        </EffectComposerPmndrs>
      </Suspense>

      <TresGridHelper :position="[0, -3.5, 0]" :args="[30, 15]" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
