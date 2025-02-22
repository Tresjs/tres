<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const handleClick = (e: PointerEvent) => {
  console.log('clicked', e)
}

const handlePointerEnter = (e: PointerEvent) => {
  console.log('pointer-enter', e)
}

const handlePointerLeave = (e: PointerEvent) => {
  console.log('pointer-leave', e)
}
</script>

<template>
  <TresCanvas clear-color="#202020" shadows>
    <!-- Camera setup -->
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />

    <!-- Lights -->
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
    <TresAmbientLight :intensity="0.5" />

    <!-- Group of geometric shapes -->
    <TresGroup @click="handleClick" @pointer-enter="handlePointerEnter" @pointer-leave="handlePointerLeave">
      <!-- Box -->
      <TresMesh :position="[-2, 0, 0]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>

      <!-- Sphere -->
      <TresMesh :position="[0, 0, 0]">
        <TresSphereGeometry :args="[0.7, 32, 32]" />
        <TresMeshNormalMaterial />
      </TresMesh>

      <!-- Cone -->
      <TresMesh :position="[2, 0, 0]">
        <TresConeGeometry :args="[0.7, 1.5, 32]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>
