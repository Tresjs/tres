<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import {
  OrbitControls,
  MeshWobbleMaterial,
  Reflector,
  Stars,
} from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, PlaneGeometry } from 'three'

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
