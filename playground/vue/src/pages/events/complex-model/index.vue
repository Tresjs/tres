<script setup lang="ts">
/* eslint-disable no-console */
import { OrbitControls } from '@tresjs/cientos'
import {
  TresCanvas,
} from '@tresjs/core'
import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import Character from './Character.vue'
import ComplexModel from './ComplexModel.vue'

const box = new Mesh(new BoxGeometry(1, 1, 1), new MeshNormalMaterial())
box.position.set(4, 0, 0)
useControls('fpsgraph')

const handleClick = (e: PointerEvent) => {
  console.log('clicked', e)
}

const handlePointerEnter = (e: PointerEvent) => {
  console.log('pointer-enter', e)
}

const handlePointerLeave = (e: PointerEvent) => {
  console.log('pointer-leave', e)
}
/* eslint-enable no-console */
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#202020">
    <TresPerspectiveCamera
      :position="[6, 6, 6]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <Suspense>
      <Character />
    </Suspense>
    <Suspense>
      <ComplexModel />
    </Suspense>
    <primitive
      :object="box"
      @click="handleClick"
      @pointer-enter="handlePointerEnter"
      @pointer-leave="handlePointerLeave"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
