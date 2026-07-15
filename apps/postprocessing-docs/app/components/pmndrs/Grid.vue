<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { EffectComposerPmndrs, GridPmndrs } from '@tresjs/post-processing'

const uuid = inject<string>('uuid')

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const { blendFunction, scale, lineWidth } = useControls({
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.OVERLAY,
  },
  scale: { value: 0.25, step: 0.01, min: 0.0, max: 2.0 },
  lineWidth: { value: 0.1, step: 0.01, max: 2.0 },
}, { uuid })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial
        color="black"
        :roughness=".25"
      />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <Environment
        background
        :blur=".5"
        preset="snow"
      />
    </Suspense>

    <EffectComposerPmndrs>
      <GridPmndrs
        :blend-function="Number(blendFunction)"
        :scale="scale"
        :line-width="lineWidth"
      />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
