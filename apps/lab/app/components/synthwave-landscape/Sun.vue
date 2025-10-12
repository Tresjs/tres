<script lang="ts" setup>
import { hexToRgbaString } from './palette'

export interface SunProps {
  colorA: string
  colorB: string
}

const props = defineProps<SunProps>()

const vertexShader = `
varying vec3 vPos;
void main() {
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
#define TWO_PI 6.28318530718

const vec4 color_main = ${hexToRgbaString(props.colorA)};
const vec4 color_accent = ${hexToRgbaString(props.colorB)};

varying vec3 vPos;
void main() {
  gl_FragColor = mix(color_main, color_accent, vPos.y * .7 - 0.1);
}
`
</script>

<template>
  <TresGroup>
    <slot />
    <TresMesh :render-order="0">
      <TresSphereGeometry :args="[1, 64, 64]" />
      <TresShaderMaterial :vertex-shader="vertexShader" :fragment-shader="fragmentShader" />
    </TresMesh>
  </TresGroup>
</template>
