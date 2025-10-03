<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, PixelationPmndrs } from '@tresjs/post-processing'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const { effectComposer } = useRouteDisposal()
</script>

<template>
  <TresCanvas
    clear-color="#121212"
    :alpha="false"
    :shadows="true"
  >
    <TresPerspectiveCamera
      :position="[3, 2, 4]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh
      :position="[1, 0.5, 1]"
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial
        color="hotpink"
      />
    </TresMesh>
    <TresMesh
      :position="[-1.5, 0.75, 0]"
    >
      <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshNormalMaterial />
      <TresMeshStandardMaterial
        color="aqua"
      />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="0.9" />
    <TresDirectionalLight
      :position="[-10, 5, 8]"
      :intensity="1"
    />

    <Suspense>
      <EffectComposerPmndrs ref="effectComposer">
        <PixelationPmndrs :granularity="8" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
