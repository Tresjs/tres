<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ThreeEvent, TresContext } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#202020',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

function onClick(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material?.color.set('#008080')
}

function onDoubleClick(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#FFAA00')
}

function onPointerEnter(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#CCFF03')
}

function onPointerLeave(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#efefef')
}

function onPointerMove(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#F00')
}

function onContextMenu(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#FF4500')
}

function onPointerMissed(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#000000')
}

function onWheel(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#FFFF00')
}

const defaultConnecter = (target: EventTarget, eventHandler: EventListener) => {
  const POINTER_EVENT_NAMES = ['wheel', 'click', 'pointermove', 'pointerup', 'pointerdown', 'contextmenu', 'dblclick']
  for (const domEventName of POINTER_EVENT_NAMES) {
    target.addEventListener(domEventName, eventHandler)
  }

  return {
    disconnect: () => {
      for (const domEventName of POINTER_EVENT_NAMES) {
        target.removeEventListener(domEventName, eventHandler)
      }
    },
  }
}

const CONNECTERS: Record<string, (eventTarget: HTMLElement, handler: EventListener) => ({ disconnect: () => void })> = {
  'default': defaultConnecter,
  'click': (eventTarget, handler) => {
    eventTarget.addEventListener('click', handler)
    return { disconnect: () => { eventTarget.removeEventListener('click', handler) } }
  },
  'dblclick, wheel': (eventTarget, handler) => {
    eventTarget.addEventListener('dblclick', handler)
    eventTarget.addEventListener('wheel', handler)
    return { disconnect: () => {
      eventTarget.removeEventListener('dblclick', handler)
      eventTarget.removeEventListener('wheel', handler)
    } }
  },
}

const CONNECTER_IDS = Object.keys(CONNECTERS)
const connecterIdRef = ref<keyof typeof CONNECTERS>('default')

const eventsFns = {
  connect: CONNECTERS[connecterIdRef.value],
}

type DisconnectFn = () => void
type ConnectFn = (target: HTMLElement) => void

let events: {
  connect: ConnectFn
  disconnect: DisconnectFn
  target: HTMLElement
} | null = null

function onChangeConnecterId(id: keyof typeof CONNECTERS) {
  if (!events) { return }
  const target = events.target
  events.disconnect()
  connecterIdRef.value = id
  eventsFns.connect = CONNECTERS[connecterIdRef.value]
  events.connect(target)
}

function ready(ctx: TresContext) {
  events = ctx.events
}
</script>

<template>
  <OverlayInfo>
    <h1><code>connect</code></h1>
    <p>By default, the <code>Events</code> system will listen for DOM events emitted from the canvas. But if you don't need some of those events – particularly <code>pointermove</code>, you can get extra performance by not listening for them.</p>
    <p>:events has a settable <code>connect</code> function.</p>
    <code>&lt;TresCanvas :events="{connect: ...}" /&gt;</code>
    <hr />
    <h2>Example <code>connect</code></h2>
    <p><strong>Select a connector function below (see function implementation in the Vue playground file) and then interact with the on-screen objects to see its effect.</strong></p>
    <div v-for="id of CONNECTER_IDS" :key="id">
      <input :id="id" :checked="id === connecterIdRef" type="radio" name="target" @change="() => onChangeConnecterId(id)" />
      <label :for="id">{{ id }}</label>
    </div>
    <hr />
    <h2>NOTE</h2>
    <p>The <code>:events</code> prop is not reactive. But if you have a reference to it, you can redefine functions, which will then be called at some later point during the lifecycle.</p>
    <p><code>connect</code> is not designed to be changed on the fly. To do so, as we have done here, you will have to get a handle on <code>context.events</code> and call <code>disconnect</code>, then <code>connect</code>.</p>
  </OverlayInfo>
  <TresCanvas
    window-size
    v-bind="gl"
    :events="eventsFns"
    @ready="ready"
  >
    <TresPerspectiveCamera
      :position="[15, 15, 15]"
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
          @dblclick="onDoubleClick"
          @pointerenter="onPointerEnter"
          @pointerleave="onPointerLeave"
          @pointermove="onPointerMove"
          @contextmenu="onContextMenu"
          @pointermissed="onPointerMissed"
          @wheel="onWheel"
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
