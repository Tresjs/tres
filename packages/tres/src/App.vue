<script setup lang="ts">
import { unref } from 'vue'
import { Color } from 'three'
import { useTweakPane } from '@tresjs/cientos'
import { useTres } from './core'
import TestSphere from '/@/components/TestSphere.vue'

const colorTeal = new Color('teal')
useTweakPane()

const { state } = useTres()

const meshPosition = [0, 1, 0]
</script>
<template>
  <Suspense>
    <TresCanvas shadows alpha power-preference="high-performance" preserve-drawing-buffer physically-correct-lights>
      <TresPerspectiveCamera :position="[0, 5, 5]" :fov="45" :near="0.1" :far="1000" />
      <TresScene>
        <TresOrbitControls v-if="state.renderer" :args="[unref(state), state.renderer?.domElement]" />
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
