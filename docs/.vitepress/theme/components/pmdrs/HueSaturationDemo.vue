<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, HueSaturationPmndrs } from '@tresjs/post-processing'

import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { saturation, hue, blendFunction } = useControls({
  hue: { value: -Math.PI, min: -Math.PI, max: Math.PI, step: 0.001 },
  saturation: { value: 1, min: -1, max: 1, step: 0.001 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.SRC,
  },
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera
        :position="[5, 5, 5]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls auto-rotate />

      <TresMesh :position="[0, 1, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshPhysicalMaterial color="white" />
      </TresMesh>

      <Suspense>
        <Environment background :blur=".25" preset="modern" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
          <HueSaturationPmndrs :blendFunction="Number(blendFunction)" :hue="hue" :saturation="saturation" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>

  <TresLeches :float="false" />
</template>
