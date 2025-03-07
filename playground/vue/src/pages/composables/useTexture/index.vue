<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { OrbitControls } from '@tresjs/cientos'
import ObjectAsyncSimpleTexture from './ObjectAsyncSimpleTexture.vue'
import ObjectSyncMultipleTexture from './ObjectSyncMultipleTexture.vue'
import ObjectSyncSimpleTexture from './ObjectSyncSimpleTexture.vue'
import ObjectAsyncMultipleTexture from './ObjectAsyncMultipleTexture.vue'
import ObjectUseTextureComponent from './ObjectUseTextureComponent.vue'
import ObjectSyncLoadSimpleTexture from './ObjectSyncLoadSimpleTexture.vue'
import ObjectSyncLoadMultipleTexture from './ObjectSyncLoadMultipleTexture.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[8, 8, 8]" />
    <OrbitControls />
    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
    <ObjectSyncSimpleTexture />
    <ObjectSyncMultipleTexture />
    <Suspense>
      <ObjectAsyncSimpleTexture />
    </Suspense>
    <Suspense>
      <ObjectAsyncMultipleTexture />
    </Suspense>
    <ObjectUseTextureComponent />
    <ObjectSyncLoadSimpleTexture />
    <ObjectSyncLoadMultipleTexture />
  </TresCanvas>
</template>
