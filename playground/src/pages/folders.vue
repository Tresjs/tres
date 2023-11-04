<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3, Vector2 } from 'three'

import { OrbitControls, Sphere } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/style.css'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { position } = useControls('camera', {
  position: new Vector3(3, 2, 3),
  /*  delay: new Vector2(1.5, 3.5), */
})

/* const { position: lightPosition } = useControls('light', {
  position: new Vector3(3, 3, 3),
}) */
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position-x="position.x" />
    <OrbitControls />
    <TresGridHelper />
    <Sphere>
      <TresMeshToonMaterial />
    </Sphere>
    <!-- <TresDirectionalLight
      :args="[0xffffff, 1]"
      :position-x="lightPosition.x"
    /> -->
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>