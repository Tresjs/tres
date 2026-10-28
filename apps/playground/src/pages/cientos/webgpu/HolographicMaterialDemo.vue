<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { HolographicMaterial, OrbitControls, TorusKnot } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL HolographicMaterial.
import { HolographicMaterial as GlslHolographicMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { BackSide, DoubleSide, FrontSide, NoToneMapping } from 'three'
import { computed } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-holographic-material'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const HolographicComponent = rendererFactory ? GlslHolographicMaterial : HolographicMaterial

const {
  fresnelAmount,
  fresnelOpacity,
  scanlineSize,
  hologramBrightness,
  signalSpeed,
  hologramColor,
  hologramOpacity,
  enableBlinking,
  blinkFresnelOnly,
  enableAdditive,
  side,
} = useControls({
  fresnelAmount: { value: 0.45, min: 0, max: 1, step: 0.01 },
  fresnelOpacity: { value: 1, min: 0, max: 1, step: 0.01 },
  scanlineSize: { value: 8, min: 1, max: 15, step: 0.5 },
  hologramBrightness: { value: 0.7, min: 0, max: 2, step: 0.05 },
  signalSpeed: { value: 0.45, min: 0, max: 2, step: 0.05 },
  hologramColor: { type: 'color', value: '#00d5ff' },
  hologramOpacity: { value: 1, min: 0, max: 1, step: 0.05 },
  enableBlinking: true,
  blinkFresnelOnly: true,
  enableAdditive: true,
  side: { value: 'front', options: ['front', 'back', 'double'] },
}, { uuid })

const sides = { front: FrontSide, back: BackSide, double: DoubleSide }
const sideValue = computed(() => sides[side.value as keyof typeof sides])

const checks = [
  'A cyan hologram on the torus knot, with scanlines that scroll in screen space and a bright fresnel rim',
  '`enableBlinking` makes the rim flicker. With `blinkFresnelOnly` off, the whole hologram flickers',
  '`enableAdditive` off switches to normal blending: the hologram covers the box behind it instead of adding to it',
  'The hologram draws over the box even where the box is in front, because the material has depthTest off',
  'Every control changes the material at once, with no shader rebuild stutter',
  'The result matches `renderer: webgl` (the GLSL HolographicMaterial): same color, scanlines and rim. Overlaps and the hologram over the gray background are a little darker under WebGPU, which adds colors in linear color space',
  'No errors and no <HolographicMaterial> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#333333" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh :position="[0, 0, -1.5]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TorusKnot :args="[0.6, 0.2, 128, 32]">
      <component
        :is="HolographicComponent"
        :fresnel-amount="fresnelAmount"
        :fresnel-opacity="fresnelOpacity"
        :scanline-size="scanlineSize"
        :hologram-brightness="hologramBrightness"
        :signal-speed="signalSpeed"
        :hologram-color="hologramColor"
        :hologram-opacity="hologramOpacity"
        :enable-blinking="enableBlinking"
        :blink-fresnel-only="blinkFresnelOnly"
        :enable-additive="enableAdditive"
        :side="sideValue"
      />
    </TorusKnot>
  </TresCanvas>
</template>
