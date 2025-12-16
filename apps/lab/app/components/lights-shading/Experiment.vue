<script setup>
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { ShaderMaterial, Uniform, Color, DoubleSide, Vector3 } from 'three'

const torusKnot = ref(null)
const sphere = ref(null)

const CONTROLS_CONFIG = {
  uuid: 'lights-shading-experiment',
}

const { materialColor } = useControls({
  materialColor: {
    value: '#ffffff',
    type: 'color',
  },
}, CONTROLS_CONFIG)

const { ambientLightIntensity, ambientLightColor } = useControls('ambientLight', {
  intensity: {
    value: 0.1,
    min: 0,
    max: 1,
    step: 0.01,
  },
  color: '#ffffff',
}, CONTROLS_CONFIG)

const { directionalLightIntensity, directionalLightColor, directionalLightPosition } = useControls('directionalLight', {
  intensity: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  },
  color: '#8fe3ff',
  position: new Vector3(0, 0, 4),
}, CONTROLS_CONFIG)

const { pointLightIntensity, pointLightColor, pointLightPosition, pointLightDecayFactor } = useControls('pointLight', {
  intensity: {
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  },
  color: '#d37e7e',
  position: new Vector3(0, 2.5, 0),
  decayFactor: {
    value: 0.3,
    min: 0,
    max: 1,
    step: 0.01,
  },
}, CONTROLS_CONFIG)

const shaderMaterial = new ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uColor: new Uniform(new Color(materialColor.value)),
    uAmbientLightIntensity: new Uniform(ambientLightIntensity.value),
    uAmbientLightColor: new Uniform(new Color(ambientLightColor.value)),
    uDirectionalLightIntensity: new Uniform(directionalLightIntensity.value),
    uDirectionalLightColor: new Uniform(new Color(directionalLightColor.value)),
    uDirectionalLightPosition: new Uniform(new Vector3(directionalLightPosition.value)),
    uPointLightIntensity: new Uniform(pointLightIntensity.value),
    uPointLightColor: new Uniform(new Color(pointLightColor.value)),
    uPointLightPosition: new Uniform(new Vector3(pointLightPosition.value)),
    uPointLightDecayFactor: new Uniform(pointLightDecayFactor.value),
  },
})

watch(materialColor, (newColor) => {
  shaderMaterial.uniforms.uColor.value = new Color(newColor)
}, { immediate: true })

watch(ambientLightColor, (newColor) => {
  shaderMaterial.uniforms.uAmbientLightColor.value = new Color(newColor)
}, { immediate: true })

watch(ambientLightIntensity, (newIntensity) => {
  shaderMaterial.uniforms.uAmbientLightIntensity.value = newIntensity
}, { immediate: true })

watch(directionalLightColor, (newColor) => {
  shaderMaterial.uniforms.uDirectionalLightColor.value = new Color(newColor)
}, { immediate: true })

watch(directionalLightIntensity, (newIntensity) => {
  shaderMaterial.uniforms.uDirectionalLightIntensity.value = newIntensity
}, { immediate: true })

watch(directionalLightPosition, (newPosition) => {
  shaderMaterial.uniforms.uDirectionalLightPosition.value = new Vector3(newPosition.x, newPosition.y, newPosition.z)
}, { immediate: true, deep: true })


watch(pointLightColor, (newColor) => {
  shaderMaterial.uniforms.uPointLightColor.value = new Color(newColor)
}, { immediate: true })

watch(pointLightIntensity, (newIntensity) => {
  shaderMaterial.uniforms.uPointLightIntensity.value = newIntensity
}, { immediate: true })

watch(pointLightPosition, (newPosition) => {
  shaderMaterial.uniforms.uPointLightPosition.value = new Vector3(newPosition.x, newPosition.y, newPosition.z)
}, { immediate: true, deep: true })

watch(pointLightDecayFactor, (newDecayFactor) => {
  shaderMaterial.uniforms.uPointLightDecayFactor.value = newDecayFactor
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({delta}) => {
  if (torusKnot.value) {
    torusKnot.value.rotation.y += delta * 0.5
    torusKnot.value.rotation.x += delta * 0.7
  }
  if (sphere.value) {
    sphere.value.rotation.y += delta * 0.5
    sphere.value.rotation.x += delta * 0.7
  }
})
</script>
<template>
  <TresGroup>
    <TresMesh :position="[directionalLightPosition.x, directionalLightPosition.y, directionalLightPosition.z]">
      <TresPlaneGeometry :args="[1, 1]" />
      <TresMeshBasicMaterial :color="directionalLightColor" :side="DoubleSide" />
    </TresMesh>
    <TresMesh :position="[pointLightPosition.x, pointLightPosition.y, pointLightPosition.z]">
      <TresIcosahedronGeometry :args="[0.1, 2]" />
      <TresMeshBasicMaterial :color="pointLightColor" :side="DoubleSide" />
    </TresMesh>
    <LightsShadingModel :material="shaderMaterial" />
    <TresMesh ref="torusKnot" :position="[-4, 0, 0]" >
      <TresTorusKnotGeometry :args="[1, 0.4, 100, 16]" />
      <primitive :object="shaderMaterial" />
    </TresMesh>

    <TresMesh ref="sphere" :position="[4, 0, 0]" :material="shaderMaterial">
      <TresSphereGeometry :args="[1, 32, 16]" />
    </TresMesh>
  </TresGroup>
</template>