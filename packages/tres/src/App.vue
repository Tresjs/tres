<script setup lang="ts">
import { Color } from 'three'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
/* import TestSphere from '/@/components/TestSphere.vue' */

/* import { OrbitControls, useTweakPane } from '@tresjs/cientos' */
/* import { OrbitControls, useTweakPane } from '../../cientos/src/'
 */
const colorTeal = new Color('teal')
useTweakPane()

const meshPosition = [2, 1, 0]
</script>
<template>
  <Suspense>
    <TresCanvas shadows alpha power-preference="high-performance" preserve-drawing-buffer physically-correct-lights>
      <OrbitControls />
      <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
      <TresScene>
        <TresMesh :position="meshPosition" :scale="1">
          <TresSphereGeometry />
          <TresMeshToonMaterial :color="colorTeal" />
        </TresMesh>
        <TestSphere />
        <TresAxesHelper :args="[1]" />
        <TresDirectionalLight :position="[0, 2, 4]" :intensity="2" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
