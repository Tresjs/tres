<script setup lang="ts">
import { OrbitControls, TransformControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";

import { TresLeches, useControls } from "@tresjs/leches";
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from "three";
import { ref, shallowReactive } from "vue";

const gl = {
  clearColor: "#201919",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

const boxRef = ref();
const transformState = shallowReactive({
  showX: true,
  showY: true,
  showZ: true,
});

const { mode, space, size, showX, showY, showZ } = useControls({
  mode: {
    value: "translate",
    options: [
      {
        text: "Translate",
        value: "translate",
      },
      {
        text: "Rotate",
        value: "rotate",
      },
      {
        text: "Scale",
        value: "scale",
      },
    ],
  },
  space: {
    value: "local",
    options: [
      {
        text: "Local",
        value: "local",
      },
      {
        text: "World",
        value: "world",
      },
    ],
  },
  size: { value: 1, min: 0.1, max: 5, step: 0.1 },
  showX: true,
  showY: true,
  showZ: true,
});
</script>

<template>
  <div class="aspect-video">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[11, 11, 11]"
        :fov="45"
        :near="0.1"
        :far="1000"
        :look-at="[-8, 3, -3]"
      />
      <OrbitControls make-default />
      <TransformControls
        :object="boxRef"
        :mode="mode"
        :space="space"
        :size="size"
        :show-x="showX"
        :show-y="showY"
        :show-z="showZ"
      />
      <TresMesh ref="boxRef" :position="[0, 4, 0]" cast-shadow>
        <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
        <TresMeshToonMaterial color="#FBB03B" />
      </TresMesh>
      <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
        <TresPlaneGeometry :args="[10, 10, 10, 10]" />
        <TresMeshToonMaterial />
      </TresMesh>
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight :position="[0, 8, 4]" :intensity="1.5" cast-shadow />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
