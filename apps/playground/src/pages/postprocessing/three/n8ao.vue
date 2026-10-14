<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer, N8AO, SMAA } from '@tresjs/post-processing'

const uuid = 'n8ao-three'

const { aoRadius, distanceFalloff, intensity, color, aoSamples, denoiseSamples, denoiseRadius, halfRes, screenSpaceRadius, renderMode } = useControls({
  aoRadius: { value: 2, min: 0.1, max: 10, step: 0.1 },
  distanceFalloff: { value: 1, min: 0.1, max: 5, step: 0.1 },
  intensity: { value: 3, min: 0, max: 10, step: 0.1 },
  color: '#000000',
  aoSamples: { value: 16, min: 1, max: 64, step: 1 },
  denoiseSamples: { value: 8, min: 1, max: 16, step: 1 },
  denoiseRadius: { value: 12, min: 0, max: 24, step: 1 },
  halfRes: false,
  screenSpaceRadius: false,
  renderMode: {
    options: ['Combined', 'AO', 'No AO', 'Split', 'Split AO'].map((text, value) => ({ text, value })),
    value: 0,
  },
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />

  <TresCanvas clear-color="#dfdfdf">
    <TresPerspectiveCamera :position="[6, 5, 8]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[5, 8, 3]" :intensity="2" />

    <TresMesh :rotation-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[20, 20]" />
      <TresMeshStandardMaterial color="white" />
    </TresMesh>
    <TresMesh :position="[-2, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshStandardMaterial color="white" />
    </TresMesh>
    <TresMesh :position="[0, 0.75, 0.5]">
      <TresSphereGeometry :args="[0.75, 32, 32]" />
      <TresMeshStandardMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh :position="[2, 1.2, -0.5]">
      <TresTorusKnotGeometry :args="[0.7, 0.25, 128, 32]" />
      <TresMeshStandardMaterial color="#FBB03B" />
    </TresMesh>

    <Suspense>
      <!-- N8AO renders the scene itself, so the composer's RenderPass would only render it twice.
           Without the RenderPass, N8AO must stay mounted: use render mode "No AO" to compare. -->
      <EffectComposer without-render-pass>
        <N8AO
          :ao-radius="aoRadius"
          :distance-falloff="distanceFalloff"
          :intensity="intensity"
          :color="color"
          :ao-samples="aoSamples"
          :denoise-samples="denoiseSamples"
          :denoise-radius="denoiseRadius"
          :half-res="halfRes"
          :screen-space-radius="screenSpaceRadius"
          :render-mode="renderMode"
        />
        <SMAA />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
