<script setup>
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, RoundedBox } from '@tresjs/cientos'

const boxRef = shallowRef()

watch(boxRef, (box) => {
  console.log(box)
})
</script>

<template>
  <TresCanvas
    window-size
    clear-color="#111"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 7]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <RoundedBox
      ref="boxRef"
    >
      <TresMeshBasicMaterial
        :color="0x00ff00"
        wireframe
      />
    </RoundedBox>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>