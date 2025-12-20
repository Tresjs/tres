<script setup lang="ts">
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import { Uniform, Vector2, AdditiveBlending, SphereGeometry, MeshBasicMaterial, Float32BufferAttribute } from 'three';
import { useDevicePixelRatio } from '@vueuse/core';

const { sizes } = useTres()
const { pixelRatio } = useDevicePixelRatio()
const uniforms = {
  uTime: new Uniform(0),
  uResolution: new Uniform(new Vector2(1 * pixelRatio.value, 1 * pixelRatio.value)),
  uSize: new Uniform(50.0),
}

const geometryRef = ref<SphereGeometry | null>(null)

watch(geometryRef, (newGeometry) => {
  if (newGeometry) {
    newGeometry.setIndex(null)
  }
})

// Load models

const { isLoading, nodes } = useGLTF(
  '/models/blender-cube-simplified.glb',
  {
    draco: true,
  }
)

const blenderCube = computed(() => nodes.value?.BlenderCube)

const modelParticlesPositions = computed(() => blenderCube.value?.geometry.attributes.position.array)
const modelParticlesBufferAttribute = computed(() => new Float32BufferAttribute(modelParticlesPositions.value, 3))
watch(modelParticlesBufferAttribute, (newModelParticlePositions) => {
  if (newModelParticlePositions) {
    console.log(modelParticlesBufferAttribute.value)
  }
})
</script>
<template>
  <TresAmbientLight :intensity="1" />
 <!--  <TresPoints>
    <TresSphereGeometry ref="geometryRef" :args="[1, 30, 30]" />
    <TresShaderMaterial 
    :vertex-shader="vertexShader" 
    :fragment-shader="fragmentShader" 
    :uniforms="uniforms" 
    :transparent="true"
    :blending="AdditiveBlending" :depth-write="false"></TresShaderMaterial>
  </TresPoints> -->
  <TresPoints ref="modelParticlesPointsRef">
    <TresBufferGeometry v-if="modelParticlesPositions" :position="[modelParticlesPositions, 3]" />
    <TresShaderMaterial 
    :vertex-shader="vertexShader" 
    :fragment-shader="fragmentShader" 
    :uniforms="uniforms" 
    :transparent="true"
    :blending="AdditiveBlending" :depth-write="false"></TresShaderMaterial>
  </TresPoints>
</template> 