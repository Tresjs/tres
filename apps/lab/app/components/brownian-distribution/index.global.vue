<script setup lang="ts">
import { colors } from './constants'

const isDark = useIsDark()
</script>

<template>
  <TresCanvas :clear-color="isDark ? colors.DARK : colors.LIGHT" window-size>
    <BrownianDistributionExperiment />
    <TheScreenshot />
  </TresCanvas>
</template>
