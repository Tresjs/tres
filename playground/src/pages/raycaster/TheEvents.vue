<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import { OrbitControls } from '@tresjs/cientos'
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
  console.log('click', ev)
  if (stopPropagation.value) ev.stopPropagation()
  ev.object.material.color.set('#008080')
}

function onDoubleClick(ev: ThreeEvent<MouseEvent>) {
  console.log('double-click', ev)
  if (stopPropagation.value) ev.stopPropagation()
  ev.object.material.color.set('#FFD700')
}

function onPointerEnter(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) ev.stopPropagation()
  ev.object.material.color.set('#CCFF03')
}

function onPointerLeave(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) ev.stopPropagation()
  /*  ev.object.material.color.set('#efefef') */
}

function onPointerMove(ev: ThreeEvent<MouseEvent>) {
  if (stopPropagation.value) ev.stopPropagation()
}

function onContextMenu(ev: ThreeEvent<MouseEvent>) {
  console.log('context-menu', ev)
  if (stopPropagation.value) ev.stopPropagation()
  ev.object.material.color.set('#FF4500')
}

function onPointerMissed(ev: ThreeEvent<MouseEvent>) {
  console.log('pointer-missed', ev)
  if (stopPropagation.value) ev.stopPropagation()
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
    <template v-for="x in [-2.5, 0, 2.5]">
      <template v-for="y in [-2.5, 0, 2.5]">
        <TresMesh
          v-for="z in [-2.5, 0, 2.5]"
          :key="`${[x, y, z]}`"
          :position="[x, y, z]"
          @click="onClick"
          @double-click="onDoubleClick"
          @pointer-enter="onPointerEnter"
          @pointer-leave="onPointerLeave"
          @pointer-move="onPointerMove"
          @context-menu="onContextMenu"
          @pointer-missed="onPointerMissed"
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
