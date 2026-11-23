<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { EffectComposer } from '@tresjs/post-processing/webgpu'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'
import { builds, Invert, Vignette } from './effects'

const uuid = 'postprocessing-webgpu-composer'
const onReady = useBackendControl(uuid)

const { composer, invert, vignette, order, amount, darkness, color } = useControls({
  composer: true,
  invert: true,
  vignette: true,
  order: { value: 'invert → vignette', options: ['invert → vignette', 'vignette → invert'] },
  amount: { value: 1, min: 0, max: 1, step: 0.01, label: 'invert amount' },
  darkness: { value: 0.9, min: 0, max: 1, step: 0.01 },
  color: { value: '#1d0b3a', label: 'vignette color' },
}, { uuid })

const names = computed(() => order.value === 'invert → vignette' ? ['invert', 'vignette'] : ['vignette', 'invert'])
</script>

<template>
  <div class="absolute bottom-2 left-2 z-10 px-3 py-1 rounded bg-black/60 text-white text-sm font-mono" data-test="builds">
    graph builds: {{ builds }}
  </div>

  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#f2f2f2" :tone-mapping="NoToneMapping" render-mode="on-demand" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 2, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresMesh v-for="(meshColor, index) in ['#ff3366', '#33ddff', '#ffcc33']" :key="meshColor" :position-x="(index - 1) * 2">
      <TresTorusKnotGeometry :args="[0.5, 0.18, 128, 32]" />
      <TresMeshBasicNodeMaterial :color="meshColor" />
    </TresMesh>

    <EffectComposer :enabled="composer">
      <template v-for="name in names" :key="name">
        <Invert v-if="name === 'invert' && invert" :amount="amount" />
        <Vignette v-if="name === 'vignette' && vignette" :darkness="darkness" :color="color" />
      </template>
    </EffectComposer>
  </TresCanvas>
</template>
