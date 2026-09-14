<script setup lang="ts">
import { MathUtils } from 'three'

const gl = {
  clearColor: '#12121a',
  alpha: false,
}

// The three frames make one folded panel that only reads correctly from the
// front, so the camera stays in a small cone around z+ and cannot pan away
// from the panel centre.
const CONTROLS = {
  enablePan: false,
  minDistance: 5,
  maxDistance: 11,
  minAzimuthAngle: MathUtils.degToRad(-25),
  maxAzimuthAngle: MathUtils.degToRad(25),
  minPolarAngle: MathUtils.degToRad(70),
  maxPolarAngle: MathUtils.degToRad(100),
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 6]" :fov="50" :look-at="[0, 0, 0]" />
    <PortalsRpgDifficultyExperience />
    <OrbitControls v-bind="CONTROLS" enable-damping />
    <TheScreenshot />
    <!-- <Suspense>
      <Environment :files="['/skyboxes/medieval-bg.png']" background />
    </Suspense> -->
  </TresCanvas>
</template>
