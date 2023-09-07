<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import { EffectComposer, Glitch } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace, Vector2 } from 'three'
import { reactive } from 'vue'
import { GlitchMode } from 'postprocessing'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const glitchParams = reactive({
  delay: new Vector2(1.5, 3.5),
  duration: new Vector2(0.6, 1.0),
  strength: new Vector2(0.3, 1.0),
  mode: GlitchMode.SPORADIC,
  active: true,
  ratio: 0.85,
  columns: 2,
  chromaticAberrationOffset: new Vector2(0.001, 0.001),
  chromaticAberrationEnabled: true,
  dtSize: 64,
})

const { pane } = useTweakPane()

pane.addInput(glitchParams, 'delay')
pane.addInput(glitchParams, 'duration')
pane.addInput(glitchParams, 'strength')
pane.addInput(glitchParams, 'mode', {
  options: {
    SPORADIC: GlitchMode.SPORADIC,
    CONSTANT_MILD: GlitchMode.CONSTANT_MILD,
    CONSTANT_WILD: GlitchMode.CONSTANT_WILD,
  },
})
pane.addInput(glitchParams, 'active')
pane.addInput(glitchParams, 'ratio', { min: 0, max: 1 })
pane.addInput(glitchParams, 'columns', { min: 1, max: 64, step: 1 })
pane.addInput(glitchParams, 'chromaticAberrationOffset')
pane.addInput(glitchParams, 'dtSize', { min: 1, max: 64, step: 1 })
</script>

<template>
  <TresCanvas
    v-bind="gl"
    :disable-render="true"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh>
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <Suspense>
      <EffectComposer>
        <Glitch v-bind="glitchParams" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
