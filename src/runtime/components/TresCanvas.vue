<script setup lang="ts">
import { ref } from "vue";
import { TresCanvas as TC } from "@tresjs/core";
import type { TresCamera } from "@tresjs/core";
import { ColorSpace, ShadowMapType, ToneMapping } from "three";

import { ACESFilmicToneMapping, PCFSoftShadowMap, SRGBColorSpace } from "three";

const rendererPresets = {
  realistic: {
    outputColorSpace: SRGBColorSpace,
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 3,
    shadowMap: {
      enabled: true,
      type: PCFSoftShadowMap,
    },
  },
};

type RendererPresetsType = keyof typeof rendererPresets;

interface TresCanvasProps {
  shadows?: boolean;
  shadowMapType?: ShadowMapType;
  physicallyCorrectLights?: boolean;
  useLegacyLights?: boolean;
  outputColorSpace?: ColorSpace;
  toneMapping?: ToneMapping;
  toneMappingExposure?: number;
  context?: WebGLRenderingContext;
  powerPreference?: "high-performance" | "low-power" | "default";
  preserveDrawingBuffer?: boolean;
  clearColor?: string;
  windowSize?: boolean;
  preset?: RendererPresetsType;
  disableRender?: boolean;
  camera?: TresCamera;
}
defineProps<TresCanvasProps>();

const stateRef = ref();

defineExpose({
  state: stateRef,
});
</script>

<template>
  <ClientOnly>
    <TC ref="stateRef" v-bind="$props">
      <slot />
    </TC>
  </ClientOnly>
</template>
