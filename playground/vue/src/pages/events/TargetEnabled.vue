<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

function onClick(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material?.color.set('#008080')
}

function onDoubleClick(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#FFD700')
}

function onPointerEnter(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#CCFF03')
}

function onPointerLeave(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#efefef')
}

function onContextMenu(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#FF4500')
}

function onPointerMissed(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#000000')
}

const eventsTargetBlueRef = shallowRef<HTMLElement | undefined>()
const eventsTargetRedRef = shallowRef<HTMLElement | undefined>()
const eventsTargetIdRef = shallowRef<string>('undefined')
const eventsTargetRef = computed<HTMLElement | undefined>(() => {
  if (eventsTargetIdRef.value === 'blue') {
    return eventsTargetBlueRef.value
  }
  else if (eventsTargetIdRef.value === 'red') {
    return eventsTargetRedRef.value
  }
  else {
    return undefined
  }
})
function onChangeEventTargetId(id: string) {
  eventsTargetIdRef.value = id
}

const eventsEnabledRef = shallowRef(true)
function onChangeEventsEnabled(b: boolean) {
  eventsEnabledRef.value = b
}
</script>

<template>
  <div ref="eventsTargetBlueRef" :style="{ display: eventsTargetIdRef === 'blue' ? 'block' : 'none' }" class="full-screen checkered blue"></div>
  <div ref="eventsTargetRedRef" :style="{ display: eventsTargetIdRef === 'red' ? 'block' : 'none' }" class="full-screen checkered red"></div>
  <TresCanvas
    window-size
    clear-color="darkGray"
    :events-enabled="eventsEnabledRef"
    :events-target="eventsTargetRef"
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls :dom-element="eventsTargetRef" />
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
          @contextmenu="onContextMenu"
          @pointermissed="onPointerMissed"
        >
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="#efefef" />
        </TresMesh>
      </template>
    </template>
    <TresDirectionalLight :intensity="1" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
  <OverlayInfo>
    <h1><code>eventsTarget</code></h1>
    <p>The <code>Events</code> system connects to <code>context.renderer.value.domElement</code> by default. But users can override this by setting <code>:events-target</code> on <code>TresCanvas</code>.</p>
    <h2>Select an <code>:events-target</code> to <code>connect</code> to.</h2>
    <div v-for="id of ['undefined', 'blue', 'red']" :key="id">
      <input :id="id" :checked="id === eventsTargetIdRef" type="radio" name="target" @change="() => onChangeEventTargetId(id)" />
      <label :for="id">{{ id }}</label>
    </div>
    <p>(This will also create/add/remove a DOM element covering the TresCanvas, if necessary.)</p>
    <p>The on-screen objects should still respond to pointer events.</p>
    <hr />
    <h1><code>eventsEnabled</code></h1>
    <p>The <code>Events</code> system is enabled by default but can be turned off by setting <code>:events-enabled="false"</code> on <code>TresCanvas</code></p>
    <input id="enabled" type="checkbox" checked @change="(e) => onChangeEventsEnabled((e.target as null | HTMLFormElement)?.checked ?? false)" />
    <label for="enabled">Enable events</label>
    <hr />
    <h2>NOTE</h2>
    <p>Tres controls like <code>OrbitControls</code> are unaffected by <code>context.events</code> settings.</p>
    <p>Additional steps must be taken to update them appropriately, in the case of changing the event target or disabling events.</p>
  </OverlayInfo>
</template>

<style scoped>
.full-screen {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
}
.checkered.red {
  background-image: linear-gradient(45deg, #000 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(45deg, transparent 75%, #000 75%),
    linear-gradient(45deg, #000 25%, #f00 25%);
}
.checkered.blue {
  background-image: linear-gradient(45deg, #00f 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #00f 75%), linear-gradient(45deg, transparent 75%, #00f 75%),
    linear-gradient(45deg, #00f 25%, #000 25%);
}
.checkered {
  opacity: 0.25;
  background-size: 10px 10px;
  background-position:
    0 0,
    0 0,
    -5px -5px,
    5px 5px;
}
</style>
