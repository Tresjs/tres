<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Text3D } from '@tresjs/cientos'
import LocalOrbitControls from './LocalOrbitControls.vue'
</script>

<template>
  <SceneWrapper>
    <TresCanvas
      clear-color="#82DBC5"
    >
      <TresPerspectiveCamera :position="[0, 1, 7]" />
      <LocalOrbitControls />
      <TresGridHelper :args="[10, 10]" />
      <Suspense>
        <Text3D
          :position="[0, 1, 0]"
          text="Click and drag to orbit"
          font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
        >
          <TresMeshNormalMaterial />
        </Text3D>
      </Suspense>
    </TresCanvas>
  </SceneWrapper>
</template>
