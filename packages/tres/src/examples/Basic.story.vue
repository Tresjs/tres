<script setup lang="ts">
import { Color } from 'three'
import { useTres } from '/@/core'
import { OrbitControls } from '@tresjs/cientos'

const floorTeal = new Color('gray')
/* const { state } = useTres() */
</script>
<template>
  <Story title="Basic">
    <Variant title="playground">
      <TresCanvas clear-color="#82DBC5" shadows alpha window-size>
        <TresPerspectiveCamera :position="[3, 3, 3]" />
        <TresScene>
          <OrbitControls />
          <!--   <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" /> -->
          <TresMesh :position="[-2, 6, 0]" :rotation="[0, Math.PI, 0]" cast-shadow>
            <TresConeGeometry :args="[1, 1.5, 3]" />
            <TresMeshToonMaterial color="#82DBC5" />
          </TresMesh>
          <TresMesh :position="[0, 4, 0]" cast-shadow>
            <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
            <TresMeshToonMaterial color="#4F4F4F" />
          </TresMesh>
          <TresMesh :position="[2, 2, 0]" cast-shadow>
            <TresSphereGeometry />
            <TresMeshToonMaterial color="#FBB03B" />
          </TresMesh>
          <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
          <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
            <TresPlaneGeometry :args="[10, 10, 10, 10]" />
            <TresMeshToonMaterial :color="floorTeal" />
          </TresMesh>
        </TresScene>
      </TresCanvas>
    </Variant>
  </Story>
</template>
