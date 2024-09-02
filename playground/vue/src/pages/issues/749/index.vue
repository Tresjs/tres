<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import TheExperience from './TheExperience.vue'
</script>

<template>
  <TresCanvas clear-color="gray">
    <TresPerspectiveCamera />
    <TresPointLight :position="[2, 2, 0]" :intensity="10" />
    <TheExperience />
  </TresCanvas>
  <OverlayInfo>
    <h1>Issue #749: attach-detach</h1>
    <h2>Setup</h2>
    <p>
      In this scene, there is a Mesh.
      <ul>
        <li>It should switch between a box and a sphere.</li>
        <li>It should switch between red and "MeshNormalMaterial".</li>
      </ul>
    </p>
  </OverlayInfo>
</template>
