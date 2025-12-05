<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { Stage, OrbitControls, Plane } from "@tresjs/cientos";
</script>

<template>
  <div class="aspect-video">
    <TresCanvas shadows clear-color="#222">
      <TresPerspectiveCamera :position="[0, 3, 5]" />
      <OrbitControls make-default />
      <Stage
        lighting="rembrandt"
        shadows="contact"
        :adjust-camera="true"
        environment="city"
        :intensity="0.5"
      >
        <TresMesh cast-shadow>
          <TresBoxGeometry />
          <TresMeshStandardMaterial color="orange" />
        </TresMesh>
        <Plane :position="[0, -2, 0]" receive-shadow :args="[5, 5]">
          <TresMeshStandardMaterial />
        </Plane>
      </Stage>
    </TresCanvas>
  </div>
</template>
