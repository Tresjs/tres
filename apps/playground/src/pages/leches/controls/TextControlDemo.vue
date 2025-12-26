<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Text3D } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'leches-controls-text'

const { text } = useControls({
  text: {
    value: 'TresJS',
    label: 'Text',
  },
}, { uuid })

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[4, 4, 4]" />
    <Suspense>
      <Text3D
        :text="text"
        :size="0.5"
        :font="fontPath"
        :height="0.2"
        bevel-enabled
        center
      >
        <TresMeshStandardMaterial :metalness="0.8" :roughness="0.2" />
      </Text3D>
    </Suspense>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
