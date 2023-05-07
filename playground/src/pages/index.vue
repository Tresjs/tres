<script setup lang="ts">
import { Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@leches/'
import { reactive, ref, watch, watchEffect } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
})

watchEffect(() => {
  console.log(gl)
})

const wireframe = ref(false)
const boxPosition = reactive(new Vector3(0, 0, 0))
const boxRotation = reactive(new Vector3(0, Math.PI, 0))

useControls({ test: { value: 1, min: 0, max: 10, step: 0.1 } })
useControls(gl)
/* useControls('fpsgraph')
useControls(gl)

useControls('Box', {
  position: boxPosition,
  rotation: boxRotation,
  wireframe,
})
 */
const boxRef = ref()

/* watch(boxRef, value => {
  if (value) {
    boxRef.value.position.x = 1
    useControls(boxRef.value.position, 'x', {
      min: -10,
      max: 10,
    })
  }
}) */
</script>
<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />
    <TresMesh
      ref="boxRef"
      :position-x="boxPosition.x"
      :position-y="boxPosition.y"
      :position-z="boxPosition.z"
      :rotation-x="boxRotation.x"
      :rotation-y="boxRotation.y"
      :rotation-z="boxRotation.z"
      :scale="[2, 2, 2]"
    >
      <TresBoxGeometry />
      <TresMeshNormalMaterial :color="'teal'" :wireframe="wireframe" />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 3, 3]" :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
