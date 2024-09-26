<script setup lang="ts">
import {
  postProcessingRoutes,
  threeRoutes,
} from '../router'

const sections = [
  {
    title: 'three',
    routes: threeRoutes,
  },
  {
    title: 'postprocessing',
    routes: postProcessingRoutes,
  },
]
</script>

<template>
  <div
    class="
  container mx-auto max-w-3xl
  font-sans text-xs color-gray
  bg-white
  "
  >
    <div class="mx-4">
      <div
        class="
    mt-24 mb-12 text-center align-baseline items-center gap-6
    sm:mt-16 sm:mb-6 sm:text-left sm:flex sm:flex-row-reverse
    "
      >
        <div>
          <img
            src="/logo.svg"
            alt="Post-processing logo"
            class="max-w-36 sm:max-w-xs align-baseline"
          />
        </div>
        <div class="sm:w-2/3">
          <h1
            class="
        w-auto max-w-75 mx-auto text-5xl text-zinc-700 mb-3
        sm:mx-none sm:w-1/2 sm:max-w-72
        "
          >
            <span class="text-cientos-blue">Post-processing</span> Playground
          </h1>
          <p class="text-lg">
            Testing zone for TresJS/post-processing components
          </p>
        </div>
      </div>
      <template v-for="(section, index) in sections" :key="index">
        <h2 class="text-2xl mb-4 font-semibold text-zinc-600">
          {{ section.title }}
        </h2>
        <div class="text-center sm:text-left sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <EffectListItem
            v-for="route in section.routes"
            :key="route.name"
            :route="route"
            class="my-4 sm:my-0"
          />
        </div>
      </template>
    </div>
  </div>
</template>
