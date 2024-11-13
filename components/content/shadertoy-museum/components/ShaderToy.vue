<script setup lang="ts">
import { DoubleSide, Material, MeshNormalMaterial, ShaderMaterial, Vector2 } from 'three';
import type { State } from '../index.vue';

const state = inject('state') as State

const fragmentShader = `
precision mediump float;
varying vec4 vFragColor;

void main() {
  gl_FragColor = vec4(vec3(vFragColor), 1.0);
}
`

const vertexShader = shallowRef(`
uniform vec2 iResolution;
uniform float iTime;
varying vec4 vFragColor;

void main() {
  gl_Position = vec4(1., 1., 0., 1.);
  vFragColor = vec4(1., 1., 0., 1.);
}
`)

function getVertexShader(s: string) {
  return `
uniform vec2 iResolution;
uniform float iTime;

varying vec4 vFragColor;

${s}

void main() {
  mainImage(vFragColor, (position.xy + vec2(0.5, 0.5)) * iResolution);
  vec3 offset = vec3(normal) * clamp(vFragColor.a, 0., 1.);
  vec4 modelPosition = modelMatrix * vec4(position + offset, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;
}
  `
}

const material = shallowRef(new MeshNormalMaterial() as Material)

const uniforms = {
  iResolution: { value: new Vector2(256, 256) },
  iTime: { value: 0 },
}

useLoop().onBeforeRender(
  () => {
    uniforms.iTime.value = state.clock.getElapsedTime()
  })

watch(() => state.i, () => {
  const targetInfo = state.shaderToyTargets[state.i] ?? {}

  vertexShader.value = getVertexShader(targetInfo.shader)
  if (material.value) material.value.dispose()
  material.value = new ShaderMaterial({ vertexShader: getVertexShader(targetInfo.shader), fragmentShader, uniforms, side: DoubleSide })
})
</script>

<template>
  <TresMesh :position="state.target.position" :scale="state.target.scale" :rotation="state.target.rotation"
    :material="material">
    <TresPlaneGeometry :copy="state.target.geometry" />
  </TresMesh>
</template>