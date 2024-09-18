<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ThreeEvent } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Vector3 } from 'three'

function onClick(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('red')
}

function onPointerOver(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set('#FFCC00')
}

function onPointerOut(ev: ThreeEvent<MouseEvent>) {
  ev.eventObject.material.color.set(ev.eventObject.color)
}

const blockingIdRef = ref<string>('scene')
function onChangeBlockingId(id: string) {
  blockingIdRef.value = id
}

const COUNT = 12
const positions0: Vector3[] = []
const positions1: Vector3[] = []
for (let i = 0; i < COUNT; i++) {
  const ang = i / COUNT * 2 * Math.PI
  positions0.push(new Vector3(Math.cos(ang) * 20, 0, Math.sin(ang) * 20))
}
for (let i = 0; i < COUNT; i++) {
  const ang = i / COUNT * 2 * Math.PI
  positions1.push(new Vector3(Math.cos(ang) * 30, 0, Math.sin(ang) * 30))
}
console.log(positions0)
</script>

<template>
  <OverlayInfo>
    <h1><code>:blocking</code></h1>
    <p>By default, from the perspective of the pointer/mouse in Tres, 3D objects are <strong>not</strong> "solid".</p>
    <p>Clicks and other pointer events "hit" all objects under the pointer, event if those objects are behind other objects.</p>
    <p>But you can make a subtree "solid" by marking it with <code>:blocking="true"</code></p>
    <h2>Setup</h2>
    <p><strong>Select "blocking" objects in the scene.</strong> Then interact with the scene to see the effect.</p>
    <div v-for="id of ['scene', 'cubes', 'spheres', 'none (default Tres behavior)']" :key="id">
      <input :id="id" :checked="id === blockingIdRef" type="radio" name="target" @change="() => onChangeBlockingId(id)" />
      <label :for="id">{{ id }}</label>
    </div>
  </OverlayInfo>
  <TresCanvas window-size clear-color="gray" :blocking="blockingIdRef === 'scene'">
    <OrbitControls />
    <TresPerspectiveCamera
      :position="[0, 10, 80]"
      :look-at="[0, 0, 0]"
    />
    <TresGroup :blocking="blockingIdRef === 'scene'">
      <TresMesh
        v-for="pos, i of positions0"
        :key="i"
        :position="pos"
        :blocking="blockingIdRef === 'cubes'"
        :scale="5"
        color="green"
        @pointer-over="onPointerOver"
        @pointer-out="onPointerOut"
        @click="onClick"
      >
        <TresBoxGeometry :args="[]" />
        <TresMeshBasicMaterial color="green" />
      </TresMesh>

      <TresMesh
        v-for="pos, i of positions1"
        :key="i"
        :position="pos"
        :blocking="blockingIdRef === 'spheres'"
        color="purple"
        @pointer-over="onPointerOver"
        @pointer-out="onPointerOut"
        @click="onClick"
      >
        <TresSphereGeometry :args="[]" />
        <TresMeshBasicMaterial color="purple" />
      </TresMesh>
      <TresMesh
        :scale="10"
        color="blue"
        @pointer-over="onPointerOver"
        @pointer-out="onPointerOut"
        @click="onClick"
      >
        <TresTorusGeometry />
        <TresMeshBasicMaterial color="blue" />
      </TresMesh>

      <TresMesh
        :scale="40"
        color="gray"
        @pointer-over="onPointerOver"
        @pointer-out="onPointerOut"
        @click="onClick"
      >
        <TresCylinderGeometry :scale="[-1, 1, 1]" />
        <TresMeshBasicMaterial color="gray" />
      </TresMesh>
    </TresGroup>
    <TresDirectionalLight :intensity="1" />
  </TresCanvas>
</template>
