<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import MultiBlob from './MultiBlob.vue'
import { BlendFunction } from 'postprocessing'
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 8]" />
  <OrbitControls :enable-pan="false" :enable-zoom="false" />
  
  <MultiBlob />
  
  <TresAmbientLight :intensity="0.4" />
  
  <Suspense>
    <EffectComposerPmndrs>
      <NoisePmndrs
        premultiply
        :blend-function="BlendFunction.OVERLAY"
      />
    </EffectComposerPmndrs>
  </Suspense>
</template>