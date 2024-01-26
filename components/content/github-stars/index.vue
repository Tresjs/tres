<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, ACESFilmicToneMapping, MeshStandardMaterial } from 'three'

import { OrbitControls, Text3D } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[8.48, 2.65, 17.94]"
      :far="1000"
    />
    <OrbitControls
      make-default
      :min-distance="15"
      :max-distance="30"
    />
    <Suspense>
      <Environment preset="sunset" />
    </Suspense>
    <Suspense>
      <Text3D
        font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
        center
        text="1k Github Stars"
        :size="1"
        :height="0.2"
        :curve-segments="12"
        :bevel-enabled="true"
        :bevel-thickness="0.05"
        :bevel-size="0.03"
        :bevel-offset="0"
        :bevel-segments="4"
      >
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
      </Text3D>
    </Suspense>
    <Suspense>
      <Star>
        <primitive :object="yellowMaterial" />
      </Star>
    </Suspense>
    <Suspense />
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[10, 10, 10]"
      :intensity="1"
    />
  </TresCanvas>
</template>