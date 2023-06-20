<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import Stones from './Stones.vue'

const gl = {
  clearColor: '#18181B',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[-5.3, 8.3, 10.6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <EffectLayer />
    <Suspense>
      <Stones />
    </Suspense>
  </TresCanvas>
</template>
