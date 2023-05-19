<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { reactive } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

function onClick(ev) {
  if (ev) {
    console.log('click', ev)
    ev.object.material.color.set('#008080')
  }
}

function onPointerEnter(ev) {
  if (ev) {
    console.log('enter', ev)
    ev.object.material.color.set('#DFFF45')
  }
}

function onPointerMove(ev) {
  if (ev) {
    console.log('move', ev)
  }
}

function onPointerLeave(ev) {
  if (ev) {
    console.log('leave', ev)
    /*  ev.object.material.color.set('#efefef') */
  }
}
</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera :position="[11, 11, 11]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />

    <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.2" cast-shadow />
    <template v-for="x in [-2.5, 0, 2.5]">
      <template v-for="y in [-2.5, 0, 2.5]">
        <TresMesh
          v-for="z in [-2.5, 0, 2.5]"
          :key="[x, y, z]"
          :position="[x, y, z]"
          @click="onClick"
          @pointer-enter="onPointerEnter"
          @pointer-leave="onPointerLeave"
          @pointer-move="onPointerMove"
        >
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="#efefef" />
        </TresMesh>
      </template>
    </template>
    <OrbitControls />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
