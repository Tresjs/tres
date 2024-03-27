<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { 
  BasicShadowMap,
  SRGBColorSpace,
  NoToneMapping,
  Mesh,
  TorusGeometry,
  MeshToonMaterial,
  TorusKnotGeometry,
  PlaneGeometry,
  Group,
  SphereGeometry, 
} from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
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
  <TresCanvas
    v-bind="gl"
    ref="canvas"
    window-size
    class="awiwi"
    :style="{ background: '#008080' }"
  >
    <TresPerspectiveCamera
      :position="[7, 7, 7]"
    />
    <OrbitControls />

     <Suspense>
      <DynamicModel />
    </Suspense>
    <TresAxesHelper :args="[1]" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
      cast-shadow
    />
  </TresCanvas>
</template>
