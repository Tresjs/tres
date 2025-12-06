<script setup lang="ts">
import { MouseParallax, TorusKnot } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { disabled, factor, ease } = useControls({
  disabled: false,
  factor: { value: 5, min: 0, max: 20, step: 0.5 },
  ease: { value: 0.1, min: 0, max: 1, step: 0.05 },
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[0, 0, 7.5]" :fov="75" />
      <TorusKnot>
        <TresMeshToonMaterial color="orange" />
      </TorusKnot>
      <MouseParallax :factor="factor" :ease="ease" :disabled="disabled" />
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
