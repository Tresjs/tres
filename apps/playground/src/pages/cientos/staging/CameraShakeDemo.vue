<script setup lang="ts">
import { CameraShake, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const {
  intensity,
  decay,
  decayRate,
  maxYaw,
  maxPitch,
  maxRoll,
  yawFrequency,
  pitchFrequency,
  rollFrequency,
} = useControls({
  intensity: {
    label: 'Intensity',
    value: 1,
    min: 0,
    max: 2,
    step: 0.01,
  },
  decay: false,
  decayRate: {
    label: 'Decay Rate',
    value: 0.65,
    min: 0,
    max: 1,
    step: 0.01,
  },
  maxYaw: {
    label: 'Max Yaw',
    value: 0.01,
    min: 0,
    max: 0.2,
    step: 0.001,
  },
  maxPitch: {
    label: 'Max Pitch',
    value: 0.01,
    min: 0,
    max: 0.2,
    step: 0.001,
  },
  maxRoll: {
    label: 'Max Roll',
    value: 0.01,
    min: 0,
    max: 0.2,
    step: 0.001,
  },
  yawFrequency: {
    label: 'Yaw Freq',
    value: 0.5,
    min: 0,
    max: 2,
    step: 0.01,
  },
  pitchFrequency: {
    label: 'Pitch Freq',
    value: 0.5,
    min: 0,
    max: 2,
    step: 0.01,
  },
  rollFrequency: {
    label: 'Roll Freq',
    value: 0.4,
    min: 0,
    max: 2,
    step: 0.01,
  },
}, {
  uuid: 'camera-shake-demo',
})
</script>

<template>
  <TresLeches
    class="top-0 important-right-4"
    uuid="camera-shake-demo"
  />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />

    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>

    <TresMesh :position-x="-2.5">
      <TresSphereGeometry :args="[.5, 32, 32]" />
      <TresMeshBasicMaterial color="hotpink" />
    </TresMesh>

    <TresMesh :position-x="2.5">
      <TresConeGeometry :args="[.5, 1, 32]" />
      <TresMeshBasicMaterial color="lime" />
    </TresMesh>

    <TresGridHelper :args="[10, 10]" />

    <OrbitControls make-default />

    <CameraShake
      :intensity="intensity"
      :decay="decay"
      :decayRate="decayRate"
      :maxYaw="maxYaw"
      :maxPitch="maxPitch"
      :maxRoll="maxRoll"
      :yawFrequency="yawFrequency"
      :pitchFrequency="pitchFrequency"
      :rollFrequency="rollFrequency"
    />
  </TresCanvas>
</template>
