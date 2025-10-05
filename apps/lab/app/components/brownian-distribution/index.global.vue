<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { colors } from './constants'
const isDark = useDark()

</script>

<template>
  <TresCanvas :clear-color="isDark ? colors.DARK : colors.LIGHT" window-size>
    <BrownianDistributionExperiment />
    <TheScreenshot />
  </TresCanvas>

</template>
