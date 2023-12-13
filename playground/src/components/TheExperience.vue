<script setup lang="ts">
import { extend } from "@tresjs/core";

import { reactive } from "vue";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";

const gl = {
  clearColor: "#82DBC5",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

// const noop = () => {}
const noop = console.log;
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls />
    <TresGroup
      @pointer-move="noop('Group pointer-move')"
      @pointer-enter="noop('Group pointer-enter')"
      @pointer-leave="noop('Group pointer-leave')"
      @click="noop('Group click')"
    >
      <TresMesh
        @pointer-move="noop('child pointer-move')"
        @pointer-enter="noop('child pointer-enter')"
        @pointer-leave="noop('child pointer-leave')"
        @click="noop('child click')"
        :position="[-2, 2, 0]"
        :rotation="[0, Math.PI, 0]"
      >
        <TresConeGeometry :args="[1, 1.5, 3]" />
        <TresMeshToonMaterial color="#82DBC5" />
      </TresMesh>
      <TresMesh :position="[0, 0, 0]" cast-shadow>
        <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
        <TresMeshToonMaterial color="#4F4F4F" />
        <TresMesh :position="[5, 2, -5]" cast-shadow>
          <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
          <TresMeshToonMaterial color="#d3d3d3" />
        </TresMesh>
      </TresMesh>
      <TresMesh :position="[2, -2, 0]">
        <TresSphereGeometry />
        <TresMeshToonMaterial color="#FBB03B" />
        <TresGroup
          :position="[4, -2, -10]"
          @pointer-move="noop('2nd Group pointer-move')"
          @pointer-enter="noop('2nd Group pointer-enter')"
          @pointer-leave="noop('2nd Group pointer-leave')"
          @click="noop('2nd Group click')"
        >
          <TresMesh
            @pointer-move="noop('2nd group child pointer-move')"
            @pointer-enter="noop('2nd group child pointer-enter')"
            @pointer-leave="noop('2nd group child pointer-leave')"
            @click="noop('2nd group child click')"
            :position="[-2, 2, 0]"
            :rotation="[0, Math.PI, 0]"
          >
            <TresConeGeometry :args="[1, 1.5, 3]" />
            <TresMeshToonMaterial color="#82DBC5" />
          </TresMesh>
          <TresMesh :position="[0, 0, 0]" cast-shadow>
            <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
            <TresMeshToonMaterial color="#4F4F4F" />
            <TresMesh :position="[5, 2, -5]" cast-shadow>
              <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
              <TresMeshToonMaterial color="#d3d3d3" />
            </TresMesh>
          </TresMesh>
          <TresMesh :position="[2, -2, 0]">
            <TresSphereGeometry />
            <TresMeshToonMaterial color="#FBB03B" />
          </TresMesh>
        </TresGroup>
      </TresMesh>
    </TresGroup>
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
  </TresCanvas>
</template>
