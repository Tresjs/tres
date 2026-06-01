<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ColorAveragePmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

const uuid = inject<string>('uuid')

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { blendFunction, opacity } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
  opacity: {
    value: 1,
    min: 0,
    max: 1,
  },
}, { uuid })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[5, 2, 15]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, 0.5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#8B0000" :roughness=".25" />
    </TresMesh>

    <Suspense>
      <Environment background preset="shangai" />
    </Suspense>

    <EffectComposerPmndrs v-bind="glComposer">
      <ColorAveragePmndrs
        :blend-function="Number(blendFunction)"
        :opacity="opacity"
      />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
