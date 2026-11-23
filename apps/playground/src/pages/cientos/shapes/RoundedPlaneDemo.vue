<script setup>
import { OrbitControls, RoundedPlane } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef, watch } from 'vue'

const planeRef = shallowRef()

watch(planeRef, (plane) => {
  // eslint-disable-next-line no-console
  console.log(plane)
})
</script>

<template>
  <TresCanvas
    window-size
    clear-color="#111"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 5]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />

    <!-- default material via color prop -->
    <RoundedPlane
      :position="[-1.2, 0, 0]"
      :args="[1.5, 1, 0.3, 16]"
      color="#ff7043"
    />

    <!-- custom material via slot -->
    <RoundedPlane
      ref="planeRef"
      :position="[1.2, 0, 0]"
      :args="[1.5, 1, 0.3, 16]"
    >
      <TresMeshStandardMaterial
        color="#4fc3f7"
        :roughness="0.3"
        :metalness="0.1"
      />
    </RoundedPlane>

    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
    />
    <TresAmbientLight :intensity="0.5" />
  </TresCanvas>
</template>
