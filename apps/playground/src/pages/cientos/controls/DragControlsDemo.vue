<!-- eslint-disable no-console -->
<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { DragControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import type { DragControls as ThreeDragControls } from 'three/examples/jsm/Addons.js'
import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef = shallowRef()
const sphereRef = shallowRef()
const controlsRef = shallowRef<InstanceType<typeof DragControls> | null>(null)

const { lock, enabled, dragLimitsMin, dragLimitsMax } = useControls({
  lock: {
    options: ['x', 'y', 'z', 'none'],
    value: 'none',
  },
  enabled: true,
  dragLimitsMax: {
    value: 3,
    min: 1,
    max: 5,
    step: 1,
  },
  dragLimitsMin: {
    value: -3,
    min: -5,
    max: -1,
    step: 1,
  },
})

watch(
  () => controlsRef.value?.instance,
  (newVal) => {
    if (newVal) {
      console.log('instance', newVal)
    }
  },
)

function onDragStart(e: ThreeDragControls) {
  console.log('dragstart', e)
}

function onDrag(_e: ThreeDragControls) {
  if (!boxRef.value) { return }
  const snap = 0.5
  const pos = boxRef.value.position
  pos.x = Math.round(pos.x / snap) * snap
  pos.z = Math.round(pos.z / snap) * snap
}

function onDragEnd(e: ThreeDragControls) {
  console.log('dragend', e)
}

function onHoverOn(e: ThreeDragControls) {
  console.log('hoveron', e)
}

function onHoverOff(e: ThreeDragControls) {
  console.log('hoveroff', e)
}
</script>

<template>
  <TresLeches />
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
      ref="controlsRef"
      :objects="[sphereRef]"
      :lock="lock"
      :enabled="enabled"
      :dragLimits="[[dragLimitsMin, dragLimitsMax], [dragLimitsMin, dragLimitsMax], [dragLimitsMin, dragLimitsMax]]"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @hoveron="onHoverOn"
      @hoveroff="onHoverOff"
    />
    <DragControls
      ref="controlsRef"
      :objects="[boxRef]"
      :drag-limits="[[-4.5, 4.5], undefined, [-4.5, 4.5]]"
      lock="y"
      @drag="onDrag"
    />
    <TresGridHelper :args="[10, 20]" />
  </TresCanvas>
</template>
