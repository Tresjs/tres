<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BlendFunction, ToneMappingMode } from 'postprocessing'
import { NoToneMapping } from 'three'
import { EffectComposerPmndrs, ToneMappingPmndrs } from '@tresjs/post-processing'


const gl = {
  clearColor: 'white',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { blendFunction, resolution, mode } = useControls({
  mode: {
    options: Object.keys(ToneMappingMode).map(key => ({
      text: key,
      value: ToneMappingMode[key as keyof typeof ToneMappingMode],
    })),
    value: ToneMappingMode.AGX,
  },
  resolution: {
    value: 256,
    options: [
      { text: '128', value: 128 },
      { text: '256', value: 256 },
      { text: '512', value: 512 },
      { text: '1024', value: 1024 },
      { text: '2048', value: 2048 },
    ],
  },
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
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh>
      <TresBoxGeometry />
      <TresMeshPhysicalMaterial color="#FFFFFF" :roughness=".25" :transmission=".85" />
    </TresMesh>

    <Suspense>
      <Environment background :blur=".85" preset="dawn" />
    </Suspense>

    <ContactShadows
      :opacity=".5"
      :position-y="-.5"
    />

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <ToneMappingPmndrs :mode="Number(mode)" :resolution="Number(resolution)" :blendFunction="Number(blendFunction)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
