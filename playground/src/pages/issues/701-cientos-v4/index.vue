<!-- eslint-disable no-console -->
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import TheExperience from './TheExperience.vue'
</script>

<template>
  <TresCanvas window-size clear-color="gray">
    <TheExperience />
  </TresCanvas>

  <OverlayInfo>
    <h1>&lt;primitive&gt; in Cientos v4</h1>
    <h2>Setup</h2>
    <p>This scene contains a TorusKnot and Cientos' Sparkles component.</p>
    <h2>Context</h2>
    <p>Sparkles uses a primitive under the hood. Changes to Tres v4's primitives caused the component to stop working.</p>
  </OverlayInfo>
</template>

<style scoped>
.overlay {
  position: fixed;
  max-width: 400px;
  top: 0px;
  left: 0px;
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  font-family: sans-serif;
  font-size: 14px;
  color: #444;
}
</style>
