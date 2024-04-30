<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { CustomShaderMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

import { MeshBasicMaterial } from 'three'
import { nextTick, onMounted, watch } from 'vue'

const { onLoop } = useRenderLoop()

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

onMounted(async () => {
  await nextTick()

  onLoop(() => {
    materialProps.uniforms.u_Time.value
      += 0.01 * materialProps.uniforms.u_WobbleSpeed.value
  })
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
})

watch([speed.value, amplitude.value, frequency.value], () => {
  materialProps.uniforms.u_WobbleSpeed.value = speed.value.value
  materialProps.uniforms.u_WobbleAmplitude.value = amplitude.value.value
  materialProps.uniforms.u_WobbleFrequency.value = frequency.value.value
})
</script>

<template>
  <TresLeches class="top-0 important-left-4" />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 2, 4]"
      :look-at="[-1, 0, 0]"
    />
    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.3, 512, 32]" />
      <CustomShaderMaterial v-bind="materialProps" />
    </TresMesh>
  </TresCanvas>

  <div class="debug-container"></div>
</template>

<style scoped>
.debug-container {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
