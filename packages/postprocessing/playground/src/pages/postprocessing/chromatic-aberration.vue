<script setup lang="ts">
import { ContactShadows, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Vector2 } from 'three'
import { watchEffect } from 'vue'
import { BlendFunction } from 'postprocessing'
import { ChromaticAberrationPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'


// TODO: Adapt watchEffect to useControls for visibility of modulationOffset

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { offsetX, offsetY, radialModulation, modulationOffset, blendFunction } = useControls({
  offsetX: { value: 0.085, step: 0.001, max: 0.5 },
  offsetY: { value: 0.0, step: 0.001, max: 0.5 },
  radialModulation: false,
  modulationOffset: { value: 0, step: 0.01 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.SRC,
  },
})

watchEffect(() => {
  // modulationOffset.value.visible = radialModulation.value.value
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
      <TresMeshPhysicalMaterial color="#82DBC5" :roughness=".25" />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <ChromaticAberrationPmndrs :offset="new Vector2(offsetX, offsetY)" :radial-modulation="radialModulation" :modulation-offset="modulationOffset" :blendFunction="Number(blendFunction)" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
