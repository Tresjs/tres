<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const torusRef = shallowRef(null)
const capsuleRef = shallowRef(null)

</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresGridHelper :args="[10, 10]" />

    <FboCube />

    <TresMesh
      ref="torusRef"
      :position="[3, 0, 0]"
    >
      <TresTorusGeometry :args="[1, 0.5, 16, 100]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh
      ref="capsuleRef"
      :position="[-2, 0, 0]"
    >
      <TresCapsuleGeometry :args="[0.4, 1, 4, 8]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
