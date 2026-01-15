<script setup lang="ts">
import { IcosahedronGeometry, MeshStandardMaterial, Vector2 } from 'three'
import vertexShader from './shaders/vertex.glsl'

const uniforms = {
  uTime: { value: 0 },
  uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
}
const uuid = 'wobble-sphere-experiment' 
const {
  color,
  metalness,
  roughness,
  transmission,
  ior,
  wireframe,
  thickness,
} = useControls({
  color: '#ffffff',
  metalness: { 
    value: 0,
    min: 0,
    max: 1,
    step: 0.1,
    },
  roughness: { 
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
  },
  transmission: {
    value: 0,
    min: 0,
    max: 1,
    step: 0.1,
  },
  ior: {
    value: 1.5,
    min: 0,
    max: 10,
    step: 0.1,
  },
  thickness: {
    value: 1.5,
    min: 0,
    max: 10,
    step: 0.01,
  },
  wireframe: false,
}, { uuid })

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  uniforms.uTime.value += delta
})

</script>

<template>
  <Suspense>
    <Environment preset="studio" background/>
  </Suspense>

  <TresDirectionalLight 
    :position="[0.25, 2, -2.25]" 
    cast-shadow 
    :intensity="3"
    :shadow-mapSize-width="1024" 
    :shadow-mapSize-height="1024" 
    :shadow-camera-far="15" 
    :shadow-camera-normal-bias="0.05"
    />
  <TresMesh receive-shadow :rotation-y="Math.PI" :position="[0, -5, 5]">
    <TresPlaneGeometry :args="[15, 15, 15]" />
    <TresMeshStandardMaterial  />
  </TresMesh>
  <TresMesh receive-shadow cast-shadow>
    <TresIcosahedronGeometry :args="[2.5, 50]" />
    <CustomShaderMaterial
      :base-material="MeshStandardMaterial"
      :vertex-shader="vertexShader"
      :uniforms="uniforms"
      :color="color"
      :metalness="metalness"
      :roughness="roughness"
      :transmission="transmission"
      :ior="ior"
      silent
      :depth-write="true"
      :flat-shading="false"
      :thickness="thickness"
      :wireframe="wireframe"
      />

  </TresMesh>

</template>
