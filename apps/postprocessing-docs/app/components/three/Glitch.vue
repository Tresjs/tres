<script setup lang="ts">
import { Text3D } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Glitch } from '@tresjs/post-processing'
import { Color } from 'three'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
}

const emissiveColor = new Color('hotpink')
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 1, 5]"
      :look-at="[0, 1, 0]"
    />
    <Suspense>
      <Text3D
        :position="[0, 1, 0]"
        text="Three glitch"
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
      >
        <TresMeshStandardMaterial
          color="hotpink"
          :emissive="emissiveColor"
          :emissive-intensity="1.2"
        />
      </Text3D>
    </Suspense>
    <TresGridHelper />

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <Suspense>
      <EffectComposer>
        <Glitch />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
