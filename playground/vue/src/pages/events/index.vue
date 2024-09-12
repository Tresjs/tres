<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls, StatsGl } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import type { ThreeEvent } from '@tresjs/core'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { stopPropagation } = useControls({
  stopPropagation: false,
})

function onClick(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) { ev.stopPropagation() }
  ev.eventObject.material?.color.set('#008080')
}

function onDoubleClick(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) { ev.stopPropagation() }
  ev.eventObject.material.color.set('#FFD700')
}

function onPointerEnter(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) { ev.stopPropagation() }
  ev.eventObject.material.color.set('#CCFF03')
}

function onPointerLeave(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) { ev.stopPropagation() }
  ev.eventObject.material.color.set('#efefef')
}

function onPointerMove(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) { ev.stopPropagation() }
}

function onContextMenu(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) { ev.stopPropagation() }
  ev.eventObject.material.color.set('#FF4500')
}

function onPointerMissed(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) { ev.stopPropagation() }
  ev.eventObject.material.color.set('#000000')
}
</script>

<template>
  <TresLeches />
  <TresCanvas
    window-size
    v-bind="gl"
  >
    <Suspense>
      <StatsGl />
    </Suspense>
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <template v-for="x in [-2.5, 0, 2.5]">
      <template v-for="y in [-2.5, 0, 2.5]">
        <TresMesh
          v-for="z in [-2.5, 0, 2.5]"
          :key="`${[x, y, z]}`"
          :position="[x, y, z]"
          @click="onClick"
          @dblclick="onDoubleClick"
          @pointerenter="onPointerEnter"
          @pointerleave="onPointerLeave"
          @pointermove="onPointerMove"
          @contextmenu="onContextMenu"
          @pointermissed="onPointerMissed"
        >
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="#efefef" />
        </TresMesh>
      </template>
    </template>
    <TresDirectionalLight :intensity="1" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
