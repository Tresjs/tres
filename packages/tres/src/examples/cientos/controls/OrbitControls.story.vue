<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
</script>
<template>
  <Story title="cientos/controls/OrbitControls">
    <Variant title="playground">
      <TresCanvas clear-color="#82DBC5" shadows alpha>
        <OrbitControls />
        <TresPerspectiveCamera :position="[5, 5, 5]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
        <TresScene>
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
        </TresScene>
      </TresCanvas>
    </Variant>
  </Story>
</template>
