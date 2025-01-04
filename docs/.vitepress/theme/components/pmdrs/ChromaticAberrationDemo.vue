<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Vector2 } from 'three'
import { shallowRef, watchEffect } from 'vue'
import { ChromaticAberrationPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const chromaticAberrationRef = shallowRef(null)

const { offsetX, offsetY, radialModulation, modulationOffset } = useControls({
  offsetX: { value: 0.070, step: 0.001, max: 0.5 },
  offsetY: { value: 0.070, step: 0.001, max: 0.5 },
  radialModulation: true,
  modulationOffset: { value: 0, step: 0.01 },
})

watchEffect(() => {
  modulationOffset.value.visible = radialModulation.value.value
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

    <template
      v-for="i in 4"
      :key="i"
    >
      <TresMesh
        :position="[((i - 1) - (4 - 1) / 2) * 1.5, 0, 0]"
      >
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshStandardMaterial color="#1C1C1E" />
      </TresMesh>
    </template>

    <TresAmbientLight color="#ffffff" />

    <TresDirectionalLight />

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
      :scale="20"
      :blur=".85"
    />

    <Suspense>
      <EffectComposerPmndrs>
        <ChromaticAberrationPmndrs ref="chromaticAberrationRef" :offset="new Vector2(offsetX.value, offsetY.value)" :radial-modulation="radialModulation.value" :modulation-offset="modulationOffset.value" />
      </EffectComposerPmndrs>
    </Suspense>

    <Suspense>
      <Environment :intensity="2" :blur="0" preset="snow" />
    </Suspense>
  </TresCanvas>
</template>
