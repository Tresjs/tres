<script setup lang="ts">
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { MathUtils } from 'three'

const uuid = 'portals-rpg-difficulty'

const isDev = import.meta.dev

const isPhone = useIsPhone()
const dpr = computed<[number, number] | undefined>(() => (isPhone.value ? [1, 1.5] : undefined))

const gl = {
  clearColor: '#12121a',
  alpha: false,
}

// The folded panel only reads from the front, so the camera is locked to a small cone around z+.
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

// POP_DELAY + 2 * POP_STAGGER + POP_DURATION in Experience, so it lands after the last wobble.
const BANNER_DELAY = 2.4

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
    <TresLeches :uuid="uuid" collapsed />
  </ClientOnly>
  <PortalsRpgDifficultyBanner
    title="Choose your difficulty"
    :shown="revealed"
    :delay="BANNER_DELAY"
  />
  <TresCanvas v-bind="gl" :dpr="dpr">
    <TresPerspectiveCamera :position="[0, 0, 6]" :fov="50" :look-at="[0, 0, 0]" />
    <PortalsRpgDifficultyExperience :revealed="revealed" />
    <OrbitControls v-bind="CONTROLS" enable-damping />
    <Suspense v-if="!isPhone">
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
  </TresCanvas>
</template>
