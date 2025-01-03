<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { Color } from 'three'
import { reactive } from 'vue'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
}

const bloomParams = reactive({
  luminanceThreshold: 0.1,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 8,
  radius: 0.5,
  blendFunction: BlendFunction.ADD,
})

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const { effectComposer } = useRouteDisposal()
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        color="hotpink"
        :emissive="new Color('hotpink')"
        :emissive-intensity="1.2"
      />
    </TresMesh>
    <TresGridHelper />

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <Suspense>
      <EffectComposerPmndrs ref="effectComposer">
        <BloomPmndrs v-bind="bloomParams" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
