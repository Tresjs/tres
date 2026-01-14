<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { Vector2 } from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const uniforms = {
  uTime: { value: 0 },
  uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
}
const uuid = 'wobble-sphere-experiment' 
const { color, metalness, roughness } = useControls({
  color: '#ff0000',
  metalness: { 
    value: 0.5,
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
}, { uuid })
</script>

<template>
  <Suspense>
    <Environment preset="studio" background/>
  </Suspense>
  <TresMesh>
    <TresIcosahedronGeometry :args="[2.5, 50]" />
    <TresMeshPhysicalMaterial 
      :color="color" 
      :metalness="metalness" 
      :roughness="roughness"
    />
  </TresMesh>
  <TresDirectionalLight 
    :position="[0.25, 2, -2.25]" 
    cast-shadow 
    :shadow-mapSize-width="1024" 
    :shadow-mapSize-height="1024" 
    :shadow-camera-far="15" 
    :shadow-camera-normal-bias="0.05"
    />
</template>
