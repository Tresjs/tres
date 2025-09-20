<script setup lang="ts">
import { Fbo, OrbitControls } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'
import { TresCanvas } from '@tresjs/core'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { ref, shallowReactive, shallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const fboRef = ref(null)
const torusRef = shallowRef<TresObject | null>(null)
const capsuleRef = shallowRef<TresObject | null>(null)

const state = shallowReactive({
  depth: false,
  settings: {
    samples: 1,
  },
})

function onLoop({ elapsed }: { elapsed: number }) {
  if (!torusRef.value || !capsuleRef.value) { return }

  torusRef.value.rotation.x = elapsed * 0.745
  torusRef.value.rotation.y = elapsed * 0.361

  capsuleRef.value.rotation.x = elapsed * 0.471
  capsuleRef.value.rotation.z = elapsed * 0.632
}
</script>

<template>
  <TresCanvas v-bind="gl" @loop="onLoop">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresGridHelper :args="[10, 10]" />

    <Fbo
      ref="fboRef"
      v-bind="state"
    />

    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />

      <TresMeshBasicMaterial
        :color="0xFFFFFF"
        :map="fboRef?.instance.texture ?? null"
      />
    </TresMesh>

    <TresMesh
      ref="torusRef"
      :position="[3, 0, 0]"
    >
      <TresTorusGeometry :args="[1, 0.5, 16, 100]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh
      ref="capsuleRef"
      :position="[-2, 0, 0]"
    >
      <TresCapsuleGeometry :args="[0.4, 1, 4, 8]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
