<script setup lang="ts">
import { Box, CameraShake, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

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
  intensity: { value: 1, min: 0, max: 3, step: 0.01 },
  decay: false,
  decayRate: { value: 0.65, min: 0, max: 5, step: 0.01 },
  maxYaw: { value: 0.01, min: 0, max: 0.5, step: 0.001 },
  maxPitch: { value: 0.01, min: 0, max: 0.5, step: 0.001 },
  maxRoll: { value: 0.01, min: 0, max: 0.5, step: 0.001 },
  yawFrequency: { value: 0.1, min: 0, max: 5, step: 0.01 },
  pitchFrequency: { value: 0.1, min: 0, max: 5, step: 0.01 },
  rollFrequency: { value: 0.1, min: 0, max: 5, step: 0.01 },
})
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[0, 2, 6]" />
      <OrbitControls make-default />

      <CameraShake
        :intensity="intensity"
        :decay="decay"
        :decay-rate="decayRate"
        :max-yaw="maxYaw"
        :max-pitch="maxPitch"
        :max-roll="maxRoll"
        :yaw-frequency="yawFrequency"
        :pitch-frequency="pitchFrequency"
        :roll-frequency="rollFrequency"
      />
      <TresAxesHelper :scale="2" />
      <TresGridHelper :position-y="-0.5" />
      <Box>
        <TresMeshToonMaterial color="orange" />
      </Box>
      <TresAmbientLight />
      <TresDirectionalLight :position="[0, 2, 4]" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
