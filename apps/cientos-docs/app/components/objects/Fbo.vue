<script setup lang="ts">
import { Fbo, OrbitControls } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const fboRef = shallowRef<InstanceType<typeof Fbo> | null>(null)
const torusRef = shallowRef<TresObject | null>(null)

function onLoop({ elapsed }: { elapsed: number }) {
  if (!torusRef.value) { return }

  torusRef.value.rotation.x = elapsed * 0.745
  torusRef.value.rotation.y = elapsed * 0.361
}
</script>

<template>
  <TresCanvas :clear-color="0x222" @loop="onLoop">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresGridHelper :args="[10, 10]" />
    <Fbo
      ref="fboRef"
      :depth="false"
      :settings="{ samples: 1 }"
    />
    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />

      <TresMeshBasicMaterial
        :color="0xFFFFFF"
        :map="fboRef?.instance?.texture ?? null"
      />
    </TresMesh>

    <TresMesh
      ref="torusRef"
      :position="[3, 0, 0]"
    >
      <TresTorusGeometry :args="[1, 0.5, 16, 100]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
