<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { Levioso, useGLTF, OrbitControls } from "@tresjs/cientos";
import { TresLeches, useControls } from "@tresjs/leches";
import { shallowRef, watch } from "vue";

const { state } = useGLTF("/feather.glb");

const featherRef = shallowRef();

const { speed, rotationFactor, floatFactor } = useControls({
  speed: { value: 4, min: 0, max: 10, step: 0.1 },
  rotationFactor: { value: 1, min: 0, max: 5, step: 0.1 },
  floatFactor: { value: 1, min: 0, max: 5, step: 0.1 },
});

watch((featherRef), (_feather) => {
  if (_feather) {
    _feather.rotation.y = -Math.PI / 4;
    _feather.updateMatrixWorld();
  }
});
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas :clear-color="0x82dbc5">
      <TresPerspectiveCamera :position="[0, 0, 5]" :look-at="[0, 0, 0]" />
      <OrbitControls />
      <Levioso :speed="speed" :rotation-factor="rotationFactor" :float-factor="floatFactor">
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
  </div>
  <TresLeches :float="false" />
</template>
