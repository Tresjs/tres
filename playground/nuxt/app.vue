<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from "three";

const gl = {
  clearColor: "#c0ffee",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};


</script>
<template>
  <div style="height: 100vh">
    <TresCanvas v-bind="gl">
      <TheExperience />
    </TresCanvas>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
