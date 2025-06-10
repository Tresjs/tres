<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

function onClick(ev: ThreeEvent<MouseEvent>) {
  console.log('click', ev)
  ev.object.material.color.set('#008080')
}

function onDoubleClick(ev: ThreeEvent<MouseEvent>) {
  console.log('doubleclick', ev)
  ev.object.material.color.set('#FFD700')
}

function onPointerEnter(ev: ThreeEvent<MouseEvent>) {
  console.log('pointerenter', ev)
  ev.object.material.color.set('#CCFF03')
}

function onPointerLeave(ev: ThreeEvent<MouseEvent>) {
  console.log('pointerleave', ev)
  ev.object.material.color.set('#efefef')
}

function onPointerMove(ev: ThreeEvent<MouseEvent>) {
  // console.log('pointer-move', ev)
}

function onContextMenu(ev: ThreeEvent<MouseEvent>) {
  console.log('contextmenu', ev)
  ev.object.material.color.set('#FF4500')
}

function onPointerMissed(ev: ThreeEvent<MouseEvent>) {
  console.log('pointermissed', ev)
}
</script>

<template>
  <TresLeches />
  <TresCanvas
    window-size
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <template v-for="(x, xIndex) in [-2.5, 0, 2.5]">
      <template v-for="(y, yIndex) in [-2.5, 0, 2.5]">
        <TresMesh
          v-for="(z, zIndex) in [-2.5, 0, 2.5]"
          :key="`${[x, y, z]}`"
          :position="[x, y, z]"
          :name="`box-${[xIndex, yIndex, zIndex].join('-')}`"
          @click="onClick"
          @doubleclick="onDoubleClick"
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
