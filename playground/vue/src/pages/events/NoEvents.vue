<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, Color, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const msgs = ref<string[]>([])
let n = 0

function logError(ev: ThreeEvent<any>) {
  n++
  console.error(`❌ An event handler was called unexpectedly.`)
  msgs.value.push(`❌ An event handler was called unexpectedly.`)
  while (msgs.value.length > 10) { msgs.value.shift() }
  ev.eventObject.material.color = new Color(Math.random(), Math.random(), Math.random())
}
</script>

<template>
  <OverlayInfo>
    <h1>No Events</h1>
    <p>If you don't need events, you can avoid most of the event system's overhead as follows:</p>
    <p><code>&lt;TresCanvas :events="null" /&gt;</code></p>

    <h2>Setup</h2>
    <p>This scene has objects with event handlers. But they don't do anything.</p>

    <p v-if="msgs.length === 0">✅ No event handlers called yet.</p>
    <ul>
      <li v-for="msg, i of msgs" :key="i" :style="{ color: (n - i) % 4 === 0 ? 'gray' : 'black' }">{{ msg }}</li>
    </ul>

    <h2>NOTE</h2>
    <p>Controls like `OrbitControls` still work even if `:events="[falsy]"`.</p>
  </OverlayInfo>
  <TresCanvas
    window-size
    v-bind="gl"
    :events="null"
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
          @click="logError"
          @dblclick="logError"
          @pointerenter="logError"
          @pointerleave="logError"
          @pointermove="logError"
          @contextmenu="logError"
          @pointermissed="logError"
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
