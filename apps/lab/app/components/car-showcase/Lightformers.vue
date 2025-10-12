<script setup lang="ts">
import { BackSide, Color, Vector3 } from 'three'

const group = ref<TresObject>()
const positions = [2, 0, 2, 0, 2, 0, 2, 0]

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (group.value) {
    group.value.position.z += delta * 10
    if (group.value.position.z > 20) {
      group.value.position.z = -60
    }
  }
})

// Updated shader to better match Lamina's layer-based approach
const vertexShader = `
varying vec3 v_WorldPosition;

void main() {
  v_WorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec3 v_WorldPosition;

uniform vec3 baseColor;
uniform vec3 depthColorA;
uniform vec3 depthColorB;
uniform vec3 origin;
uniform float near;
uniform float far;
uniform float depthAlpha;

void main() {
  // First layer: base color
  vec4 baseLayer = vec4(baseColor, 1.0);
  
  // Second layer: depth
  float depth = length(v_WorldPosition - origin);
  float depthFactor = smoothstep(near, far, depth);
  vec4 depthLayer = vec4(mix(depthColorA, depthColorB, depthFactor), depthAlpha);
  
  // Normal blend mode (similar to Lamina's layer system)
  vec4 finalColor = mix(baseLayer, depthLayer, depthLayer.a);
  
  gl_FragColor = finalColor;
}
`

// Updated uniforms to match Lamina's naming and functionality
const uniforms = {
  baseColor: { value: new Color('#444') },
  depthColorA: { value: new Color('blue') },
  depthColorB: { value: new Color('black') },
  origin: { value: new Vector3(100, 100, 100) },
  near: { value: 0 },
  far: { value: 300 },
  depthAlpha: { value: 0.5 }
}

</script>
<template>
  <Lightformer 
    :intensity="0.75" 
    :position="[0, 5, -9]"
    :rotation-x="Math.PI / 2"
    :scale="[10, 10, 1]"
  />
  <Lightformer 
    :intensity="4" 
    :rotation-y="Math.PI / 2" 
    :position="[-5, 1, -1]" 
    :scale="[20, 0.1, 1]" 
  />
  <Lightformer 
    :rotation-y="Math.PI / 2" 
    :position="[-5, -1, -1]" 
    :scale="[20, 0.5, 1]" 
  />
  <Lightformer 
    :rotation-y="-Math.PI / 2" 
    :position="[10, 1, 0]" 
    :scale="[20, 1, 1]" 
  />
  <TresGroup :rotation="[0, 0.5, 0]">
    <TresGroup ref="group">
      <Lightformer 
        v-for="(x, i) in positions"
        :key="i"
        form="circle"
        :intensity="2"
        :rotation="[Math.PI/ 2, 0, 0]" 
        :position="[x, 4, i * 4]" 
        :scale="[3, 1, 1]" 
      />
    </TresGroup>
  </TresGroup>
  <Levioso 
    :speed="5" 
    :float-factor="2" 
    :rotation-factor="2"
  >
    <Lightformer 
      form="ring"
      color="red"
      :intensity="1"
      :scale="10"
      :position="[-15, 4, -18]" 
      :target="[0, 0, 0]"
    />
  </Levioso>
<!--   <TresGroup :rotation="[0, 0.5, 0]">
    <TresGroup ref="group">
      <Lightformer 
        v-for="(x, i) in positions"
        :key="i"
        form="circle"
        :intensity="2"
        :rotation="[Math.PI/ 2, 0, 0]" 
        :position="[x, 4, i * 4]" 
        :scale="[3, 1, 1]" 
      />
    </TresGroup>
  </TresGroup>
  <Lightformer 
    :intensity="4" 
    :rotation-y="Math.PI / 2" 
    :position="[-5, 1, -1]" 
    :scale="[20, 0.1, 1]" 
  />
  <Lightformer 
    :rotation-y="Math.PI / 2" 
    :position="[-5, -1, -1]" 
    :scale="[20, 0.5, 1]" 
  />
  <Lightformer 
    :rotation-y="-Math.PI / 2" 
    :position="[10, 1, 0]" 
    :scale="[20, 1, 1]" 
  />
  <Levioso 
    :speed="5" 
    :float-factor="2" 
    :rotation-factor="2"
  >
    <Lightformer 
      form="ring"
      color="red"
      :intensity="1"
      scale="10"
      :position="[-15, 4, -18]" 
      :target="[0, 0, 0]"
    />
  </Levioso>
  <TresMesh :scale="[60, 60, 60]">
    <TresSphereGeometry :args="[1, 64, 64]" />
    <TresShaderMaterial
      :side="BackSide"
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="uniforms"
    />
  </TresMesh> -->
   <TresMesh :scale="[60, 60, 60]">
      <TresSphereGeometry :args="[1, 64, 64]" />
      <TresShaderMaterial
        :side="BackSide"
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh> 
</template>
