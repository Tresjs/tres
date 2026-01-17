<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, HolographicMaterial, OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { fresnelOpacity, fresnelAmount, scanlineSize, hologramBrightness, signalSpeed, hologramColor, enableBlinking, blinkFresnelOnly, hologramOpacity } = useControls({
  fresnelOpacity: { value: 1, min: 0, max: 1, step: 0.1 },
  fresnelAmount: { value: 1, min: 0, max: 2, step: 0.1 },
  scanlineSize: { value: 1, min: 0, max: 10, step: 0.5 },
  hologramBrightness: { value: 1, min: 0, max: 3, step: 0.1 },
  signalSpeed: { value: 1, min: 0, max: 5, step: 0.1 },
  hologramColor: '#00ff00',
  enableBlinking: true,
  blinkFresnelOnly: false,
  hologramOpacity: { value: 0.5, min: 0, max: 1, step: 0.1 },
}, { uuid })
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[2, 2, 2]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Box :scale="0.5">
      <HolographicMaterial
        :fresnel-opacity="fresnelOpacity"
        :fresnel-amount="fresnelAmount"
        :scanline-size="scanlineSize"
        :hologram-brightness="hologramBrightness"
        :signal-speed="signalSpeed"
        :hologram-color="hologramColor"
        :enable-blinking="enableBlinking"
        :blink-fresnel-only="blinkFresnelOnly"
        :hologram-opacity="hologramOpacity"
      />
    </Box>
    <TresAmbientLight />
  </TresCanvas>
</template>
