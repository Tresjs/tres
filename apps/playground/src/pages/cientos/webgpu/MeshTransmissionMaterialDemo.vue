<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Environment, MeshTransmissionMaterial, OrbitControls } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL MeshTransmissionMaterial.
import { MeshTransmissionMaterial as GlslMeshTransmissionMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { computed } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-mesh-transmission-material'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const TransmissionMaterial = rendererFactory ? GlslMeshTransmissionMaterial : MeshTransmissionMaterial

const {
  transmission,
  thickness,
  backsideThickness,
  roughness,
  chromaticAberration,
  anisotropicBlur,
  distortion,
  distortionScale,
  temporalDistortion,
  ior,
  clearcoat,
  attenuationDistance,
  attenuationColor,
  color,
  backside,
  samples,
  transmissionSampler,
} = useControls({
  transmission: { value: 1, min: 0, max: 1, step: 0.01 },
  thickness: { value: 1.5, min: 0, max: 10, step: 0.01 },
  backsideThickness: { value: 0.5, min: 0, max: 10, step: 0.01 },
  roughness: { value: 0, min: 0, max: 1, step: 0.01 },
  chromaticAberration: { value: 0.3, min: 0, max: 1, step: 0.01 },
  anisotropicBlur: { value: 0.1, min: 0, max: 1, step: 0.01 },
  distortion: { value: 0, min: 0, max: 1, step: 0.01 },
  distortionScale: { value: 0.3, min: 0, max: 1, step: 0.01 },
  temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
  ior: { value: 1.5, min: 1, max: 3, step: 0.01 },
  clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
  // 0 means no attenuation on WebGPU. The GLSL material needs Infinity for that, which a slider cannot reach.
  attenuationDistance: { value: 0, min: 0, max: 10, step: 0.1 },
  attenuationColor: { type: 'color', value: '#ffffff' },
  color: { type: 'color', value: '#ffffff' },
  backside: false,
  samples: { value: 6, min: 1, max: 16, step: 1 },
  transmissionSampler: false,
}, { uuid })

const materialProps = computed(() => ({
  transmission: transmission.value,
  thickness: thickness.value,
  backsideThickness: backsideThickness.value,
  roughness: roughness.value,
  chromaticAberration: chromaticAberration.value,
  anisotropicBlur: anisotropicBlur.value,
  distortion: distortion.value,
  distortionScale: distortionScale.value,
  temporalDistortion: temporalDistortion.value,
  ior: ior.value,
  clearcoat: clearcoat.value,
  attenuationDistance: rendererFactory ? attenuationDistance.value || Number.POSITIVE_INFINITY : attenuationDistance.value,
  attenuationColor: attenuationColor.value,
  color: color.value,
  backside: backside.value,
  samples: samples.value,
  transmissionSampler: transmissionSampler.value,
  resolution: 1024,
}))

const checks = [
  'The torus knot looks like glass: the red plane, the boxes and the grid show through it, bent',
  'The torus knot does not show itself inside itself, and it is not black or white',
  '`chromaticAberration` splits the colours at the edges of what shows through',
  '`roughness` and `anisotropicBlur` blur what shows through',
  '`distortion` above 0 wobbles the refraction. `temporalDistortion` above 0 animates it',
  '`transmission` 0 makes the knot an opaque physical material',
  '`attenuationColor` with an `attenuationDistance` above 0 tints the glass. Back at 0, the tint goes away',
  '`backside` on shows the far side of the knot through the near side',
  '`samples` remounts the material (warning in the console), and the knot is glass again',
  '`transmissionSampler` on still shows the scene through the knot, from the renderer opaque pass, also at `transmission` 0 then back to 1',
  'Every control gives about the same result as `renderer: webgl` (the GLSL MeshTransmissionMaterial)',
  'No errors and no <MeshTransmissionMaterial> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#82DBC5" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 1, 5]" />
    <OrbitControls />
    <Environment preset="city" />

    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.3, 256, 32]" />
      <component :is="TransmissionMaterial" v-bind="materialProps" />
    </TresMesh>

    <TresMesh :position="[0, 0, -3]">
      <TresPlaneGeometry :args="[8, 4]" />
      <TresMeshBasicMaterial :color="0xFF1111" />
    </TresMesh>
    <TresMesh :position="[-1.5, 0, -1.5]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#1d4ed8" />
    </TresMesh>
    <TresMesh :position="[1.5, 0.5, -1.5]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#facc15" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" :position-y="-1.5" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
  </TresCanvas>
</template>
