<script lang="ts" setup>
import type { Ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

import { DepthOfField, EffectComposer } from '@tresjs/post-processing'
import { computed } from 'vue'

import '@tresjs/leches/styles'

useControls('fpsgraph')
const controls = useControls({
  focusDistance: {
    value: 0.001,
    min: 0,
    max: 0.1,
    step: 0.0001,
  },
  worldFocusDistance: {
    value: 3.8,
    min: 0,
    max: 10,
    step: 0.001,
  },
  worldFocusRange: {
    value: 0.1,
    min: 0,
    max: 1,
    step: 0.001,
  },
  bokehScale: {
    value: 10,
    min: 1,
    max: 15,
    step: 0.01,
  },
  focusRange: {
    value: 0.0018,
    min: 0,
    max: 1,
    step: 0.001,
  },
}) as { [key: string]: Ref<{ value: number }> }

const effectParams = computed(() =>
  Object
    .entries(controls)
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.value.value })
      , {},
    ),
)
</script>

<template>
  <TresLeches />
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[5, 2, 1]"
      :look-at="[0, 1, 2]"
    />
    <OrbitControls />
    <template
      v-for="i in 5"
      :key="i"
    >
      <TresMesh :position="[i * 1.1 - 2.8, 1, 0]">
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshNormalMaterial />
      </TresMesh>
    </template>
    <TresGridHelper />

    <EffectComposer>
      <DepthOfField
        v-bind="effectParams"
      />
    </EffectComposer>
  </TresCanvas>
</template>
