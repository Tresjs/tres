<script setup lang="ts">
import { TresCanvas, TresPortal } from '@tresjs/core'
import { Scene } from 'three'
import LocalOrbitControls from '../orbit-controls/LocalOrbitControls.vue'

// A separate scene NOT in the main graph; TresPortal reparents children into it.
const portalScene = new Scene()
</script>

<template>
  <SceneWrapper>
    <TresCanvas clear-color="#0a0a14">
      <TresPerspectiveCamera :position="[0, 0, 6]" />
      <LocalOrbitControls />
      <!-- These children are reparented into portalScene, not the main scene -->
      <TresPortal :to="portalScene">
        <TresMesh>
          <TresTorusKnotGeometry :args="[0.6, 0.25, 128, 32]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresPortal>
      <!-- Re-add portalScene as a primitive so the reparented children are visible -->
      <primitive :object="portalScene" />
      <TresAmbientLight :intensity="0.8" />
    </TresCanvas>
  </SceneWrapper>
</template>
