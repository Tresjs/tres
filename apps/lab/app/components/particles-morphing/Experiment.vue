<script setup lang="ts">
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import { Uniform, Vector2, AdditiveBlending } from 'three';
import { useDevicePixelRatio } from '@vueuse/core';

const { sizes } = useTres()
const { pixelRatio } = useDevicePixelRatio()
const uniforms = {
  uTime: new Uniform(0),
  uResolution: new Uniform(new Vector2(sizes.width.value * pixelRatio.value, sizes.height.value * pixelRatio.value)),
  uSize: new Uniform(0.07),
}

const geometryRef = ref<SphereGeometry | null>(null)

watch(geometryRef, (newGeometry) => {
  if (newGeometry) {
    newGeometry.setIndex(null)
  }
})
</script>
<template>
  <TresPoints>
    <TresSphereGeometry ref="geometryRef" :args="[1, 30, 30]" />
    <TresShaderMaterial 
    :vertex-shader="vertexShader" 
    :fragment-shader="fragmentShader" 
    :uniforms="uniforms" 
    :transparent="true"
    :blending="AdditiveBlending" :depth-write="false"></TresShaderMaterial>
  </TresPoints>
</template>