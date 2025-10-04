<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { DotScreenPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

const gl = {
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { angle, scale, blendFunction } = useControls({
  angle: { value: 1.57, min: -Math.PI, max: Math.PI, step: 0.001 },
  scale: { value: 0.5, min: 0.1, max: 2.5, step: 0.01 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
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

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="white" :roughness="1" :transmission="0" />
    </TresMesh>

    <Suspense>
      <Environment background :blur=".1" preset="dawn" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <DotScreenPmndrs :blendFunction="Number(blendFunction)" :angle="angle" :scale="scale" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
