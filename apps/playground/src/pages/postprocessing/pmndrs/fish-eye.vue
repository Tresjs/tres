<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { EffectComposerPmndrs, FishEyePmndrs } from '@tresjs/post-processing'

const uuid = 'fish-eye-pmndrs'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

// Note: The variables [lensSX, lensSY], [lensFX, lensFY] are not used as vectors in useControls because the 'step' key is not yet available.

const { blendFunction, lensSX, lensSY, lensFX, lensFY, scale } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  lensSX: { value: 1.0, step: 0.01, min: 0, max: 2 },
  lensSY: { value: 1.0, step: 0.01, min: 0, max: 2 },
  lensFX: { value: 0.0, step: 0.01, min: -1, max: 1 },
  lensFY: { value: 1.0, step: 0.01, min: -1, max: 1 },
  scale: { value: 1.0, step: 0.01, min: 0.1, max: 2 },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 6.5, 7.5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[5, 0, 0]">
      <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[0, 0, 0]">
      <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[-5, 0, 0]">
      <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[0, 0, -5]">
      <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[0, 0, 5]">
      <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <Suspense>
      <Environment background preset="shangai" />
    </Suspense>

    <ContactShadows
      :opacity=".65"
      :position-y="-1"
      :scale="35"
      :blur="1"
    />

    <Suspense>
      <EffectComposerPmndrs>
        <FishEyePmndrs
          :blendFunction="Number(blendFunction)"
          :lensS="[lensSX, lensSY]"
          :lensF="[lensFX, lensFY]"
          :scale="scale"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
