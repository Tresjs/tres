<script setup>
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { gsap } from 'gsap'
import Sphere from './Sphere.vue'
import Box from './Box.vue'

const current = ref('Box')

const handleComponents = (component) => {
  current.value = component
}

const meshes = {
  Box,
  Sphere,
}
</script>

<template>
  <!---->
  <SceneWrapper>
    <div class="floating-container">
      <button :class="{ isActive: meshes[current] === Box }" @click="handleComponents('Box')">Cube</button>
      <button :class="{ isActive: meshes[current] === Sphere }" @click="handleComponents('Sphere')">Sphere</button>
    </div>
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera
        :position="[0, 0, 5]"
      />
      <component :is="meshes[current]" />
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :intensity="1"
      />
    </TresCanvas>
  </SceneWrapper>
</template>

<style scoped>
.floating-container {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 10;
  background-color: #f7f7f7;
  color: #333;
  border-radius: 8px;
  padding: 0.25rem;
  display: flex;
  gap: 0.25rem;
  transform: translateX(-50%);
  button {
    padding: 8px 16px;
    border: none;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
  }
}

button.isActive {
  background-color: #388e3c;
}
</style>
