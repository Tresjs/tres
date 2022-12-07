<script setup lang="ts">
/* import { Color } from 'three' */
import { useTweakPane, OrbitControls, TransformControls } from '../../cientos/src'
/* import TestSphere from '/@/components/TestSphere.vue' */
import Text3D from '/@/components/Text3D.vue'
/* import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useTres, useCatalogue } from '/@/core' */

/* const { extend } = useCatalogue() */

/* extend({ OrbitControls }) */

useTweakPane()

/* const { state } = useTres() */
</script>
<template>
  <Suspense>
    <TresCanvas
      shadows
      alpha
      clear-color="teal"
      power-preference="high-performance"
      preserve-drawing-buffer
      physically-correct-lights
    >
      <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :near="0.1" :far="1000" :look-at="[-8, 3, -3]" />
      <TresScene>
        <OrbitControls />
        <TresAmbientLight :intensity="0.5" />
        <!--  <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" /> -->
        <Text3D />
        <!--   <TestSphere /> -->
        <TresAxesHelper :args="[1]" :visible="false" />
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
