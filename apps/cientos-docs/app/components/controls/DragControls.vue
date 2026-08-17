<!-- eslint-disable no-console -->
<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { DragControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import type { DragControls as ThreeDragControls } from 'three/examples/jsm/Addons.js'
import { useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const uuid = inject(`uuid`)
const boxRef = shallowRef()
const sphereRef = shallowRef()

const { lock, enabled, dragLimitsMin, dragLimitsMax } = useControls({
  lock: {
    options: ['x', 'y', 'z', 'none'],
    value: 'none',
  },
  enabled: true,
  dragLimitsMax: {
    value: 5,
    min: 1,
    max: 7,
    step: 1,
  },
  dragLimitsMin: {
    value: -5,
    min: -7,
    max: -1,
    step: 1,
  },
}, { uuid })

function onDrag(_e: ThreeDragControls) {
  if (!boxRef.value) { return }
  const snap = 0.5
  const pos = boxRef.value.position
  pos.x = Math.round(pos.x / snap) * snap
  pos.z = Math.round(pos.z / snap) * snap
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 7.5, 7.5]" :look-at="[0, 0, 0]" />
    <TresMesh ref="boxRef" :position="[0.5, 0.5, 0.5]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial />
    </TresMesh>
    <TresMesh ref="sphereRef" :position="[4, 0, 0]">
      <TresSphereGeometry />
      <TresMeshStandardMaterial />
    </TresMesh>
    <TresDirectionalLight :position="[0, 10, 0]" :intensity="1.5" />
    <TresAmbientLight :intensity="0.25" />
    <DragControls
      :objects="[sphereRef]"
      :lock="lock"
      :enabled="enabled"
      :dragLimits="[[dragLimitsMin, dragLimitsMax], [dragLimitsMin, dragLimitsMax], [dragLimitsMin, dragLimitsMax]]"
    />
    <DragControls
      :objects="[boxRef]"
      :drag-limits="[[-4.5, 4.5], undefined, [-4.5, 4.5]]"
      lock="y"
      @drag="onDrag"
    />
    <TresGridHelper :args="[10, 20]" />
  </TresCanvas>
</template>
