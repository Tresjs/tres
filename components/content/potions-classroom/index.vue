<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, DefaultLoadingManager } from 'three'
import { useTweakPane } from '@tresjs/cientos'

const gl = reactive({
  clearColor: '#242424',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  /*   outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping, */
})

const { pane } = useTweakPane()

pane.addInput(gl, 'clearColor', { label: 'Background' })

const hasFinishLoading = ref(false)
const progress = ref(0)

let saveLastTotalLoaded = 0

DefaultLoadingManager.onProgress = (item, loaded, total) => {
  if (loaded === total) {
    saveLastTotalLoaded = total
    hasFinishLoading.value = true
  }
  progress.value = Math.round(((loaded - saveLastTotalLoaded) / (total - saveLastTotalLoaded)) * 100 || 100, 2)
}
</script>

<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px text-white">
        Loading... {{ progress }} %
        <i class="i-game-icons-snitch-quidditch-ball animate-tada text-yellow"></i>
      </div>
    </div>
  </Transition>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 15, 11]" :look-at="[0, 4, 0]" />
    <Suspense>
      <Experience />
    </Suspense>
    <TresFog :color="0x242424" :near="1" :far="100" />
    <!--  <EffectComposer>
      <Suspense>
        <Bloom v-bind="bloomParams" />
      </Suspense>
    </EffectComposer> -->
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>
