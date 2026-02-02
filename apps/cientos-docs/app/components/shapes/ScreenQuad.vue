<script setup lang="ts">
import { ScreenQuad } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresOrthographicCamera />
    <ScreenQuad>
      <TresMeshToonMaterial color="orange" />
    </ScreenQuad>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
