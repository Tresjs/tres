<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Sky, OrbitControls, Ocean } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 1, 1]" />
    <Sky :azimuth="0" />
    <Suspense>
      <Ocean />
    </Suspense>
    <TresMesh :position-y="1">
      <TresBoxGeometry :args="[1, 1, 1]" />
    </TresMesh>
    <OrbitControls 
      :enable-pan="false"
      :enable-zoom="false"
      :max-polar-angle="Math.PI * 0.495"
      :min-distance="40.0"
      :max-distance="200.0"
    />
  </TresCanvas>
</template>
