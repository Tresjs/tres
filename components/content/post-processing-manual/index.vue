<script setup lang="ts">
import { useRenderLoop, useTres, TresCanvas } from '@tresjs/core'
import { reactive, watchEffect } from 'vue'
import { BasicShadowMap, sRGBEncoding, NoToneMapping, LoadingManager, DefaultLoadingManager } from 'three'
import { OrbitControls, GLTFModel, useTweakPane } from '@tresjs/cientos'
import {
  BloomEffect,
  DotScreenEffect,
  EffectComposer,
  EffectPass,
  GlitchEffect,
  RenderPass,
  ShaderPass,
  ChromaticAberrationEffect,
} from 'postprocessing/module'
import { useWindowSize } from '@vueuse/core'

const gl = reactive({
  clearColor: '#323232',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
})
let effectComposer
let activePass

const { pane } = useTweakPane()

pane
  .addBlade({
    view: 'list',
    label: 'Effects',
    options: [
      { text: 'DotScreen', value: DotScreenEffect },
      { text: 'Bloom', value: BloomEffect },
      { text: 'Glitch', value: GlitchEffect },

      { text: 'ChromaticAberrationEffect', value: ChromaticAberrationEffect },
      { text: 'None', value: null },
    ],
    value: null,
  })
  .on('change', ev => {
    effectComposer.removePass(activePass)
    if (ev.value.fragmentShader) {
      activePass = new ShaderPass(ev.value)
    } else {
      activePass = new EffectPass(state.camera, new ev.value())
    }
    effectComposer.addPass(activePass)
  })

const { state } = useTres()

const { onLoop } = useRenderLoop()

const { width, height } = useWindowSize()

watchEffect(() => {
  if (state.scene && state.camera && state.renderer) {
    state.renderer.setSize(width.value, height.value)
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    effectComposer = new EffectComposer(state.renderer)
    effectComposer.addPass(new RenderPass(state.scene, state.camera))

    onLoop(() => {
      effectComposer.render()
    })
  }
})

//TODO: replace this when UseProgress is implemented https://github.com/Tresjs/cientos/issues/22

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
      <div class="w-200px">
        Loading... {{ progress }} %
        <span
          class="mt-4 block bg-black h-1 w-1 z-10 transition-1"
          :style="{ transform: `scaleX(${progress / 2})`, transformOrigin: '0 100%' }"
        ></span>
      </div>
    </div>
  </Transition>
  <TresCanvas v-bind="gl">
    <OrbitControls />
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <TresDirectionalLight :position="[10, 10, 10]" />
    <Suspense>
      <GLTFModel
        ref="cyborg"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/cyber-samurai/scene.gltf"
        draco
      />
    </Suspense>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
