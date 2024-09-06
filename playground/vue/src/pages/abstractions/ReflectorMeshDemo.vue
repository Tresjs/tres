<script setup lang="ts">
import {
  MeshWobbleMaterial,
  OrbitControls,
  Reflector,
  Stars,
} from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { shallowRef, watch } from 'vue'

const gl = {
  clearColor: '#111',
  shadows: false,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const reflectorRef = shallowRef()

watch(reflectorRef, (value) => {
  // eslint-disable-next-line no-console
  console.log(value)
})

const options = {
  color: '#f7f7f7',
  clipBias: 0,
  textureWidth: 1024,
  textureHeight: 1024,
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[3, 3, 6]"
      :look-at="[0, 0, 0]"
    />
    <Stars />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial
        color="orange"
        :speed="1"
        :factor="2"
      />
    </TresMesh>
    <Reflector
      ref="reflectorRef"
      :rotation="[-Math.PI * 0.5, 0, 0]"
      :position="[0, -2, 0]"
      :color="options.color"
      :clip-bias="options.clipBias"
      :texture-width="options.textureWidth"
      :texture-height="options.textureHeight"
    />
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
