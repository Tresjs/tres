<script setup lang="ts">
import { Environment, Levioso, OrbitControls, Ring, Sphere, Stars } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { DoubleSide, MathUtils, NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { EffectComposerPmndrs, ScanlinePmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#000000',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const { blendFunction, opacity, density, scrollSpeed } = useControls({
  density: { value: 1.15, step: 0.001, max: 2 },
  opacity: { value: 0.65, step: 0.1, min: 0, max: 1 },
  scrollSpeed: { value: 0.05, step: 0.01, min: 0, max: 2 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.HARD_MIX,
  },
})
</script>

<template>
  <TresLeches style="left: initial;right:10px; top:10px;" />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[6.5, 3, 6.5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate :auto-rotate-speed=".5" />

    <Suspense>
      <Environment :blur="1" preset="snow" />
    </Suspense>

    <TresAmbientLight />

    <TresGroup :rotation-y="MathUtils.degToRad(5)" :rotation-x="MathUtils.degToRad(100)">
      <Sphere :args="[2, 32, 16]">
        <TresMeshPhysicalMaterial color="#FC7BAC" :side="DoubleSide" :transmission=".5" />
      </Sphere>

      <Levioso :speed="2.5" :rotationFactor="1" :floatFactor=".5">
        <Ring :args="[4.25, 2.5, 32]" :scale-y="-1" :position-z="-.25">
          <TresMeshPhysicalMaterial color="#ffffff" :side="DoubleSide" :transmission=".25" />
        </Ring>
      </Levioso>
    </TresGroup>

    <Stars />

    <Suspense>
      <EffectComposerPmndrs>
        <ScanlinePmndrs :density="density.value" :opacity="opacity.value" :scrollSpeed="scrollSpeed.value" :blendFunction="Number(blendFunction.value)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
