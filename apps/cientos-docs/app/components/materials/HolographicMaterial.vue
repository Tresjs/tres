<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { HolographicMaterial, Sphere, OrbitControls } from '@tresjs/cientos'

</script>
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Sphere :scale="0.5">
      <HolographicMaterial />
    </Sphere>
    <TresAmbientLight />
  </TresCanvas>
</template>
