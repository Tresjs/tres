<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'
import { ref, watch } from 'vue'

const colorMode = useColorMode()
const brightnessFor = (mode: string) => (mode === 'dark' ? -0.2 : 0.2)

const reducedMotion = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const speed = ref(reducedMotion ? 0 : 0.4)
const scale = ref(2.5)
const warp = ref(4)
const contrast = ref(1.3)
const brightness = ref(brightnessFor(colorMode.value))
const grain = ref(0.08)
const invert = ref(false)

// A color mode toggle resets brightness, so the noise stays behind the text in both themes.
watch(() => colorMode.value, (mode) => {
  brightness.value = brightnessFor(mode)
})

const uuid = 'hero'

// Flat, not in folders: folders start collapsed, and the hero should show every control at once.
useControls({
  speed: { value: speed, min: 0, max: 2, step: 0.01 },
  scale: { value: scale, min: 0.5, max: 8, step: 0.1 },
  warp: { value: warp, min: 0, max: 8, step: 0.1 },
  contrast: { value: contrast, min: 0, max: 3, step: 0.01 },
  brightness: { value: brightness, min: -1, max: 1, step: 0.01 },
  grain: { value: grain, min: 0, max: 0.5, step: 0.01 },
  invert,
}, { uuid })

const between = (min: number, max: number) => min + Math.random() * (max - min)

useControls({
  randomize: {
    type: 'button',
    value: {
      label: 'Randomize',
      variant: 'primary',
      size: 'md',
      onClick: () => {
        scale.value = +between(1, 6).toFixed(1)
        warp.value = +between(0.5, 7).toFixed(1)
        contrast.value = +between(0.8, 2.2).toFixed(2)
      },
    },
  },
}, { uuid })

useControls('fpsgraph', { uuid })
</script>

<template>
  <ClientOnly>
    <!-- The hero root is the nearest positioned ancestor, so this covers the whole hero. -->
    <div
      aria-hidden="true"
      class="hero-noise pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-50"
    >
      <HeroNoise
        :speed="speed"
        :scale="scale"
        :warp="warp"
        :contrast="contrast"
        :brightness="brightness"
        :grain="grain"
        :invert="invert"
      />
    </div>
    <div class="flex justify-center lg:justify-end">
      <div class="w-[280px] max-w-full">
        <TresLeches :uuid="uuid" :float="false" />
      </div>
    </div>
    <template #fallback>
      <div class="flex justify-center lg:justify-end">
        <div class="h-72 w-[280px] max-w-full animate-pulse rounded-md bg-elevated"></div>
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
/* Fade out at the bottom into the next section, and toward the left so the hero text stays readable. */
.hero-noise {
  mask-image:
    linear-gradient(to bottom, black 70%, transparent), linear-gradient(to right, rgb(0 0 0 / 0.35), black 65%);
  mask-composite: intersect;
}
</style>
