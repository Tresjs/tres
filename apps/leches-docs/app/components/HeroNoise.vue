<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import type { TresContext } from '@tresjs/core'
import { watchEffect } from 'vue'

const props = defineProps<{
  speed: number
  scale: number
  warp: number
  contrast: number
  brightness: number
  grain: number
  invert: boolean
}>()

const uniforms = {
  uTime: { value: 0 },
  uAspect: { value: 1 },
  uScale: { value: 3 },
  uWarp: { value: 4 },
  uContrast: { value: 1 },
  uBrightness: { value: 0 },
  uGrain: { value: 0 },
  uInvert: { value: false },
}

watchEffect(() => {
  uniforms.uScale.value = props.scale
  uniforms.uWarp.value = props.warp
  uniforms.uContrast.value = props.contrast
  uniforms.uBrightness.value = props.brightness
  uniforms.uGrain.value = props.grain
  uniforms.uInvert.value = props.invert
})

// The plane is already in clip space, so the camera and its projection are ignored.
const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

// Domain-warped fbm (fbm of fbm of fbm), after Inigo Quilez.
const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uAspect;
uniform float uScale;
uniform float uWarp;
uniform float uContrast;
uniform float uBrightness;
uniform float uGrain;
uniform bool uInvert;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.0 + 0.13;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * uScale;
  float t = uTime;

  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.1)), fbm(p + vec2(5.2, 1.3) - t * 0.08));
  vec2 r = vec2(fbm(p + uWarp * q + vec2(1.7, 9.2) + t * 0.05), fbm(p + uWarp * q + vec2(8.3, 2.8)));
  float v = fbm(p + uWarp * r);

  v = (v - 0.5) * uContrast + 0.5 + uBrightness;
  if (uInvert) v = 1.0 - v;
  v += (hash(gl_FragCoord.xy + fract(t)) - 0.5) * uGrain;

  gl_FragColor = vec4(vec3(clamp(v, 0.0, 1.0)), 1.0);
}
`

// Time advances by delta * speed, not elapsed * speed, so a speed change does not jump the pattern.
function onLoop({ delta, sizes }: { delta: number, sizes: TresContext['sizes'] }) {
  uniforms.uTime.value += delta * props.speed
  uniforms.uAspect.value = sizes.aspectRatio.value || 1
}
</script>

<template>
  <TresCanvas :dpr="1" clear-color="#000" @loop="onLoop">
    <TresMesh>
      <TresPlaneGeometry :args="[2, 2]" />
      <TresShaderMaterial
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
        :depth-write="false"
        :depth-test="false"
      />
    </TresMesh>
  </TresCanvas>
</template>
