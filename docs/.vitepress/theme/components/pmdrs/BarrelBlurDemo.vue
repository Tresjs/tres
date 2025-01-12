<script setup lang="ts">
import { Environment, OrbitControls, RoundedBox } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BarrelBlurPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#4f4f4f',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const { amount, offsetX, offsetY, blendFunction } = useControls({
  amount: { value: 0.25, step: 0.001, max: 1 },
  offsetX: { value: 0.5, step: 0.01, min: 0, max: 1 },
  offsetY: { value: 0.5, step: 0.01, min: 0, max: 1 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key],
    })),
    value: BlendFunction.OVERLAY,
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

    <Suspense>
      <Environment preset="shangai" />
    </Suspense>

    <RoundedBox :args="[2, 2, 2, 2, 0.25]">
      <TresMeshPhysicalMaterial
        color="white"
        :metalness=".9"
        :roughness=".5"
        :clearcoat="1.0"
        :clearcoatRoughness="0.1"
      />
    </RoundedBox>

    <Suspense>
      <EffectComposerPmndrs>
        <BarrelBlurPmndrs :amount="amount.value" :offset="[offsetX.value, offsetY.value]" :blendFunction="Number(blendFunction.value)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
