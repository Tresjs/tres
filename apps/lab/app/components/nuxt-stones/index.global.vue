<script setup lang="ts">
import { BlendFunction } from 'postprocessing'



const bloomParams = reactive({
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 0.3,
  blendFunction: BlendFunction.ADD,
})
</script>

<template>
  <TresCanvas :clear-color="'#18181B'" shadows>
    <TresPerspectiveCamera :position="[-5.3, 8.3, 10.6]" :look-at="[0, 1, 0]" />
    <OrbitControls :target="[0, 1, 0]" enable-damping />
    <Suspense>
      <EffectComposerPmndrs>
        <BloomPmndrs v-bind="bloomParams" />
      </EffectComposerPmndrs>
    </Suspense>
    <NuxtStonesTheStones />
    <TheScreenshot />
  </TresCanvas>
</template>
