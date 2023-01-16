<script setup lang="ts">
import { OrbitControls } from '../../../cientos/src/'
</script>
<template>
  <Story title="Basic">
    <Variant title="playground">
      <TresCanvas clear-color="#201919">
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="75" :aspect="1" :near="0.1" :far="1000" />
        <OrbitControls />
        <TresScene>
          <TresAmbientLight :color="0xffffff" :intensity="0.5" />
          <TresMesh ref="sphereRef" :scale="1" cast-shadow>
            <TresSphereGeometry :args="[1, 500, 500]" />
            <TresMeshToonMaterial color="#FBB03B" />
          </TresMesh>
        </TresScene>
      </TresCanvas>
    </Variant>
  </Story>
</template>
