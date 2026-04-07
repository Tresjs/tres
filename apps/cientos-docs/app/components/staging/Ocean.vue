<script setup lang="ts">
import { Ocean, OrbitControls, Sky } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const uuid = inject('uuid')

const { waterColor, sunColor, distortionScale, size, alpha, speed } = useControls(
  {
    waterColor: { value: '#001e0f', type: 'color' },
    sunColor: { value: '#ffffff', type: 'color' },
    distortionScale: { value: 3.7, min: 0, max: 50, step: 0.1 },
    size: { value: 1, min: 0.1, max: 10, step: 0.1 },
    alpha: { value: 1.0, min: 0, max: 1, step: 0.01 },
    speed: { value: 1, min: 0, max: 5, step: 0.1 },
  },
  { uuid },
)
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 1, 1]" />
    <Sky :azimuth="0" />
    <Suspense>
      <Ocean
        :water-color="waterColor"
        :sun-color="sunColor"
        :distortion-scale="distortionScale"
        :size="size"
        :alpha="alpha"
        :speed="speed"
      />
    </Suspense>
    <TresMesh :position-y="1">
      <TresBoxGeometry :args="[1, 1, 1]" />
    </TresMesh>
    <OrbitControls
      :enable-pan="false"
      :enable-zoom="false"
      :max-polar-angle="Math.PI * 0.495"
      :min-distance="40.0"
      :max-distance="200.0"
    />
  </TresCanvas>
</template>
