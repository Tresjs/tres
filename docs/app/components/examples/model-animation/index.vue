<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import TheExperience from './Experience.vue'

import { useProgress } from '@tresjs/cientos'

const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <SceneWrapper>
    <Transition
      name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-200"
      leave-active-class="opacity-0 transition-opacity duration-200"
    >
      <div
        v-show="!hasFinishLoading"
        class="absolute bg-default t-0 l-0 w-full h-full z-20 flex justify-center items-center font-mono"
      >
        <div class="w-200px">
          Loading... {{ progress }} %
          <i class="i-lucide-loading animate-rotate-in"></i>
        </div>
      </div>
    </Transition>
    <TresCanvas
      clear-color="#82DBC5"
    >
      <TheExperience />
    </TresCanvas>
  </SceneWrapper>
</template>
