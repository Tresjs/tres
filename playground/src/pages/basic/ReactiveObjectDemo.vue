<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'

import { reactive } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
  antialias: true,
})

const controls = useControls(gl)
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="controls">
    <TresPerspectiveCamera
      :position="[4, 4, 4]"
    />
    <TresMesh :position="[0, 3, 0]" cast-shadow>
      <TresTorusKnotGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
      cast-shadow
    />
    <TresMesh
      :rotate-x="-Math.PI / 2"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshStandardMaterial color="white" />
    </TresMesh>
    <OrbitControls />
  </TresCanvas>
</template>
