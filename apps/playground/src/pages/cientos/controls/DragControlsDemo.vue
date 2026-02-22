<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { DragControls } from '@tresjs/cientos'
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
      // eslint-disable-next-line no-console
      console.log('instance', newVal)
    }
  },
)

function onDragStart(_: any) {
  // console.log('hover', event)
}

function onDrag(_: any) {
  // console.log('drag', event)
}

function onDragEnd(_: any) {
  // console.log('dragend', event)
}

function onHoverOn(_: any) {
  // console.log('hoveron', event)
}

function onHoverOff(_: any) {
  // console.log('hoveroff', event)
}
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 7.5, 7.5]" :look-at="[0, 0, 0]" />
    <TresMesh ref="boxRef">
      <TresBoxGeometry />
      <TresMeshBasicMaterial />
    </TresMesh>
    <TresMesh ref="sphereRef" :position="[4, 0, 0]">
      <TresSphereGeometry />
      <TresMeshBasicMaterial />
    </TresMesh>
    <DragControls
      ref="controlsRef"
      :objects="[boxRef, sphereRef]"
      :lock="lock"
      :enabled="enabled"
      :dragLimits="[[dragLimitsMin, dragLimitsMax], [dragLimitsMin, dragLimitsMax], [dragLimitsMin, dragLimitsMax]]"
      @dragstart="onDragStart"
      @drag="onDrag"
      @dragend="onDragEnd"
      @hoveron="onHoverOn"
      @hoveroff="onHoverOff"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
