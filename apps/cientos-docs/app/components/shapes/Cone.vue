<script setup lang="ts">
import { Cone, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls />
      <Cone>
        <TresMeshToonMaterial color="orange" />
      </Cone>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
      <TresGridHelper :position-y="-0.5" />
    </TresCanvas>
</template>
