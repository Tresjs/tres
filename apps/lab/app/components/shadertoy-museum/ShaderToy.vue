<script setup lang="ts">
import fragmentShader from './shaders/fragment.glsl'
import type { ShaderToyMuseumState } from './const';
import { Uniform, Vector2, MeshNormalMaterial, ShaderMaterial, DoubleSide } from 'three';

const state: ShaderToyMuseumState = inject('state')!

const shaderToyTarget = computed(() => state.shaderToyTargets[state.i])

const material = shallowRef<ShaderMaterial>()


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

const uniforms = {
  iResolution: new Uniform(new Vector2(256, 256)),
  iTime: new Uniform(0),
}

watch(shaderToyTarget, (target) => {
  if (target) {
    console.log('target', target)
    vertexShader.value = getVertexShader(target.shader)

    if (material.value) material.value.dispose()
    material.value = new ShaderMaterial({ vertexShader: getVertexShader(target.shader), fragmentShader, uniforms, side: DoubleSide })
  }
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  uniforms.iTime.value = elapsed
})
</script>
<template>
  <TresMesh v-if="shaderToyTarget" :material="material"
    :position="[shaderToyTarget.target.position.x, shaderToyTarget.target.position.y, shaderToyTarget.target.position.z]"
    :scale="[shaderToyTarget.target.scale.x, shaderToyTarget.target.scale.y, shaderToyTarget.target.scale.z]"
    :rotation="[shaderToyTarget.target.rotation.x, shaderToyTarget.target.rotation.y, shaderToyTarget.target.rotation.z]">
    <TresPlaneGeometry :copy="shaderToyTarget.target.geometry" />
  </TresMesh>
</template>