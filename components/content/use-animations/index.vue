<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import UglyNakedBunny from './UglyNakedBunny.vue'

const gl = {
  clearColor: '#F78B3D',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[2, 3, 8]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresDirectionalLight
      color="#F78B3D"
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <Suspense>
      <UglyNakedBunny />
    </Suspense>
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>
