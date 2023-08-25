<script setup lang="ts">
import { Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/style.css'
import { reactive, ref, watch, watchEffect } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
})


const wireframe = ref(false)
const boxPosition = reactive(new Vector3(0, 0, 0))
const boxRotation = reactive(new Vector3(0, Math.PI, 0))

useControls('fpsgraph')
const objectTest = useControls({ awiwi: { value: 1, min: 0, max: 10, step: 0.1, icon: 'ic-baseline-arrow-forward' } })
useControls(gl)
/* useControls('fpsgraph')
useControls(gl)

useControls('Box', {
  position: boxPosition,
  rotation: boxRotation,
  wireframe,
})
 */
useControls('Box', {
  position: boxPosition,
  rotation: boxRotation,
  wireframe,
})
const boxRef = ref()
const cameraRef = ref()

const test = useControls({
  label: 'test',
  options: [{ text: 'loading', value: 'LDG' },
  { text: 'menu', value: 'MNU' },
  { text: 'field', value: 'FLD' },],
  value: 'LDG',
})

const unwatch = watch(cameraRef, value => {
  if (value) {
    useControls('Camera', {
      position: cameraRef.value.position,
      rotation: cameraRef.value.rotation,
    })
    unwatch()
  }
})
watchEffect(() => {
  console.log(test.value.value)
})
</script>
<template>
  <pre>{{ objectTest }}</pre>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera ref="cameraRef" :look-at="[1,2,0]" />
    <TresMesh ref="boxRef" :position-x="boxPosition.x" :position-y="boxPosition.y" :position-z="boxPosition.z"
      :rotation-x="boxRotation.x" :rotation-y="boxRotation.y" :rotation-z="boxRotation.z" :scale="[2, 2, 2]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial :color="'teal'" :wireframe="wireframe" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
