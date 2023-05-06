<script setup lang="ts">
import { Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@leches/'
import { reactive, ref, watchEffect } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
})

watchEffect(() => {
  console.log(gl)
})

const wireframe = ref(false)
const boxPosition = reactive([0, 0, 0])
const boxRotation = reactive(new Vector3(0, Math.PI, 0))

useControls(gl)

useControls({
  wireframe,
  /* wireframe,
  boxPositionX: {
    value: boxPositionX,
    min: -10,
    max: 10,
    step: 0.1,
    label: 'Box Position X',
  },
  numberValue: 1, */
  boxPosition,
  boxRotation,
})

useControls('Folder', {
  wireframe,
})

/* const boxRef = ref()

watch(boxRef, value => {
  if (value) {
    boxRef.value.position.x = 1
    useControls({
      position: boxRef.value.position.x,
    })
  }
}) */
</script>
<template>
  <pre>{{ boxRotation }}</pre>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />
    <TresMesh
      ref="boxRef"
      :position-x="boxPosition[0]"
      :position-y="boxPosition[1]"
      :position-z="boxPosition[2]"
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
