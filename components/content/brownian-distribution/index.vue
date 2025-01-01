<script setup lang="ts">
import BrownianDistributionExperiment from './BrownianDistributionExperiment.vue'
import { useDark, useToggle } from '@vueuse/core'
import { colors } from './constants'
const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>
  <TresCanvas :clear-color="isDark ? colors.DARK : colors.LIGHT" window-size>
    <BrownianDistributionExperiment />
  </TresCanvas>
  <button
    title="Toggle dark mode"
    class="rounded-full fixed z-10 bottom-5 right-15 p-1"
    :class="{ 'bg-white': !isDark, 'bg-dark': isDark }"
    @click="toggleDark()"
  >
    <i
      v-if="isDark"
      class="i-carbon-sun w-5 h-5 "
    />
    <i
      v-else
      class="i-carbon-moon w-5 h-5 "
    />
  </button>
</template>
