<script setup lang="ts">
import { Mesh, BoxGeometry, MeshStandardMaterial, AmbientLight, DirectionalLight, PerspectiveCamera, GridHelper } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const catalogue = { 
    Mesh, 
    BoxGeometry, 
    MeshStandardMaterial,
    AmbientLight,
    DirectionalLight,
    PerspectiveCamera,
    GridHelper,
}
</script>

<template>
  <TresCanvas :extends="catalogue">
    <TresPerspectiveCamera
        :position="[5, 5, 5]"
        :look-at="[0, 0, 0]"
    />
    <TresGridHelper />
    <OrbitControls   />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" />
  </TresCanvas>
</template>