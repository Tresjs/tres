<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, PixelationPmndrs } from '@tresjs/post-processing'

useControls('fpsgraph')
const { granularity } = useControls({
  granularity: {
    value: 10,
    min: 1,
    max: 30,
    step: 1,
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas render-mode="on-demand">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh
      :position="[-3.5, 1, 0]"
    >
      <TresConeGeometry :args="[1.25, 2, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[3.5, 1, 0]">
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresGridHelper />

    <EffectComposerPmndrs>
      <PixelationPmndrs :granularity="granularity" />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
