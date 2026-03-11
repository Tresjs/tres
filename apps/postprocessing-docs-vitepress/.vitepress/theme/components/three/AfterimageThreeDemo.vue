<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Afterimage, EffectComposer } from '@tresjs/post-processing'
import { Color } from 'three'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

const { effectComposer } = useRouteDisposal()
</script>

<template>
  <TresCanvas
    clear-color="#121212"
    :alpha="false"
    :shadows="true"
  >
    <TresPerspectiveCamera
      :position="[3, 4, 4]"
    />
    <OrbitControls
      auto-rotate
      :auto-rotate-speed="2"
      :target="[0, 1, 0]"
    />
    <TresMesh :position="[0, 1, 0]">
      <TresTorusKnotGeometry :args="[0.8, 0.3, 128, 32]" />
      <TresMeshStandardMaterial
        color="cyan"
        :emissive="new Color('cyan')"
        :emissive-intensity="0.2"
      />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[3, 5, 3]"
      :intensity="1.5"
    />

    <Suspense>
      <EffectComposer ref="effectComposer">
        <Afterimage :damp="0.98" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
