<script setup lang="ts">
import { ContactShadows, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { EffectComposerPmndrs, ScanlinePmndrs } from '@tresjs/post-processing'

const gl = {
  clearColor: '#4f4f4f',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { blendFunction, opacity, density, scrollSpeed } = useControls({
  density: { value: 1.15, step: 0.001, max: 2 },
  opacity: { value: 1, step: 0.1, min: 0, max: 1 },
  scrollSpeed: { value: 0.05, step: 0.01, min: 0, max: 2 },
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
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshStandardMaterial color="white" :roughness="1" :metalness="1" />
    </TresMesh>

    <TresDirectionalLight color="white" />

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <ScanlinePmndrs :density="density" :opacity="opacity" :scrollSpeed="scrollSpeed" :blendFunction="Number(blendFunction)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
