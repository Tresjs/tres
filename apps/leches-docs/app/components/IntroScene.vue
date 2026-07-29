<script setup lang="ts">
import { NoToneMapping } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    :tone-mapping="NoToneMapping"
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh
      :position="[-2, 6, 0]"
      :rotation="[0, Math.PI, 0]"
      cast-shadow
    >
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh
      :position="[0, 4, 0]"
      cast-shadow
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh
      :position="[2, 2, 0]"
      cast-shadow
    >
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresDirectionalLight
      :position="[0, 8, 4]"
      :intensity="0.7"
      cast-shadow
    />
    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial color="#D3FC8A" />
    </TresMesh>
    <TresAmbientLight :intensity="0.75" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
      cast-shadow
    />
  </TresCanvas>
</template>
