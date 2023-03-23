<script setup lang="ts">
import { useRenderLoop } from '/@/composables/useRenderLoop'
import { ref } from 'vue'
import { OrbitControls } from '@tresjs/cientos/'

const { onLoop } = useRenderLoop()

const groupRef = ref()

onLoop(() => {
  if (groupRef.value) {
    groupRef.value.rotation.y += 0.01
  }
})
</script>
<template>
  <div class="container">
    <TresCanvas>
      <TresPerspectiveCamera :position="[5, 5, 5]" :fov="75" :aspect="1" :near="0.1" :far="1000" />
      <OrbitControls />
      <TresScene>
        <TresAmbientLight :color="0xffffff" :intensity="0.5" />
        <TresGroup ref="groupRef" :position="[0, -4, -5]">
          <TresMesh :scale="1" :position="[-4, 0, 0]" cast-shadow>
            <TresSphereGeometry :args="[1, 500, 500]" />
            <TresMeshToonMaterial color="#FBB03B" />
          </TresMesh>
          <TresMesh :scale="1" :position="[4, 0, 0]" cast-shadow>
            <TresSphereGeometry :args="[1, 500, 500]" />
            <TresMeshToonMaterial color="teal" />
          </TresMesh>
        </TresGroup>
        <TresAxesHelper />
      </TresScene>
    </TresCanvas>
  </div>
</template>
