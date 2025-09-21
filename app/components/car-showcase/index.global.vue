<script setup lang="ts">
import { ContactShadows } from '@tresjs/cientos'
import Porsche from './Porsche.vue'
import Lightformers from './Lightformers.vue'
import CameraRig from './CameraRig.vue'

const gl = {
  clearColor: 'black', 
  powerPreference: 'high-performance',
  shadowMapType: 'PCFSoftShadowMap',
}

</script>

<template>
  <div class="relative w-full h-full">
    <TresCanvas v-bind="gl">
      <!-- <OrbitControls /> -->
      <CameraRig />
      <Porsche />
      <TresAmbientLight :intensity="1" />
      <TresSpotLight ref="spotLightRef" :position="[0, 15, 0]" :angle="0.3" :penumbra="1" :intensity="200" :decay="2"
        cast-shadow :shadow-bias="-0.0001" />
      <TresAmbientLight :intensity="0.5" />
      <ContactShadows :position-y="-1.16" :blur="3.5"  :resolution="512" :opacity="1" />
      <Suspense>
        <Environment :frames="Infinity" preset="sunset" background :blur="1" :resolution="256">
          <Lightformers />
        </Environment>
      </Suspense>
      <TheScreenshot />
    </TresCanvas>
    <div class="absolute bottom-20 left-20">
      <img src="/logos/tres_logo_white.svg" alt="TresJS Logo" class="h-8" >
      <p class="text-white text-sm mt-2 font-mono">Ported from R3F's original <NuxtLink href="https://codesandbox.io/p/sandbox/lwo219" target="_blank" class="underline">sandbox</NuxtLink> by <NuxtLink href="https://x.com/0xca0a" target="_blank" class="underline">0xca0a</NuxtLink></p>
    </div>
  </div>
</template>