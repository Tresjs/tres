<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'

import { reactive } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
})

const { wireframe } = useControls({
  wireframe: false,
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[4, 4, 4]"
    />
    <TresMesh>
      <TresTorusKnotGeometry />
      <TresMeshNormalMaterial
        :wireframe="wireframe"
      />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <OrbitControls />
  </TresCanvas>
</template>
