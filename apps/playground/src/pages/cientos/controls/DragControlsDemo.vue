<!-- eslint-disable no-console -->
<script setup lang="ts">
import { shallowRef } from 'vue'
import { DragControls, OrbitControls } from '@tresjs/cientos'
import type { DragControlsEvent } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef = shallowRef()
const sphereRef = shallowRef()

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

function onDragStart({ object }: DragControlsEvent) {
  console.log('dragstart', object)
}

function onDrag({ object }: DragControlsEvent) {
  const snap = 0.5
  object.position.x = Math.round(object.position.x / snap) * snap
  object.position.z = Math.round(object.position.z / snap) * snap
}

function onDragEnd({ object }: DragControlsEvent) {
  console.log('dragend', object)
}

function onHoverOn({ object }: DragControlsEvent) {
  console.log('hoveron', object)
}

function onHoverOff({ object }: DragControlsEvent) {
  console.log('hoveroff', object)
}
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 7.5, 7.5]" :look-at="[0, 0, 0]" />
    <OrbitControls make-default />
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
      :drag-limits="[[dragLimitsMin, dragLimitsMax], [dragLimitsMin, dragLimitsMax], [dragLimitsMin, dragLimitsMax]]"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @hoveron="onHoverOn"
      @hoveroff="onHoverOff"
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
