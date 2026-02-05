<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas, type TresPointerEvent } from '@tresjs/core'
import { TresLeches } from '@tresjs/leches'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const uuid = 'core-events-index'

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

function onClick(ev: TresPointerEvent) {
  console.log('click', ev)
  ev.object.material.color.set('#008080')
}

function onDoubleClick(ev: TresPointerEvent) {
  console.log('doubleclick', ev)
  ev.object.material.color.set('#FFD700')
}

function onPointerEnter(ev: TresPointerEvent) {
  console.log('pointerenter', ev)
  ev.object.material.color.set('#CCFF03')
}

function onPointerLeave(ev: TresPointerEvent) {
  console.log('pointerleave', ev)
  ev.object.material.color.set('#efefef')
}

// eslint-disable-next-line unused-imports/no-unused-vars
function onPointerMove(ev: TresPointerEvent) {
  // console.log('pointer-move', ev)
}

function onContextMenu(ev: TresPointerEvent) {
  console.log('contextmenu', ev)
  ev.object.material.color.set('#FF4500')
}

function onPointerMissed(ev: TresPointerEvent) {
  console.log('pointermissed', ev)
}
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    window-size
    v-bind="gl"
    @pointermissed="onPointerMissed"
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
          @dblclick="onDoubleClick"
          @pointerenter="onPointerEnter"
          @pointerleave="onPointerLeave"
          @pointermove="onPointerMove"
          @contextmenu="onContextMenu"
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
