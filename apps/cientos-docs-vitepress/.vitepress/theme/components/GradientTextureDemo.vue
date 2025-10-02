<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { GradientTexture } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#e3e3e3">
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <TresMesh>
      <TresPlaneGeometry />
      <TresMeshBasicMaterial>
        <GradientTexture :stops="[0.1, 0.5, 0.9]" :colors="['#4f4f4f', '#82dbc5', '#fbb03b']" />
      </TresMeshBasicMaterial>
    </TresMesh>
  </TresCanvas>
</template>
