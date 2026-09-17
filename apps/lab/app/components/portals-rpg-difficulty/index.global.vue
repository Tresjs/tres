<script setup lang="ts">
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { MathUtils } from 'three'

const uuid = 'portals-rpg-difficulty'

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

// Threshold near 1 so only the bright emitters inside the portals (torches,
// fire, the mage orb) bloom. The dim sky and the lit stone stay crisp.
const BLOOM = {
  luminanceThreshold: 0.9,
  luminanceSmoothing: 0.2,
  mipmapBlur: true,
  intensity: 1.2,
  radius: 0.6,
}

useControls('fpsgraph', { uuid })
</script>

<template>
  <!-- Same uuid as the fpsgraph above and the dungeon controls in Balanced.vue,
       or they land in a panel that is never mounted. -->
  <ClientOnly>
    <TresLeches :uuid="uuid" />
  </ClientOnly>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 6]" :fov="50" :look-at="[0, 0, 0]" />
    <PortalsRpgDifficultyExperience />
    <OrbitControls v-bind="CONTROLS" enable-damping />
    <Suspense>
      <EffectComposerPmndrs>
        <BloomPmndrs v-bind="BLOOM" />
      </EffectComposerPmndrs>
    </Suspense>
    <TheScreenshot />
    <!-- <Suspense>
      <Environment :files="['/skyboxes/medieval-bg.png']" background />
    </Suspense> -->
  </TresCanvas>
</template>
