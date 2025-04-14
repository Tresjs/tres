<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :fov="45"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
