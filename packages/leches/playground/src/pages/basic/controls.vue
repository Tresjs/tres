<script setup lang="ts">
import { Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'

/* import '@tresjs/leches/style.css' */
import { reactive, ref } from 'vue'

const gl = reactive({
  clearColor: '#82DBC5',
})

const cameraRef = ref()
const boxRef = ref()
useControls('fpsgraph')

const { wireframe, camPos, position, rotation } = useControls({
  wireframe: false,
  camPos: new Vector3(4, 4, 4),
  position: new Vector3(0, 1, 2),
  rotation: {
    value: new Vector3(5, 5, 5),
  },
  select: {
    value: 'option1',
    options: ['option1', 'option2', 'option3'],
    icon: 'i-carbon-checkmark',
  },
  range: {
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
  },
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      ref="cameraRef"
      :position="[camPos.value.x, camPos.value.y, camPos.value.z]"
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
        :wireframe="wireframe.value"
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
