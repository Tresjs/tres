<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { EffectComposerPmndrs, N8AOPmndrs, SMAAPmndrs } from '@tresjs/post-processing'

const uuid = inject<string>('uuid')

const { aoRadius, distanceFalloff, intensity, color, halfRes, renderMode } = useControls({
  aoRadius: { value: 2, min: 0.1, max: 10, step: 0.1 },
  distanceFalloff: { value: 1, min: 0.1, max: 5, step: 0.1 },
  intensity: { value: 3, min: 0, max: 10, step: 0.1 },
  color: '#000000',
  halfRes: false,
  renderMode: {
    options: ['Combined', 'AO', 'No AO', 'Split', 'Split AO'].map((text, value) => ({ text, value })),
    value: 3,
  },
}, { uuid })
</script>

<template>
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
      <TresMeshStandardMaterial color="#FC7BAC" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <N8AOPmndrs
          :ao-radius="aoRadius"
          :distance-falloff="distanceFalloff"
          :intensity="intensity"
          :color="color"
          :half-res="halfRes"
          :render-mode="renderMode"
        />
        <SMAAPmndrs />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
