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


const wireframe = ref(false)
const boxPosition = reactive(new Vector3(0, 0, 0))
const boxRotation = reactive(new Vector3(0, Math.PI, 0))

const fpsgraph = useControls('fpsgraph')
const objectTest = useControls({ awiwi: { value: 1, min: 0, max: 10, step: 0.1, icon: 'ic-baseline-arrow-forward' } })
const glTest = useControls(gl)
/* useControls('fpsgraph')
useControls(gl)

useControls('Box', {
  position: boxPosition,
  rotation: boxRotation,
  wireframe,
})
 */
const box = useControls('Box', {
  position: boxPosition,
  rotation: boxRotation,
  wireframe,
})
const boxRef = ref()

const test = useControls({
  label: 'test',
  options: [{ text: 'loading', value: 'LDG' },
  { text: 'menu', value: 'MNU' },
  { text: 'field', value: 'FLD' },],
  value: 'LDG',
})

/* watch(boxRef, value => {
  if (value) {
    boxRef.value.position.x = 1
    useControls(boxRef.value.position, 'x', {
      min: -10,
      max: 10,
    })
  }
}) */
watchEffect(() => {
  console.log(test.value.value)
})
</script>
<template>
  <pre>{{ objectTest }}</pre>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />
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
