<script setup lang="ts">
import { Tube, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import { CubicBezierCurve3, Vector3, DoubleSide } from "three";
import { ref } from "vue";

const tubePath = ref(
  new CubicBezierCurve3(
    new Vector3(-1, 0, 0),
    new Vector3(-0.5, -1, 0),
    new Vector3(0.5, 1, 0),
    new Vector3(1, 0, 0)
  )
);
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Tube :args="[tubePath, 20, 0.2, 8, false]">
      <TresMeshToonMaterial color="orange" :side="DoubleSide" />
    </Tube>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
