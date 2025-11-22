<script setup lang="ts">
import { Align, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#222">
    <TresPerspectiveCamera />
    <OrbitControls />

    <TresAxesHelper :scale="2" />

    <Align top right back>
      <TresMesh>
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </Align>
  </TresCanvas>
</template>
