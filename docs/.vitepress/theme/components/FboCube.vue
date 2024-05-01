<script setup lang="ts">
import { useFBO } from '@tresjs/cientos'

const fboTarget = useFBO({
  depth: true,
  width: 512,
  height: 512,
  settings: {
    samples: 1,
  },
})
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />

    <TresMeshBasicMaterial
      :color="0xFFFFFF"
      :map="fboTarget?.texture ?? null"
    />
  </TresMesh>
</template>
