<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { EffectComposerPmndrs, SepiaPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const { intensity, blendFunction } = useControls({
  intensity: { value: 1.0, step: 0.1, max: 5.0 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.NORMAL,
  },
})
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

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
      <Environment background :blur=".5" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <SepiaPmndrs :intensity="intensity.value" :blendFunction="Number(blendFunction.value)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
