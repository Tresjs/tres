<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { useControls } from '@tresjs/leches'
import { Color } from 'three'

const uuid = inject<string>('uuid')

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
}

const emissiveColor = new Color('hotpink')

const { luminanceThreshold, luminanceSmoothing, intensity, radius, mipmapBlur } = useControls({
  luminanceThreshold: { value: 0.1, min: 0, max: 1, step: 0.01 },
  luminanceSmoothing: { value: 0.3, min: 0, max: 1, step: 0.01 },
  intensity: { value: 8, min: 0, max: 20, step: 0.1 },
  radius: { value: 0.5, min: 0, max: 1, step: 0.01 },
  mipmapBlur: true,
}, { uuid })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        color="hotpink"
        :emissive="emissiveColor"
        :emissive-intensity="1.2"
      />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <EffectComposerPmndrs>
      <BloomPmndrs
        :luminance-threshold="luminanceThreshold"
        :luminance-smoothing="luminanceSmoothing"
        :intensity="intensity"
        :radius="radius"
        :mipmap-blur="mipmapBlur"
      />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
