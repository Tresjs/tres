<script setup lang="ts">
import { Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/style.css'
import { reactive, ref, watchEffect } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
})

useControls('fpsgraph', {
  uuid: 'second',
})

useControls(gl, {
  uuid: 'second',
})
// Refs

// Reactive

// Plain Objects
const { test, awiwi } = useControls({ test: true, awiwi: 'awiwi' })
console.log('test', test)
console.log('awiwi', awiwi)

watchEffect(() => {
  console.log('test', test.value)
})
watchEffect(() => {
  console.log('awiwi', awiwi.value.value)
})
// Objects with ref values
const { value: wireframe } = useControls({
  wireframe: false,
})

watchEffect(() => {
  console.log('wireframe', wireframe.value)
})

// Objects with reactive values
const cameraPosition = reactive(new Vector3(0, 0, 0))

const { position: camPos } = useControls({
  position: cameraPosition,
})

watchEffect(() => {
  console.log('cameraPosition', camPos.value)
})

// Objects with options
const { zoom } = useControls({
  zoom: { value: 1, min: 0, max: 10, step: 0.1, icon: 'ic-baseline-arrow-forward' },
})

watchEffect(() => {
  console.log('zoom', zoom.value)
})

const { dropdown } = useControls({
  dropdown: {
    options: [
      { text: 'loading', value: 'LDG' },
      { text: 'menu', value: 'MNU' },
      { text: 'field', value: 'FLD' }],
    value: 'LDG',
  },
})
  
watchEffect(() => {
  console.log('dropdown', dropdown.value)
})
  
/* const { wireframe } = useControls({
    wireframe: ref(false),
  }) */
const boxPosition = reactive(new Vector3(0, 0, 0))
const boxRotation = reactive(new Vector3(0, Math.PI, 0))
const boxRef = ref()
const cameraRef = ref()

const { position, rotation } = useControls({
  position: boxPosition,
  rotation: boxRotation,
})

watchEffect(() => {
  console.log('boxPosition', position.value)
})
  
useControls({
  slider: { value: 1, min: 0, max: 10, step: 0.1, icon: 'ic-baseline-arrow-forward' },
}, {
  uuid: 'second',
})

const folder = useControls('Folder', {
  pepe: true,
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  },
})

console.log('folder', folder)

watchEffect(() => {
  console.log('folder', folder.pepe.value.value)
})
</script>

<template>
  <pre>{{ position }}</pre>
  <TresLeches />
  <TresLeches uuid="second" />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      ref="cameraRef"
      :position-x="camPos.x"
      :look-at="[1, 2, 0]"
    />
    <TresMesh
      ref="boxRef"
      :position="[position.x, position.y, position.z]"
      :rotation="[rotation.x, rotation.y, rotation.z]"
      :scale="[2, 2, 2]"
    >
      <TresBoxGeometry />
      <TresMeshNormalMaterial
        color="teal"
        :wireframe="wireframe"
      />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <OrbitControls />
  </TresCanvas>
</template>
