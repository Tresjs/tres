<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { BasicShadowMap, sRGBEncoding, NoToneMapping, Vector2 } from 'three'
import { OrbitControls, GLTFModel, useTweakPane } from '@tresjs/cientos'
import { useRenderLoop, useTres } from '@tresjs/core'
import {
  BloomEffect,
  DotScreenEffect,
  Effect,
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

    /* const dotScreenPass = new EffectPass(state.camera, new DotScreenEffect())
    const bloomPass = new EffectPass(state.camera, new BloomEffect())
    const glitchPass = new EffectPass(state.camera, new GlitchEffect())

    effectComposer.addPass(glitchPass) */
    /*  const chromatic = new EffectPass(
      state.camera,
      new ChromaticAberrationEffect({
        offset: new Vector2(0.001, 0.009),
      }),
    )
    effectComposer.addPass(chromatic) */

    onLoop(() => {
      effectComposer.render()
    })
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <OrbitControls />
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <TresScene>
      <TresDirectionalLight :position="[10, 10, 10]" />
      <GLTFModel
        ref="cyborg"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/cyber-samurai/scene.gltf"
        draco
      />
      <TresAmbientLight :intensity="1" />
    </TresScene>
  </TresCanvas>
</template>
