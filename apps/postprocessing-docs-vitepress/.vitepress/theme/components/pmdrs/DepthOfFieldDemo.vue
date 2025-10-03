<script lang="ts" setup>
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Backdrop } from '@tresjs/cientos'
import { DepthOfFieldPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

import Ducky from '../Ducky.vue'
import { useRouteDisposal } from '../../composables/useRouteDisposal'

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const { effectComposer } = useRouteDisposal()

const effectParams = ref({
  focusDistance: 0.001,
  bokehScale: 5.9,
  focusRange: 0.011,
})
</script>

<template>
  <TresCanvas clear-color="#ff9cce" shadows>
    <TresPerspectiveCamera
      :position="[0, 1, 3]"
      :look-at="[0, 0.75, 2]"
    />
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
      <Ducky />
    </TresGroup>
    <TresGroup
      :position="[0, 0.5, 0]"
      :scale="0.5"
    >
      <BlenderCube />
    </TresGroup>
    <TresAmbientLight />
    <TresDirectionalLight
      :position="[5, 5, 5]"
      cast-shadow
    />

    <EffectComposerPmndrs ref="effectComposer">
      <DepthOfFieldPmndrs
        :bokeh-scale="effectParams.bokehScale"
        :focus-distance="effectParams.focusDistance"
        :focus-range="effectParams.focusRange"
      />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
