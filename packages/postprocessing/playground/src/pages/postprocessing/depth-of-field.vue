<script lang="ts" setup>
import type { Ref } from 'vue'
import { Backdrop, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

import { DepthOfFieldPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { computed } from 'vue'
import BlenderCube from '../../components/BlenderCube.vue'

import Ducky from '../../components/Ducky.vue'

useControls('fpsgraph')
const controls = useControls({
  focusDistance: {
    value: 0.001,
    min: 0,
    max: 0.01,
    step: 0.0001,
  },
  /* worldFocusDistance: {
    value: 3.8,
    min: 0,
    max: 10,
    step: 0.001,
  },
  worldFocusRange: {
    value: 0.1,
    min: 0,
    max: 1,
    step: 0.001,
  }, */
  bokehScale: {
    value: 5.9,
    min: 1,
    max: 15,
    step: 0.01,
  },
  focusRange: {
    value: 0.011,
    min: 0,
    max: 1,
    step: 0.001,
  },
}) as { [key: string]: Ref<{ value: number }> }

const effectParams = computed(() =>
  Object
    .entries(controls)
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.value })
      , {},
    ),
)
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#ff9cce" shadows>
    <TresPerspectiveCamera
      :position="[0, 1, 5]"
      :look-at="[0, 1, 2]"
    />
    <OrbitControls />
    <Backdrop
      :floor="1.5"
      :scale="[100, 30, 30]"
      :position="[0, 0, -50]"
      receive-shadow
    >
      <TresMeshPhysicalMaterial
        :roughness="1"
        color="#ff9cce"
        :side="2"
      />
    </Backdrop>
    <TresGroup
      :position="[-5, 0.5, -10]"
      :scale="0.5"
    >
      <Suspense>
        <Ducky />
      </Suspense>
    </TresGroup>
    <TresGroup
      :position="[0, 0.5, 0]"
      :scale="0.5"
    >
      <Suspense>
        <BlenderCube />
      </Suspense>
    </TresGroup>
    <TresAmbientLight />
    <TresDirectionalLight
      :position="[5, 5, 5]"
      cast-shadow
    />

    <EffectComposerPmndrs>
      <DepthOfFieldPmndrs
        :bokeh-scale="effectParams.bokehScale"
        :focus-distance="effectParams.focusDistance"
        :focus-range="effectParams.focusRange"
      />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
