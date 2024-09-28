<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import '@tresjs/leches/styles'

const msgs0 = ref(['Mouse over cube'])
const msgs1 = ref(['Mouse over sphere'])
const msgs2 = ref<string[]>([])
const MAX_NUM_MSGS = 10

const getColor = (i: number) => i % 5 === 0 ? 'gray' : 'black'

let [n0, n1, n2, n3] = [0, 0, 0, 0]

const unshiftMsg0 = (...msg: string[]) => {
  n0++
  msgs0.value.unshift(msg.join(', '))
  while (msgs0.value.length > MAX_NUM_MSGS) {
    msgs0.value.pop()
  }
}

const unshiftMsg1 = (...msg: string[]) => {
  n1++
  msgs1.value.unshift(msg.join(', '))
  while (msgs1.value.length > MAX_NUM_MSGS) {
    msgs1.value.pop()
  }
}

const unshiftMsg2 = (...msg: string[]) => {
  n2++
  msgs2.value.unshift(msg.join(', '))
  while (msgs2.value.length > MAX_NUM_MSGS) {
    msgs2.value.pop()
  }
}

const unshiftMsgError = (...msg: string[]) => {
  n3++
  msgs2.value.unshift(msg.join(', '))
  while (msgs2.value.length > MAX_NUM_MSGS) {
    msgs2.value.pop()
  }
}

function fnStopPropagation(e: ThreeEvent<any>, handlerName: string) {
  e.stopPropagation()
  unshiftMsg0('✅ stopped', handlerName)
}

function fnStopEventModifier(e: ThreeEvent<any>, handlerName: string) {
  unshiftMsg1('✅ stopped', handlerName)
}

function fnError(e: ThreeEvent<any>, handlerName: string) {
  unshiftMsgError('❌ NOT STOPPED', handlerName, `${e.object?.name ?? 'none'} => ${e.eventObject.name}`)
}

function fnOkNotBubbled(e: ThreeEvent<any>, handlerName: string) {
  unshiftMsg2('✅ heard, not bubbled', handlerName)
}
</script>

<template>
  <OverlayInfo>
    <h1>Stop propagation</h1>
    <h2>Setup</h2>
    <p>
      In this scene, there is:
    </p>
    <ul>
      <li>TresGroup "Listener"</li>
      <li>- TresGroup "Stopper" with `event.stopPropagation()`</li>
      <li>-- TresMesh</li>
      <li>- TresMesh "Emitter with event modifier `.stop`"</li>
    </ul>
    <p>
      Interacting with either Mesh causes events to be fired. But the events should be stopped (if they are bubbled) before propagating to "Listener".
    </p>
    <hr />
    <h3>Event messages from listener</h3>
    <p v-if="!n3">✅ No errors yet.</p>
    <ul><li v-for="msg, i of msgs2" :key="i" :style="{ color: getColor(n2 - i) }">{{ msg }}</li></ul>
    <hr />
    <h3>`.stop` event modifier Messages (from sphere events)</h3>
    <ul><li v-for="msg, i of msgs1" :key="i" :style="{ color: getColor(n1 - i) }">{{ msg }}</li></ul>
    <hr />
    <h3>`event.stopPropagation` Messages (from cube events)</h3>
    <ul><li v-for="msg, i of msgs0" :key="i" :style="{ color: getColor(n0 - i) }">{{ msg }}</li></ul>
    <hr />
    <h4>Note</h4>
    <p>@pointermissed will only be heard by a single "stopper" because the event is stopped before being handled by another object.</p>
  </OverlayInfo>
  <TresCanvas
    window-size
    clear-color="gray"
  >
    <TresPerspectiveCamera
      :position="[0, -8, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresGroup
      name="listener"
      @click="(e) => fnError(e, '@click')"
      @contextmenu="(e) => fnError(e, '@contextmenu')"
      @dblclick="(e) => fnError(e, '@dblclick')"
      @pointerenter="(e) => fnOkNotBubbled(e, '@pointerenter')"
      @pointerleave="(e) => fnOkNotBubbled(e, '@pointerleave')"
      @pointerover="(e) => fnError(e, '@pointerover')"
      @pointerout="(e) => fnError(e, '@pointerout')"
      @pointermove="(e) => fnError(e, '@pointermove')"
      @pointerdown="(e) => fnError(e, '@pointerdown')"
      @pointerup="(e) => fnError(e, '@pointerup')"
      @pointermissed="(e) => fnOkNotBubbled(e, '@pointermissed')"
      @wheel="(e) => fnError(e, '@wheel')"
    >
      <TresMesh
        name="Sphere"
        :position-y="1"
        @click.stop="(e) => fnStopEventModifier(e, '@click.stop')"
        @contextmenu.stop="(e) => fnStopEventModifier(e, '@contextmenu.stop')"
        @dblclick.stop="(e) => fnStopEventModifier(e, '@dblclick.stop')"
        @pointerenter.stop="(e) => fnStopEventModifier(e, '@pointerenter.stop')"
        @pointerleave.stop="(e) => fnStopEventModifier(e, '@pointerleave.stop')"
        @pointerover.stop="(e) => fnStopEventModifier(e, '@pointerover.stop')"
        @pointerout.stop="(e) => fnStopEventModifier(e, '@pointerout.stop')"
        @pointermove.stop="(e) => fnStopEventModifier(e, '@pointermove.stop')"
        @pointerdown.stop="(e) => fnStopEventModifier(e, '@pointerdown.stop')"
        @pointerup.stop="(e) => fnStopEventModifier(e, '@pointerup.stop')"
        @pointermissed.stop="(e) => fnStopEventModifier(e, '@pointermissed.stop')"
        @wheel.stop="(e) => fnStopEventModifier(e, '@wheel.stop')"
      >
        <TresSphereGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
      <TresGroup
        name="stopper"
        :position-y="-1"
        @click="(e) => fnStopPropagation(e, '@click')"
        @contextmenu="(e) => fnStopPropagation(e, '@contextmenu')"
        @dblclick="(e) => fnStopPropagation(e, '@dblclick')"
        @pointerenter="(e) => fnStopPropagation(e, '@pointerenter')"
        @pointerleave="(e) => fnStopPropagation(e, '@pointerleave')"
        @pointerover="(e) => fnStopPropagation(e, '@pointerover')"
        @pointerout="(e) => fnStopPropagation(e, '@pointerout')"
        @pointermove="(e) => fnStopPropagation(e, '@pointermove')"
        @pointerdown="(e) => fnStopPropagation(e, '@pointerdown')"
        @pointerup="(e) => fnStopPropagation(e, '@pointerup')"
        @pointermissed="(e) => fnStopPropagation(e, '@pointermissed')"
        @wheel="(e) => fnStopPropagation(e, '@wheel')"
      >
        <TresMesh name="Cube">
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresGroup>
      <TresDirectionalLight :intensity="1" />
      <TresAmbientLight :intensity="1" />
    </TresGroup>
  </TresCanvas>
</template>
