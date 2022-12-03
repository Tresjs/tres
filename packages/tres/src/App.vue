<script setup lang="ts">
import { useTweakPane, OrbitControls, Text3D } from '../../cientos/src'

useTweakPane()
</script>
<template>
  <Suspense>
    <TresCanvas shadows alpha power-preference="high-performance" preserve-drawing-buffer physically-correct-lights>
      <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
      <TresScene>
        <OrbitControls />
        <TresMesh :position="[0, 0, 0]" :scale="1">
          <TresSphereGeometry />
          <TresMeshToonMaterial :color="'teal'" />
        </TresMesh>
        <!--  <Text3D font="/fonts/Gilroy_ExtraBold_Regular.json" :text="'Awiwi'" /> -->

        <TresAxesHelper :args="[1]" />
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
