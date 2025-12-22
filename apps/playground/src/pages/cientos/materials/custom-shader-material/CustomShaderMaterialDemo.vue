<script setup lang="ts">
import {
  CustomShaderMaterial,
  OrbitControls,
  useTexture,
} from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { MeshMatcapMaterial, Uniform } from 'three'

const uuid = 'materials-custom-shader'

const { onBeforeRender } = useLoop()

const { state: texture01 } = useTexture('/matcap_01.png')

const materialProps = {
  baseMaterial: MeshMatcapMaterial,
  matcap: texture01.value,
  fragmentShader: `
    varying float vWobble;

    uniform float u_Time;

    void main() {
      float wobble = vWobble * 0.5 + 0.5;
      vec4 csm_DiffuseColor2 = mix(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 2.0, 1.0), wobble);
      csm_DiffuseColor = mix(csm_DiffuseColor, csm_DiffuseColor2, wobble);
    }
  `,
  vertexShader: `
    uniform float u_Time;
    uniform float u_WobbleSpeed;
    uniform float u_WobbleAmplitude;
    uniform float u_WobbleFrequency;

    varying float vWobble;

    void main() {
      float wobble = sin(csm_Position.z * u_WobbleFrequency + u_Time * u_WobbleSpeed);
      csm_Position += normal * wobble * u_WobbleAmplitude;

      vWobble = wobble;
    }
  `,
  uniforms: {
    u_Time: new Uniform(0),
    u_WobbleSpeed: new Uniform(3),
    u_WobbleAmplitude: new Uniform(0.07),
    u_WobbleFrequency: new Uniform(3),
  },
}

onBeforeRender(() => {
  materialProps.uniforms.u_Time.value
    += 0.01 * materialProps.uniforms.u_WobbleSpeed.value
})

const { speed, amplitude, frequency } = useControls({
  speed: {
    value: materialProps.uniforms.u_WobbleSpeed.value,
    min: 0,
    max: 10,
  },
  amplitude: {
    value: materialProps.uniforms.u_WobbleAmplitude.value,
    min: 0,
    max: 0.2,
    step: 0.01,
  },
  frequency: {
    value: materialProps.uniforms.u_WobbleFrequency.value,
    min: 1,
    max: 30,
  },
}, { uuid })

watch([speed, amplitude, frequency], ([
  speedValue,
  amplitudeValue,
  frequencyValue,
]) => {
  materialProps.uniforms.u_WobbleSpeed.value = speedValue
  materialProps.uniforms.u_WobbleAmplitude.value = amplitudeValue
  materialProps.uniforms.u_WobbleFrequency.value = frequencyValue
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[0, 2, 4]"
    :look-at="[0, 0, 0]"
  />

  <OrbitControls />

  <TresMesh>
    <TresTorusKnotGeometry :args="[1, 0.3, 512, 32]" />
    <CustomShaderMaterial
      v-if="texture01"
      :base-material="() => new MeshMatcapMaterial({ matcap: texture01 })" 
      :matcap="texture01" 
      :fragment-shader="materialProps.fragmentShader" 
      :vertex-shader="materialProps.vertexShader" 
      :uniforms="materialProps.uniforms" 
      />
  </TresMesh>
</template>
