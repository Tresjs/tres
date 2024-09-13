<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import type { DomEventName } from '../../../../../src/utils/createEventManager/const'

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const called = reactive<Partial<Record<DomEventName, boolean>>>({
  click: false,
  contextmenu: false,
  dblclick: false,
  pointerdown: false,
  pointerup: false,
  pointermove: false,
  pointerover: false,
  pointerout: false,
  pointerenter: false,
  pointerleave: false,
  pointermissed: false,
  wheel: false,
})

const error = reactive<Partial<Record<DomEventName, boolean>>>({
  click: false,
  contextmenu: false,
  dblclick: false,
  pointerdown: false,
  pointerup: false,
  pointermove: false,
  pointerover: false,
  pointerout: false,
  pointerenter: false,
  pointerleave: false,
  pointermissed: false,
  wheel: false,
})

function onError(name: DomEventName) {
  error[name] = true
}

function fn(name: DomEventName) {
  called[name] = true
}
</script>

<template>
  <OverlayInfo>
    <h2>Event Modifiers: stop</h2>
    <p>Tres supports the Vue event modifier <code>stop</code></p>
    <p>E.g.: <code>@click.stop="..."</code></p>
    <h2>Tests</h2>
    <p>Interact with the 3D object. It has all supported pointer events + <code>stop</code>. If events are passed to the containing TresGroup, an error will appear below.</p>
    <p v-for="domName of Object.keys(called)" :key="domName">
      <span v-if="error[domName as DomEventName]">❌</span>
      <span v-else-if="called[domName as DomEventName]">✅</span>
      <span v-else> </span>
      {{ domName }}
    </p>
    <p v-if="Object.values(called).every(b => b) && Object.values(error).every(b => !b)"><strong>✅ All tests pass</strong></p>
  </OverlayInfo>
  <TresCanvas
    window-size
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresGroup
      @click="onError('click')"
      @dblclick="onError('dblclick')"
      @wheel="onError('wheel')"
      @contextmenu="onError('contextmenu')"
      @pointerup="onError('pointerup')"
      @pointerdown="onError('pointerdown')"
      @pointerenter="onError('pointerenter')"
      @pointerleave="onError('pointerleave')"
      @pointerover="onError('pointerover')"
      @pointerout="onError('pointerout')"
      @pointermove="onError('pointermove')"
      @pointermissed="onError('pointermissed')"
    >
      <TresMesh
        @click.stop="fn('click')"
        @dblclick.stop="fn('dblclick')"
        @wheel.stop="fn('wheel')"
        @contextmenu.stop="fn('contextmenu')"
        @pointerup.stop="fn('pointerup')"
        @pointerdown.stop="fn('pointerdown')"
        @pointerenter.stop="fn('pointerenter')"
        @pointerleave.stop="fn('pointerleave')"
        @pointerover.stop="fn('pointerover')"
        @pointerout.stop="fn('pointerout')"
        @pointermove.stop="fn('pointermove')"
        @pointermissed.stop="fn('pointermissed')"
      >
        <TresSphereGeometry />
        <TresMeshToonMaterial color="#efefef" />
      </TresMesh>
    </TresGroup>

    <TresDirectionalLight :intensity="1" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
