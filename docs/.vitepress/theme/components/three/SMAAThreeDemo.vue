<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, SMAA } from '@tresjs/post-processing'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

// Need to dispose of the effect composer when the route changes because Vitepress doesnt unmount the components
const { effectComposer } = useRouteDisposal()
</script>

<template>
  <TresCanvas
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
      <TresMeshNormalMaterial
        wireframe
      />
    </TresMesh>
    <TresMesh
      :position="[-1.5, 0.75, 0]"
    >
      <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshNormalMaterial />
      <TresMeshNormalMaterial
        wireframe
      />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="0.9" />
    <TresDirectionalLight
      :position="[-10, 5, 8]"
      :intensity="1"
    />

    <Suspense>
      <EffectComposer ref="effectComposer">
        <SMAA />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
