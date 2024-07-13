<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { EffectComposer, Glitch } from '@tresjs/post-processing'
import { BasicShadowMap, NoToneMapping, Vector2 } from 'three'
import { GlitchMode } from 'postprocessing'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#121212',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const { mode, active, ratio, columns, delay, duration, strength, chromaticAberrationOffset, chromaticAberrationEnabled } = useControls({
  delay: new Vector2(1.5, 3.5),
  duration: new Vector2(0.6, 1.0),
  strength: new Vector2(0.3, 1.0),
  mode: {
    value: GlitchMode.SPORADIC,
    options: [
      {
        text: 'Sporadic',
        value: GlitchMode.SPORADIC,
      },
      {
        text: 'Constant Mild',
        value: GlitchMode.CONSTANT_MILD,
      },
      {
        text: 'Constant Wild',
        value: GlitchMode.CONSTANT_WILD,
      },
    ],
  },
  active: true,
  ratio: 0.85,
  columns: 2,
  dtSize: 64,
  chromaticAberrationOffset: new Vector2(0.001, 0.001),
  chromaticAberrationEnabled: true,
})

/* pane.addInput(glitchParams, 'delay')
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
pane.addInput(glitchParams, 'dtSize', { min: 1, max: 64, step: 1 }) */
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
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
        <Glitch
          :delay="delay.value"
          :duration="duration.value"
          :strength="strength.value"
          :mode="mode.value"
          :active="active.value"
          :ratio="ratio.value"
          :columns="columns.value"
          :chromatic-aberration-offset="chromaticAberrationOffset.value"
          :chromatic-aberration-enabled="chromaticAberrationEnabled.value"
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
