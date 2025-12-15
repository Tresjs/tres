<script setup>
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { ShaderMaterial, Uniform, Color, DoubleSide, Vector3 } from 'three'

const torusKnot = ref(null)
const torus = ref(null)
const directionalLightHelper = ref(null)

const CONTROLS_CONFIG = {
  uuid: 'lights-shading-experiment',
}

const { materialColor } = useControls({
  materialColor: {
    value: '#82DBC5',
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
  color: '#ffffff',
  position: new Vector3(0, 0, 4),
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
  if (directionalLightHelper.value) {
    directionalLightHelper.value.material.color = new Color(newColor)
  }
}, { immediate: true })

watch(directionalLightIntensity, (newIntensity) => {
  shaderMaterial.uniforms.uDirectionalLightIntensity.value = newIntensity
}, { immediate: true })

watch(directionalLightPosition, (newPosition) => {
  shaderMaterial.uniforms.uDirectionalLightPosition.value = new Vector3(newPosition.x, newPosition.y, newPosition.z)
}, { immediate: true })


const { onBeforeRender } = useLoop()

onBeforeRender(({delta}) => {
  if (torusKnot.value) {
    torusKnot.value.rotation.y += delta * 0.5
    torusKnot.value.rotation.x += delta * 0.5
  }
  if (torus.value) {
    torus.value.rotation.y += delta * 0.5
    torus.value.rotation.x += delta * 0.5
  }
})
</script>
<template>
  <TresGroup>
    <TresMesh ref="directionalLightHelper" :position="[directionalLightPosition.x, directionalLightPosition.y, directionalLightPosition.z]">
      <TresPlaneGeometry :args="[1, 1]" />
      <TresMeshBasicMaterial :color="directionalLightColor" :side="DoubleSide" />
    </TresMesh>
    <LightsShadingModel :material="shaderMaterial" />
    <TresMesh ref="torusKnot" :position="[-4, 0, 0]" :material="shaderMaterial">
      <TresTorusKnotGeometry :args="[1, 0.4, 100, 16]" />
    </TresMesh>

    <TresMesh ref="torus" :position="[4, 0, 0]" :material="shaderMaterial">
      <TresTorusGeometry :args="[1, 0.4, 100, 32]" />
    </TresMesh>
  </TresGroup>
</template>