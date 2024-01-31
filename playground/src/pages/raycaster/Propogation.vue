<script setup lang="ts">
import { TransitionPresets, useTransition, useIntervalFn } from "@vueuse/core";
import {
  TresCanvas,
  useRenderLoop,
  useTresContext,
  useEventStore,
} from "@tresjs/core";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from "three";
import { OrbitControls } from "@tresjs/cientos";
import Box from "../../components/Box.vue";
import '@tresjs/leches/styles'
// Import necessary three.js classes
import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";

// Create a box geometry and a basic material
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });

// Create a mesh with the geometry and material
const meshWithMaterial = new Mesh(geometry, material);

const gl = {
  clearColor: "#202020",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

</script>

<template>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresDirectionalLight :intensity="1" :position="[1, 1, 1]" />
    <TresAmbientLight :intensity="1" />
    <primitive :object="meshWithMaterial" :position="[3, 1.5, 2]" @click="event => event.object.material.color.set('red')" />
    <Box :position="[-5, 1.5, 2]" name="Moving"></Box>
    <Box :position="[0, 1.5, 0]" name="A0">
      <Box :position="[-0.66, -1, 0]" name="B0" blocks-pointer-events>
        <Box :position="[-0.66, -1, 0]" name="C0">
          <Box :position="[-0.66, -1, 0]" name="D0" />
          <Box :position="[0.66, -1, 0]" name="D1" />
        </Box>
        <Box :position="[0.66, -1, 0]" name="C1">
          <Box :position="[0.66, -1, 0]" name="D2" />
        </Box>
      </Box>
      <Box :position="[0.66, -1, 0]" name="B1">
        <Box :position="[0.66, -1, 0]" name="C2">
          <Box :position="[0.66, -1, 0]" name="D3" />
        </Box>
      </Box>
    </Box>
    <Box :position="[0, 1.5, -3]" name="A0">
      <Box :position="[-0.66, -1, 0]" name="B0">
        <Box :position="[-0.66, -1, 0]" name="C0">
          <Box :position="[-0.66, -1, 0]" name="D0" />
          <Box :position="[0.66, -1, 0]" name="D1" />
        </Box>
        <Box :position="[0.66, -1, 0]" name="C1">
          <Box :position="[0.66, -1, 0]" name="D2" />
        </Box>
      </Box>
      <Box :position="[0.66, -1, 0]" name="B1">
        <Box :position="[0.66, -1, 0]" name="C2">
          <Box :position="[0.66, -1, 0]" name="D3" />
        </Box>
      </Box>
    </Box>
    <Box :position="[0, 1.5, -6]" name="A0">
      <Box :position="[-0.66, -1, 0]" name="B0">
        <Box :position="[-0.66, -1, 0]" name="C0">
          <Box :position="[-0.66, -1, 0]" name="D0" />
          <Box :position="[0.66, -1, 0]" name="D1" />
        </Box>
        <Box :position="[0.66, -1, 0]" name="C1">
          <Box :position="[0.66, -1, 0]" name="D2" />
        </Box>
      </Box>
      <Box :position="[0.66, -1, 0]" name="B1">
        <Box :position="[0.66, -1, 0]" name="C2">
          <Box :position="[0.66, -1, 0]" name="D3" />
        </Box>
      </Box>
    </Box>
  </TresCanvas>
</template>
