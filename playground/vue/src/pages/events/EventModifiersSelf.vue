<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { ThreeEvent, TresCanvas } from '@tresjs/core'
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

function onErrorIfNotSelf(name: DomEventName, e: ThreeEvent<any>) {
  console.log(e.object, e.eventObject)
  if (e.object !== e.eventObject) { error[name] = true }
}

function fn(name: DomEventName) {
  called[name] = true
}
</script>

<template>
  <OverlayInfo>
    <h2>Event Modifiers: self</h2>
    <p>Tres supports the Vue event modifier <code>self</code></p>
    <p>E.g.: <code>@click.self="..."</code></p>
    <h2>Tests</h2>
    <p>Interact with the 3D object. It has all supported pointer events + <code>self</code>. If events are passed to the containing TresGroup, an error will appear below.</p>
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
      @click.self="(e) => onErrorIfNotSelf('click', e)"
      @dblclick.self="(e) => onErrorIfNotSelf('dblclick', e)"
      @wheel.self="(e) => onErrorIfNotSelf('wheel', e)"
      @contextmenu.self="(e) => onErrorIfNotSelf('contextmenu', e)"
      @pointerup.self="(e) => onErrorIfNotSelf('pointerup', e)"
      @pointerdown.self="(e) => onErrorIfNotSelf('pointerdown', e)"
      @pointerenter.self="(e) => onErrorIfNotSelf('pointerenter', e)"
      @pointerleave.self="(e) => onErrorIfNotSelf('pointerleave', e)"
      @pointerover.self="(e) => onErrorIfNotSelf('pointerover', e)"
      @pointerout.self="(e) => onErrorIfNotSelf('pointerout', e)"
      @pointermove.self="(e) => onErrorIfNotSelf('pointermove', e)"
      @pointermissed.self="(e) => onErrorIfNotSelf('pointermissed', e)"

      @click="fn('click')"
      @dblclick="fn('dblclick')"
      @wheel="fn('wheel')"
      @contextmenu="fn('contextmenu')"
      @pointerup="fn('pointerup')"
      @pointerdown="fn('pointerdown')"
      @pointerenter="fn('pointerenter')"
      @pointerleave="fn('pointerleave')"
      @pointerover="fn('pointerover')"
      @pointerout="fn('pointerout')"
      @pointermove="fn('pointermove')"
      @pointermissed="fn('pointermissed')"
    >
      <TresMesh>
        <TresSphereGeometry />
        <TresMeshToonMaterial color="#efefef" />
      </TresMesh>
    </TresGroup>

    <TresDirectionalLight :intensity="1" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
