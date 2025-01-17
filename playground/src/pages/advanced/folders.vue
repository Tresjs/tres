<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace, Vector3 } from 'three'

import { OrbitControls, Sphere } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('camera', {
  accept: {
    label: 'Accept',
    type: 'button',
    variant: 'secondary',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('accept')
    },
    icon: 'i-carbon-checkmark',
    size: 'sm',
  },
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
    <TresPerspectiveCamera />
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
