<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, DefaultLoadingManager } from 'three'
import {
  BloomEffect,
  DotScreenEffect,
  EffectComposer,
  EffectPass,
  GlitchEffect,
  RenderPass,
  ShaderPass,
  ChromaticAberrationEffect,
} from 'postprocessing'
import { useWindowSize } from '@vueuse/core'

const gl = reactive({
  clearColor: '#323232',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
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
  .on('change', (ev) => {
    effectComposer?.removePass(activePass)
    if (ev.value.fragmentShader) {
      activePass = new ShaderPass(ev.value)
    }
    else {
      activePass = new EffectPass(context.value.camera, new ev.value())
    }
    effectComposer?.addPass(activePass)
  })

const context = ref(null)

const { onLoop } = useRenderLoop()

const { width, height } = useWindowSize()

watchEffect(() => {
  if (context.value) {
    context.value.renderer.setSize(width.value, height.value)
    context.value.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    effectComposer = new EffectComposer(context.value.renderer)
    effectComposer.addPass(new RenderPass(context.value.scene, context.value.camera))

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
        />
      </div>
    </div>
  </Transition>
  <TresCanvas
    v-bind="gl"
    ref="context"
  >
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls />
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
