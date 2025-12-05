<script setup lang="ts">
import { CustomShaderMaterial } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { MeshBasicMaterial } from 'three'

const gl = {
  clearColor: '#82DBC5',
}

const materialProps = {
  baseMaterial: MeshBasicMaterial,
  fragmentShader: `
    varying float vWobble;

    uniform float u_Time;

    void main() {
      float wobble = vWobble * 0.5 + 0.5;
      csm_FragColor = mix(vec4(0.0, 0.4, 1.5, 1.0), vec4(1.2, 0.6, 0.8, 1.0), wobble);
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
    u_Time: { value: 0 },
    u_WobbleSpeed: { value: 3 },
    u_WobbleAmplitude: { value: 0.07 },
    u_WobbleFrequency: { value: 3 },
  },
}

function onLoop() {
  materialProps.uniforms.u_Time.value += 0.01 * materialProps.uniforms.u_WobbleSpeed.value
}
</script>

<template>
  <TresCanvas v-bind="gl" @loop="onLoop">
    <TresPerspectiveCamera
      :position="[0, 2, 4]"
      :look-at="[-1, 0, 0]"
    />
    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.3, 512, 32]" />
      <CustomShaderMaterial v-bind="materialProps" />
    </TresMesh>
  </TresCanvas>
</template>
