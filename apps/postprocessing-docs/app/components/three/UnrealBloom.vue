<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, UnrealBloom } from '@tresjs/post-processing'
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
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        color="hotpink"
        :emissive="emissiveColor"
        :emissive-intensity="1.2"
      />
    </TresMesh>
    <TresGridHelper />

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <Suspense>
      <EffectComposer>
        <UnrealBloom :radius="0.5" :strength="0.9" :threshold="0.5" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
