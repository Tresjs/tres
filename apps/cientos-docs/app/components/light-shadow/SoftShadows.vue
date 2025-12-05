<script setup lang="ts">
import { SoftShadows, Levioso, TorusKnot, Plane } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import { TresLeches, useControls } from "@tresjs/leches";

const { size, samples, focus } = useControls({
  size: { value: 25, min: 5, max: 100, step: 5 },
  samples: { value: 10, min: 1, max: 32, step: 1 },
  focus: { value: 0, min: 0, max: 1, step: 0.1 },
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas shadows clear-color="#82DBC5">
      <Levioso :speed="4" :range="[0, 0.7]" :rotation-factor="9">
        <TorusKnot cast-shadow :scale="0.45">
          <TresMeshStandardMaterial color="orange" />
        </TorusKnot>
      </Levioso>
      <Plane :position="[0, -2, 0]" receive-shadow :args="[10, 10]">
        <TresMeshStandardMaterial />
      </Plane>
      <TresDirectionalLight cast-shadow :position="[0, 3, 0]" />
      <TresAmbientLight :intensity="0.5" />
      <SoftShadows :size="size" :samples="samples" :focus="focus" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
