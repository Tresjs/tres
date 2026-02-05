<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace, Vector3 } from 'three'

import { OrbitControls, Sphere } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'leches-advanced-folders'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { cameraPosition } = useControls('🎥 camera', {
  position: new Vector3(7, 7, 7),
}, { uuid })

const { lightPosition } = useControls('💡 light', {
  position: new Vector3(3, 3, 3),
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[cameraPosition.x, cameraPosition.y, cameraPosition.z]" />
    <OrbitControls />
    <TresGridHelper />
    <Sphere :position="[0, 2, 0]">
      <TresMeshToonMaterial />
    </Sphere>
    <TresDirectionalLight
      :args="[0xFFFFFF, 1]"
      :position-x="lightPosition.x"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
