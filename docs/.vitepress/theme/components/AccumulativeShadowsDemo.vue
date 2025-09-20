<script setup lang="ts">
import { AccumulativeShadows, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b" :shadows="true">
    <OrbitControls />
    <TresMesh :position-y="0.3" :scale="0.4" :cast-shadow="true">
      <TresTorusKnotGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <AccumulativeShadows
      :blend="100"
      color="#fbb03b"
      once
      :position-y="-0.4"
    />
  </TresCanvas>
</template>
