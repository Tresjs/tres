<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer } from '@tresjs/post-processing/webgpu'
import { ACESFilmicToneMapping, AgXToneMapping, NeutralToneMapping, NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'
import { Bloom, FXAA, SMAA } from './effects'

const uuid = 'postprocessing-webgpu-staging'
const onReady = useBackendControl(uuid)

const toneMappings = new Map(Object.entries({ ACES: ACESFilmicToneMapping, AgX: AgXToneMapping, Neutral: NeutralToneMapping, None: NoToneMapping }))

const { bloomOn, antialias, order, toneMapping, strength, threshold } = useControls({
  bloomOn: { value: true, label: 'bloom' },
  antialias: { value: 'smaa', options: ['none', 'fxaa', 'smaa'] },
  order: { value: 'bloom → aa', options: ['bloom → aa', 'aa → bloom'] },
  toneMapping: { value: 'ACES', options: [...toneMappings.keys()] },
  strength: { value: 1, min: 0, max: 3, step: 0.01, label: 'bloom strength' },
  threshold: { value: 0.8, min: 0, max: 2, step: 0.01, label: 'bloom threshold' },
}, { uuid })

const toneMappingValue = computed(() => toneMappings.get(toneMapping.value))
const names = computed(() => order.value === 'bloom → aa' ? ['bloom', 'aa'] : ['aa', 'bloom'])
</script>

<template>
  <TresLeches :uuid="uuid" />
  <!-- The canvas antialias is off, so the FXAA / SMAA difference shows on the edges. -->
  <TresCanvas
    clear-color="#0b0b12"
    :antialias="false"
    :tone-mapping="toneMappingValue"
    @ready="onReady"
  >
    <TresPerspectiveCamera :position="[0, 2, 7]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresAmbientLight :intensity="0.4" />
    <TresDirectionalLight :position="[3, 4, 5]" :intensity="2" />

    <TresMesh v-for="(emissive, index) in ['#ff3366', '#33ddff', '#ffcc33']" :key="emissive" :position-x="(index - 1) * 2.2">
      <TresTorusKnotGeometry :args="[0.6, 0.2, 128, 16]" />
      <TresMeshStandardNodeMaterial color="#222233" :emissive="emissive" :emissive-intensity="index + 1" />
    </TresMesh>

    <TresMesh :position-y="-1.4" :rotation-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[12, 12, 24, 24]" />
      <TresMeshBasicNodeMaterial color="#8888aa" wireframe />
    </TresMesh>

    <EffectComposer>
      <template v-for="name in names" :key="name">
        <Bloom v-if="name === 'bloom' && bloomOn" :strength="strength" :threshold="threshold" />
        <template v-if="name === 'aa'">
          <FXAA v-if="antialias === 'fxaa'" />
          <SMAA v-else-if="antialias === 'smaa'" />
        </template>
      </template>
    </EffectComposer>
  </TresCanvas>
</template>
