<script setup lang="ts">
import { MouseParallax, TorusKnot } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera
      :position="[0, 0, 7.5]"
      :fov="75"
    />
    <TorusKnot>
      <TresMeshNormalMaterial />
    </TorusKnot>
    <MouseParallax
      :factor="5"
      :ease="[3, 0.1]"
    />
  </TresCanvas>
</template>
