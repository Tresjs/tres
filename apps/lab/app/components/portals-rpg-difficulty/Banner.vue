<script setup lang="ts">
defineProps<{
  title: string
  // Waits for the frames to land.
  shown?: boolean
  delay?: number
}>()

// The delay is for the intro only. Later toggles should be immediate.
const landed = ref(false)
</script>

<template>
  <!-- z-10: the canvas comes later in the DOM and would paint over the banner. -->
  <div
    class="pointer-events-none fixed top-20 left-1/2 z-10 flex w-[min(1000px,100vw)] -translate-x-1/2 flex-col items-center bg-[linear-gradient(to_right,transparent,rgb(0_0_0/60%)_25%,rgb(0_0_0/78%)_50%,rgb(0_0_0/60%)_75%,transparent)] pt-4 pb-2 transition-opacity duration-600 ease-out"
    :class="shown ? 'opacity-100 [transition-delay:var(--delay)]' : 'opacity-0'"
    :style="{ '--delay': landed ? '0s' : `${delay ?? 0}s` }"
    @transitionend.self="landed = true"
  >
    <p class="font-serif mb-1 text-4xl font-medium tracking-wide text-[#f2ead8] text-shadow-[0_2px_12px_rgb(0_0_0/80%)]">
      {{ title }}
    </p>
    <!-- Same fleuron as the card pips, stretched into a rule that thins out
         towards both ends. Pale gold matches the card ornaments. -->
    <svg
      class="h-6 w-[min(520px,90%)] text-[#d9c9a3] opacity-85"
      viewBox="0 0 400 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <defs>
        <!-- userSpaceOnUse: a horizontal line has a zero-height bounding box,
             and SVG skips bounding-box gradients on those entirely. -->
        <linearGradient
          id="banner-rule-fade"
          gradientUnits="userSpaceOnUse"
          x1="0"
          x2="400"
          y1="0"
          y2="0"
        >
          <stop offset="0" stop-color="currentColor" stop-opacity="0" />
          <stop offset="0.3" stop-color="currentColor" stop-opacity="1" />
          <stop offset="0.7" stop-color="currentColor" stop-opacity="1" />
          <stop offset="1" stop-color="currentColor" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path d="M200 4 L206 12 L200 20 L194 12 Z" />
      <path d="M194 12 C188 12 182 10 176 6" />
      <path d="M206 12 C212 12 218 10 224 6" />
      <path d="M176 6 C173 8 170 9 167 9" stroke-width=".9" opacity=".6" />
      <path d="M224 6 C227 8 230 9 233 9" stroke-width=".9" opacity=".6" />
      <path d="M0 12 H184" stroke="url(#banner-rule-fade)" />
      <path d="M216 12 H400" stroke="url(#banner-rule-fade)" />
      <path d="M0 16 H176" stroke="url(#banner-rule-fade)" stroke-width=".7" opacity=".5" />
      <path d="M224 16 H400" stroke="url(#banner-rule-fade)" stroke-width=".7" opacity=".5" />
    </svg>
  </div>
</template>
