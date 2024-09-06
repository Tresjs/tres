<script setup lang="ts">
import { OrbitControls, Sampler } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { ref } from 'vue'
import type { Mesh } from 'three'
import '@tresjs/leches/dist/style.css'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const torusRef = ref<Mesh>()
const instancesRef = ref<Mesh>()

const { samples } = useControls({
  samples: {
    min: 1,
    max: 50,
    step: 1,
    value: 1,
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl" render-mode="on-demand">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Sampler :count="samples">
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
