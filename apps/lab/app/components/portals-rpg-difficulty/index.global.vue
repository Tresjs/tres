<script setup lang="ts">
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { MathUtils } from 'three'

const uuid = 'portals-rpg-difficulty'

// The controls panel is a tuning aid, not part of the demo.
const isDev = import.meta.dev

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

useControls('fpsgraph', { uuid })

const revealed = ref(false)

// Lands after the last frame has stopped wobbling: POP_DELAY + 2 * POP_STAGGER
// + POP_DURATION in Experience.
const BANNER_DELAY = 2.4

// Threshold near 1 so only the bright emitters inside the portals (torches,
// fire, the mage orb) bloom. The dim sky and the lit stone stay crisp.
const {
  bloomIntensity,
  bloomThreshold,
  bloomSmoothing,
  bloomRadius,
  bloomMipmapBlur,
} = useControls('bloom', {
  intensity: { value: 0.5, min: 0, max: 5, step: 0.05 },
  threshold: { value: 0.33, min: 0, max: 1, step: 0.01 },
  smoothing: { value: 0.2, min: 0, max: 1, step: 0.01 },
  radius: { value: 0.6, min: 0, max: 1, step: 0.01 },
  mipmapBlur: { value: false, type: 'boolean', label: 'mipmap blur' },
}, { uuid })
</script>

<template>
  <TheLoadingScreen background="#dfdfdf" text-color="#000000" @hidden="revealed = true" />

  <ClientOnly v-if="isDev">
    <TresLeches :uuid="uuid" />
  </ClientOnly>
  <PortalsRpgDifficultyBanner
    title="Choose your difficulty"
    :shown="revealed"
    :delay="BANNER_DELAY"
  />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 6]" :fov="50" :look-at="[0, 0, 0]" />
    <PortalsRpgDifficultyExperience :revealed="revealed" />
    <OrbitControls v-bind="CONTROLS" enable-damping />
    <Suspense>
      <EffectComposerPmndrs>
        <BloomPmndrs
          :intensity="bloomIntensity"
          :luminance-threshold="bloomThreshold"
          :luminance-smoothing="bloomSmoothing"
          :radius="bloomRadius"
          :mipmap-blur="bloomMipmapBlur"
        />
      </EffectComposerPmndrs>
    </Suspense>
    <!-- <Suspense>
      <Environment :files="['/skyboxes/medieval-bg.png']" background />
    </Suspense> -->
  </TresCanvas>
</template>
