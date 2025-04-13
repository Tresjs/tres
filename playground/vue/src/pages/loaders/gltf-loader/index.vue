<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

import TheExperience from './TheExperience.vue'

const state = reactive({
  hasFinishLoading: false,
  progress: 0,
})

provide('gltf-loader-state', state)
</script>

<template>
  <div class="relative h-full w-full">
    <Transition
      name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-200"
      leave-active-class="opacity-0 transition-opacity duration-200"
    >
      <div
        v-show="!state.hasFinishLoading"
        class="absolute bg-white t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
      >
        <div class="w-200px">
          Loading...
          {{ state.progress }} %
        </div>
      </div>
    </Transition>
    <TresCanvas clear-color="#C0ffee">
      <TheExperience />
    </TresCanvas>
  </div>
</template>
