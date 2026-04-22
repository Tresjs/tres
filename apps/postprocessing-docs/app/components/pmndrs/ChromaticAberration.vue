<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { NoToneMapping, Vector2 } from 'three'
import { ChromaticAberrationPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

const uuid = inject<string>('uuid')

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { offsetX, offsetY, radialModulation, modulationOffset } = useControls({
  offsetX: { value: 0.070, step: 0.001, max: 0.5 },
  offsetY: { value: 0.070, step: 0.001, max: 0.5 },
  radialModulation: true,
  modulationOffset: { value: 0, step: 0.01 },
}, { uuid })

const offset = computed(() => new Vector2(
  offsetX?.value ?? 0.07,
  offsetY?.value ?? 0.07,
))
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <template
      v-for="i in 4"
      :key="i"
    >
      <TresMesh
        :position="[((i - 1) - (4 - 1) / 2) * 1.5, 0, 0]"
      >
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshStandardMaterial color="#1C1C1E" />
      </TresMesh>
    </template>

    <TresAmbientLight color="#ffffff" />
    <TresDirectionalLight />

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
      :scale="20"
      :blur=".85"
    />

    <Suspense>
      <Environment :intensity="2" :blur="0" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <ChromaticAberrationPmndrs
          :offset="offset"
          :radial-modulation="radialModulation"
          :modulation-offset="modulationOffset"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
