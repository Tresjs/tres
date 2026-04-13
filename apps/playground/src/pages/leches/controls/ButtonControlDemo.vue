<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { OrbitControls, Sphere } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'leches-controls-button'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
useControls({
  reset: {
    type: 'button',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('Reset')
    },
    icon: 'i-carbon-reset',
    size: 'sm',
  },
  accept: {
    label: 'Accept',
    type: 'button',
    variant: 'secondary',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('accept')
    },
    icon: 'i-carbon-checkmark',
    size: 'block',
  },
}, { uuid })

/* const { position: lightPosition } = useControls('light', {
  position: new Vector3(3, 3, 3),
}) */
</script>

<template>
  <TresLeches :uuid="uuid" />
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
