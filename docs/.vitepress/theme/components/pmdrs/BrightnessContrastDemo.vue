<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BrightnessContrastPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const { brightness, contrast, blendFunction } = useControls({
  brightness: { value: 0.25, step: 0.01, min: -1, max: 1 },
  contrast: { value: -0.5, step: 0.01, min: -1, max: 1 },
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
      <TresPerspectiveCamera :position="[5, 5, 5]" />
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
        <Environment background preset="sunset" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs>
          <BrightnessContrastPmndrs
            :brightness="brightness"
            :contrast="contrast"
            :blendFunction="Number(blendFunction)"
          />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
