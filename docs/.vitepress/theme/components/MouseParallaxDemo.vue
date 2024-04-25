<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MouseParallax, TorusKnot } from '@tresjs/cientos'
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
      :ease="3"
    />
  </TresCanvas>
</template>
