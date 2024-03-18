<!-- eslint-disable no-console -->
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

function onClick(ev) {
  if (ev) {
    ev.object.material.color.set('#008080')
  }
}

function onPointerEnter(ev) {
  if (ev) {
    ev.object.material.color.set('#CCFF03')
  }
}

function onPointerLeave(ev) {
  if (ev) {
    /*  ev.object.material.color.set('#efefef') */
  }
}

function onPointerMove(ev) {
  if (ev) {
    console.log(ev)
  }
}

const visible = ref(true)
</script>

<template>
  <button @click="visible = !visible"></button>
  <div v-if="visible">
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
            @pointer-enter="onPointerEnter"
            @pointer-leave="onPointerLeave"
            @pointer-move="onPointerMove"
          >
            <TresBoxGeometry :args="[1, 1, 1]" />
            <TresMeshToonMaterial color="#efefef" />
          </TresMesh>
        </template>
      </template>
      <TresDirectionalLight :intensity="1" />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>
