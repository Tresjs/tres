<script setup lang="ts">
import { GLTFModel, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, VignettePmndrs } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />

    <Suspense>
      <GLTFModel
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb"
        draco
      />
    </Suspense>

    <TresAmbientLight :intensity="1" />

    <EffectComposerPmndrs>
      <VignettePmndrs :darkness="0.9" :offset="0.3" />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
