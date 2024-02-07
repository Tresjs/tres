<script setup lang="ts">
import { ref, shallowReactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Sampler, useTweakPane } from '@tresjs/cientos'
import { SRGBColorSpace, ACESFilmicToneMapping } from 'three'
import type { Mesh } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const torusRef = ref<Mesh>()
const instancesRef = ref<Mesh>()

const state = shallowReactive({
  count: 1,
})

const { pane } = useTweakPane()

pane.addInput(state, 'count', {
  label: 'samplers',
  min: 1,
  max: 50,
  step: 1,
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Sampler :count="state.count">
      <TresMesh ref="torusRef">
        <TresTorusGeometry />
      </TresMesh>

      <TresInstancedMesh
        ref="instancesRef"
        :args="[null!, null!, 1000]"
      >
        <TresBoxGeometry
          :args="[0.1, 0.1, 0.1]"
        />
        <TresMeshNormalMaterial />
      </TresInstancedMesh>
    </Sampler>
    <TresGridHelper
      :args="[10, 10]"
    />
  </TresCanvas>
</template>
