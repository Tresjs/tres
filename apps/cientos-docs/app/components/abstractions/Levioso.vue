<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { Levioso, useGLTF, OrbitControls } from "@tresjs/cientos";
import { shallowRef, watch } from "vue";

const { state } = useGLTF("/feather.glb");

const featherRef = shallowRef();

watch((featherRef), (_feather) => {
  if (_feather) {
    _feather.rotation.y = -Math.PI / 4;
    _feather.updateMatrixWorld();
  }
});
</script>

<template>
  <TresCanvas :clear-color="0x82dbc5">
    <TresPerspectiveCamera :position="[0, 0, 5]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Levioso :speed="4">
      <primitive
        v-if="state?.scene"
        ref="featherRef"
        :object="state?.scene"
        :position-y="-Math.PI / 4"
      />
    </Levioso>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <TresGridHelper :position="[0, -1, 0]" />
  </TresCanvas>
</template>
