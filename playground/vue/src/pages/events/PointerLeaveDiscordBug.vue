<script setup lang="ts">
import { BasicShadowMap, NoToneMapping } from 'three'
import { reactive } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

function onClick(ev) {
  if (ev) {
    ev.stopPropagation?.()
    ev.object.material.color.set('#008080')
  }
}

function onPointerEnter(ev) {
  if (ev) {
    ev.stopPropagation?.()
    ev.object.material.color.set('#FF0000')
  }
}

function onPointerLeave(ev) {
  if (ev) {
    ev.stopPropagation?.()
    console.log('leave')
    ev.object.material.color.set('#efefef')
  }
}
</script>

<template>
  <OverlayInfo>
    <h1><code>pointerleave</code> bug (Discord)</h1>
    <p>This is reproduction of a Tres core v4 bug, <a href="https://discord.com/channels/1047126995424780288/1101057616324603914/1333787816655589503">reported here</a>. <a href="https://stackblitz.com/edit/tresjs-events-chwfs2oz?file=src%2Fcomponents%2FTheExperience.vue">Stackblitz</a>.</p>
    <h2>Bug</h2>
    <p>The bug manifests when 2 objects have "pointerenter", then the object that is "behindest" is "left". That object's "pointerleave" is not called in v4, but should be called. (And is called!)</p>
  </OverlayInfo>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <OrbitControls />
    <TresDirectionalLight
      :position="[0, 8, 4]"
      :intensity="0.2"
      cast-shadow
    />
    <template v-for="x in [-2.5, 0, 2.5]">
      <template v-for="y in [-2.5, 0, 2.5]">
        <TresMesh
          v-for="z in [-2.5, 0, 2.5]"
          :key="[x, y, z]"
          :position="[x, y, z]"
          @click="onClick"
          @pointer-enter="onPointerEnter"
          @pointer-leave="onPointerLeave"
        >
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="#efefef" />
        </TresMesh>
      </template>
    </template>
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
