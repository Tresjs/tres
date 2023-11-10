<script setup lang="ts">
import { extend } from '@tresjs/core';

import { reactive } from 'vue';
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls />
    <TresGroup 
      @pointer-move="console.log('Group pointer-move')"
      @pointer-enter="console.log('Group pointer-enter')"
      @pointer-leave="console.log('Group pointer-leave')"
      @click="console.log('Group click')"
    >
      <TresMesh 
        @pointer-move="console.log('child pointer-move')"
        @pointer-enter="console.log('child pointer-enter')"
        @pointer-leave="console.log('child pointer-leave')"
        @click="console.log('child click')"
        :position="[-2, 2, 0]"
        :rotation="[0, Math.PI, 0]"
      >
        <TresConeGeometry :args="[1, 1.5, 3]" />
        <TresMeshToonMaterial color="#82DBC5" />
      </TresMesh>
      <TresMesh :position="[0, 0, 0]" cast-shadow>
        <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
        <TresMeshToonMaterial color="#4F4F4F" />
      </TresMesh>
      <TresMesh :position="[2, -2, 0]">
        <TresSphereGeometry />
        <TresMeshToonMaterial color="#FBB03B" />
      </TresMesh>
    </TresGroup>
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
  </TresCanvas>
</template>
