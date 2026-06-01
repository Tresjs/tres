<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer } from '@tresjs/post-processing'

withDefaults(defineProps<{
  wireframe?: boolean
  renderMode?: 'always' | 'on-demand' | 'manual'
}>(), {
  wireframe: false,
  renderMode: 'on-demand',
})
</script>

<template>
  <TresCanvas :render-mode="renderMode">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresMesh
      :position="[-3.5, 1, 0]"
    >
      <TresConeGeometry :args="[1.25, 2, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshNormalMaterial :wireframe="wireframe" />
    </TresMesh>

    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshNormalMaterial :wireframe="wireframe" />
    </TresMesh>

    <TresMesh :position="[3.5, 1, 0]">
      <TresSphereGeometry />
      <TresMeshNormalMaterial :wireframe="wireframe" />
    </TresMesh>

    <TresGridHelper />
    <EffectComposer>
      <slot name="effects"></slot>
    </EffectComposer>
  </TresCanvas>
</template>
