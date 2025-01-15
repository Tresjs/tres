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
useControls({
  text: {
    type: 'text',
    value: 'Hello World',
    label: 'Text',
    placeholder: 'Type something',
    icon: 'i-carbon-checkmark',
  },
  camera: {
    value: new Vector3(0, 2, 4),
    icon: 'i-carbon-camera',
  },
  select: {
    value: 'option1',
    options: ['option1', 'option2', 'option3'],
    icon: 'i-carbon-checkmark',
  },
  number: {
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
    icon: 'i-carbon-checkmark',
  },
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
