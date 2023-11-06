<script setup lang="ts">
import { Vector3, Vector2 } from 'three'
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

/* watchEffect(() => {
  console.log('test', test.value)
})
watchEffect(() => {
  console.log('awiwi', awiwi.value.value)
}) */
// Objects with ref values
const { value: wireframe } = useControls({
  wireframe: false,
})

/* watchEffect(() => {
  console.log('wireframe', wireframe.value)
}) */

// Objects with reactive values
const cameraPosition = reactive(new Vector3(0, 0, 0))

const { camPos } = useControls({
  camPos: cameraPosition,
})

/* watchEffect(() => {
  console.log('cameraPosition', camPos.value)
}) */

// Objects with options
const { zoom } = useControls({
  zoom: { value: 1, min: 0, max: 10, step: 0.1, icon: 'ic-baseline-arrow-forward' },
})

/* watchEffect(() => {
  console.log('zoom', zoom.value)
}) */

const { dropdown } = useControls({
  dropdown: {
    label: 'Dropdown 21',
    options: [
      { text: 'loading', value: 'LDG' },
      { text: 'menu', value: 'MNU' },
      { text: 'field', value: 'FLD' }],
    value: 'LDG',
  },
})
  
/* watchEffect(() => {
  console.log('dropdown', dropdown.value)
}) */
  
/* const { wireframe } = useControls({
    wireframe: ref(false),
  }) */
const boxRef = ref()
const cameraRef = ref()
const boxPosition = reactive(new Vector3(0, 0, 0))
const boxRotation = reactive(new Vector3(0, Math.PI, 0))

const { position, rotation, something } = useControls({
  position: boxPosition,
  rotation: boxRotation,
  something: ref(true),
})

/* watchEffect(() => {
  console.log('boxPosition2', position.value.value.x)
})

watchEffect(() => {
  console.log('something', something.value.value)
}) */
  
const { visible } = useControls({
  slider: { value: 1, min: 0, max: 10, step: 0.1, icon: 'ic-baseline-arrow-forward', visible: false },
}, {
  uuid: 'second',
})

/* watchEffect(() => {
  console.log('visible', visible.value)
}) */

useControls('Folder', {
  pepe: true,
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.02,
  },
})

useControls('camera', { position: new Vector3(3, 2, 4) })
</script>

<template>
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
      :position="[position.value.x, position.value.y, position.value.z]"
      :rotation="[rotation.value.x, rotation.value.y, rotation.value.z]"
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
