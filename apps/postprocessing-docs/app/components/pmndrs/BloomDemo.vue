<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { Color } from 'three'

const uuid = inject<string>(`uuid`)

const { luminanceThreshold, luminanceSmoothing, mipmapBlur, intensity, radius } = useControls({
  luminanceThreshold: { value: 0.1, min: 0, max: 1, step: 0.01 },
  luminanceSmoothing: { value: 0.3, min: 0, max: 1, step: 0.01 },
  mipmapBlur: true,
  intensity: { value: 8, min: 0, max: 20, step: 0.1 },
  radius: { value: 0.5, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresCanvas
    clear-color="#121212"
    :shadows="true"
    :alpha="false"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshStandardMaterial
        color="hotpink"
        :emissive="new Color('hotpink')"
        :emissive-intensity="1.2"
      />
    </TresMesh>
    <TresGridHelper />

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <Suspense>
      <EffectComposerPmndrs>
        <BloomPmndrs
          :luminance-threshold="luminanceThreshold"
          :luminance-smoothing="luminanceSmoothing"
          :mipmap-blur="mipmapBlur"
          :intensity="intensity"
          :radius="radius"
          :blend-function="BlendFunction.ADD"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
