<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { BrightnessContrastPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const { brightness, contrast, blendFunction } = useControls({
  brightness: { value: 0.25, step: 0.01, min: -1, max: 1 },
  contrast: { value: -0.5, step: 0.01, min: -1, max: 1 },
  blendFunction: {
    options: Object.keys(BlendFunction).map((key: string) => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: Number(BlendFunction.SRC),
  },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="black" :roughness=".25" />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <Environment background preset="shangai" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <BrightnessContrastPmndrs
          :blendFunction="Number(blendFunction)"
          :brightness="brightness"
          :contrast="contrast"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
