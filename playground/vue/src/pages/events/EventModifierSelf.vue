<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import type { ThreeEvent } from '@tresjs/core'
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

const calledWithSelf = reactive<Partial<Record<DomEventName, boolean>>>({
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
  console.log('self')
  if (e.target !== e.currentTarget) { error[name] = true }
}

function fn(name: DomEventName, e: ThreeEvent<any>) {
  called[name] = true
  calledWithSelf[name] = e.target === e.currentTarget
}
</script>

<template>
  <OverlayInfo
    @click.middle="console.log"
    @click.self="console.log"
  >
    <h1>Event Modifiers: self</h1>
    <p>Tres supports the Vue event modifier <code>self</code></p>
    <p>E.g.: <code>@click.self="..."</code></p>
    <h2>Tests</h2>
    <p>Interact with the 3D object. It has all supported pointer events + <code>self</code>. If events are passed to the containing TresGroup, an error will appear below.</p>
    <table>
      <tr v-for="domName of Object.keys(called)" :key="domName">
        <td>
          <span v-if="error[domName as DomEventName]">❌</span>
          <span v-else-if="called[domName as DomEventName]">✅</span>
          <span v-else> </span>
          {{ domName }}
        </td>
        <td>
          <span v-if="calledWithSelf[domName as DomEventName]">e.target === e.currentTarget</span>
        </td>
      </tr>
    </table>
    <p v-if="Object.values(called).every(b => b) && Object.values(error).every(b => !b)"><strong>✅ All tests pass</strong></p>
    <hr />
    <h2>NOTE</h2>
    <p><code>pointermissed</code> is always a "self" event. (No Vue DOM equivalent.)</p>
    <p><code>pointer{enter,leave}</code> are always "self" events.</p>
    <a href="https://play.vuejs.org/#eNqNk8tuwjAQRX/F8oZWisKiXaG06kMs2kWL2i69iZIhmDq25UeKhPj3juMkIECBTTSeO9e+J7K39FnrtPFAZzSzheHaEQvO60cms2lsYIkLB7UWuQNcEZKVvCGheNKKSwcGwie1IJYPjBZKWiUgFaq6mSiPCtnrk1tGD50C8gZGnHv92Kma0SMH+cTn3ZitU3tXy3tAfA0zl/Is8zXU0XtKfQV3tJ5wXybvjEfkyL7wjnReskLiJAZLSC5LUqyg+CX9RtkU/1C8HF2VTYc7QxPqLE4ueZWurZJ427ZhNOSoNRdgPrXjuBOjM9IqQcuFUH/vbc8ZD0nfbw8+01/bTegxujBgwTTA6KC53FTgojz//oAN1oNYq9ILnB4RvwApfcgYx168LDH2wVyb9q3Wyjguqx873ziQtocKQcPkrp1nFJ/c6wj6Pu5det/6mNzR3T8WqD96">
      See Vue DOM behavior.
    </a>
  </OverlayInfo>
  <TresCanvas
    window-size
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :look-at="[0, 0, 0]"
    />
    <TresGroup
      @click.middle="console.log"
      @contextmenu.middle="console.log"
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

      @click="(e) => fn('click', e)"
      @dblclick="(e) => fn('dblclick', e)"
      @wheel="(e) => fn('wheel', e)"
      @contextmenu="(e) => fn('contextmenu', e)"
      @pointerup="(e) => fn('pointerup', e)"
      @pointerdown="(e) => fn('pointerdown', e)"
      @pointerenter="(e) => fn('pointerenter', e)"
      @pointerleave="(e) => fn('pointerleave', e)"
      @pointerover="(e) => fn('pointerover', e)"
      @pointerout="(e) => fn('pointerout', e)"
      @pointermove="(e) => fn('pointermove', e)"
      @pointermissed="(e) => fn('pointermissed', e)"
    >
      <TresMesh
        @click.left="console.log('left')"
        @click.right="console.log('right')"
        @click.middle="console.log('middle')"
      >
        <TresSphereGeometry />
        <TresMeshToonMaterial color="#efefef" />
      </TresMesh>
    </TresGroup>

    <TresDirectionalLight :intensity="1" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
