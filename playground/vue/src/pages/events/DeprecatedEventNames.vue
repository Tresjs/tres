<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import type { ThreeEvent } from '@tresjs/core'
import '@tresjs/leches/styles'

function onClick(ev: ThreeEvent<MouseEvent>) {
  console.log('click', ev)
  ev.eventObject.material.color.set('#008080')
}

function onDoubleClick(ev: ThreeEvent<MouseEvent>) {
  console.log('double-click', ev)
  ev.eventObject.material.color.set('#FFD700')
}

function onPointerEnter(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#CCFF03')
}

function onPointerLeave(ev: ThreeEvent<MouseEvent>) {
  console.log('pointer-leave', ev)
}

function onPointerMove(ev: ThreeEvent<MouseEvent>) {
  console.log('pointer-move', ev)
}

function onContextMenu(ev: ThreeEvent<MouseEvent>) {
  console.log('context-menu', ev)
  ev.eventObject.material.color.set('#FF4500')
}

function onPointerMissed(ev: ThreeEvent<MouseEvent>) {
  console.log('pointer-missed', ev)
  ev.eventObject.material.color.set('#000')
}
</script>

<template>
  <OverlayInfo>
    <h1>Deprecated event names</h1>
    <h2>Setup</h2>
    <p>This scene contains TresObjects with deprecated event names.</p>
    <p>Regardless, interacting with the objects should trigger their handlers. (They will change colors and log to the console.)</p>
    <h2>Background</h2>
    <p>Vue event names are written like:</p>
    <p><strong><code>@</code> + DOM event name</strong>, e.g. <code>@pointerdown</code></p>
    <p>DOM events names are typically, but not always, written in <a href="https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats">flatcase</a>.</p>
    <p>Through Tres v4.x, Tres' multiple-word event names were written in <a href="https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats">kebab-case</a>, e.g. <code>@pointer-down</code>.</p>
    <p>Now Tres has adopted the Vue naming convention for supported events.</p>
    <p>Old-style hyphenated events will still respond, though they will generate a console warning in dev mode the first time they're encountered in a scene.</p>
    <p>The developper should take care not to mix hyphenated and non-hyphenated event names.</p>
  </OverlayInfo>
  <TresCanvas
    window-size
    clear-color="gray"
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
