<script setup lang="ts">
import { TresCanvas, useRenderLoop, useTexture } from '@tresjs/core'
import {
  CustomShaderMaterial,
  StatsGl,
  useTweakPane,
  OrbitControls,
} from '@tresjs/cientos'

import { MeshMatcapMaterial } from 'three'
import { onMounted, nextTick } from 'vue'

const { onLoop } = useRenderLoop()

const gl = {
  clearColor: '#82DBC5',
}

const texture01 = await useTexture({
  matcap: '/matcap_01.png',
})

const materialProps = {
  baseMaterial: MeshMatcapMaterial,
  matcap: texture01.matcap,
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
    u_Time: { value: 0 },
    u_WobbleSpeed: { value: 3 },
    u_WobbleAmplitude: { value: 0.07 },
    u_WobbleFrequency: { value: 3 },
  },
}

onMounted(async () => {
  await nextTick()

  createDebugPanel()

  onLoop(() => {
    materialProps.uniforms.u_Time.value
			+= 0.01 * materialProps.uniforms.u_WobbleSpeed.value
  })
})

function createDebugPanel() {
  const { pane } = useTweakPane()

  const folder = pane.addFolder({
    title: 'Settings',
  })

  folder.addInput(materialProps.uniforms.u_WobbleSpeed, 'value', {
    label: 'Wobble Speed',
    min: 0,
    max: 10,
  })

  folder.addInput(materialProps.uniforms.u_WobbleAmplitude, 'value', {
    label: 'Wobble Amplitude',
    min: 0,
    max: 0.2,
  })

  folder.addInput(materialProps.uniforms.u_WobbleFrequency, 'value', {
    label: 'Wobble Frequency',
    min: 1,
    max: 30,
  })
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 2, 4]"
      :look-at="[0, 0, 0]"
    />

    <OrbitControls />

    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.3, 512, 32]" />
      <CustomShaderMaterial v-bind="materialProps" />
    </TresMesh>

    <Suspense>
      <StatsGl />
    </Suspense>
  </TresCanvas>
</template>
