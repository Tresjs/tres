<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Helper, OrbitControls } from '@tresjs/cientos'
import { BoxHelper } from 'three'
</script>

<template>
  <TresCanvas clear-color="#222">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
      <Helper :type="BoxHelper" :args="[0xff0000]" />
    </TresMesh>
    <TresAmbientLight />
  </TresCanvas>
</template>
