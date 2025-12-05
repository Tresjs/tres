<script setup lang="ts">
import { OrbitControls, RoundedBox } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 3]"
    />
    <OrbitControls />
    <RoundedBox
      :args="[1, 1, 1, 2, 0.1]"
    >
      <TresMeshBasicMaterial
        color="orange"
      />
    </RoundedBox>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper :position-y="-0.5" />
  </TresCanvas>
</template>
