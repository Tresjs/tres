<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Film } from '@tresjs/post-processing'

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
    <TresMesh :position="[-1, 0.5, 0]">
      <TresSphereGeometry :args="[0.8, 32, 32]" />
      <TresMeshStandardMaterial color="#f0f0f0" />
    </TresMesh>
    <TresMesh :position="[1.2, 0.5, 0]">
      <TresTorusGeometry :args="[0.5, 0.2, 16, 32]" />
      <TresMeshStandardMaterial color="aqua" />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="0.8" />
    <TresDirectionalLight
      :position="[-5, 5, 5]"
      :intensity="1.5"
    />

    <Suspense>
      <EffectComposer ref="effectComposer">
        <Film :intensity="1" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
