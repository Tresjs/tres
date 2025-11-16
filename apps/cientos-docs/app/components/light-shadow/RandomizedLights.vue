<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import {
  RandomizedLights,
  AccumulativeShadows,
  OrbitControls,
  Plane,
} from "@tresjs/cientos";
</script>

<template>
  <TresCanvas shadows>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <OrbitControls />
    <AccumulativeShadows :blend="100" color="#fbb03b" once :position-y="-1">
      <RandomizedLights
        :ambient="0.25"
        :bias="0.001"
        :count="8"
        :intensity="Math.PI"
        :map-size="1024"
        :position="[5, 5, -10]"
        :radius="2"
      />
    </AccumulativeShadows>
    <TresMesh cast-shadow>
      <TresBoxGeometry />
      <TresMeshToonMaterial color="orange" />
    </TresMesh>
    <Plane :position="[0, -2, 0]" receive-shadow :args="[10, 10]">
      <TresMeshStandardMaterial />
    </Plane>
    <TresAmbientLight />
  </TresCanvas>
</template>
