<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos/'
</script>

<template>
  <div class="container">
    <TresCanvas>
      <TresPerspectiveCamera
        :position="[5, 5, 5]"
        :fov="75"
        :aspect="1"
        :near="0.1"
        :far="1000"
      />
      <OrbitControls />
      <TresAmbientLight
        :color="0xffffff"
        :intensity="0.5"
      />
      <TresMesh
        ref="sphereRef"
        :scale="1"
        cast-shadow
      >
        <TresSphereGeometry :args="[1, 500, 500]" />
        <TresMeshToonMaterial color="#FBB03B" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  aspect-ratio: 16/9;
  background: white;
  width: 50%;
}
</style>
