<script setup lang="ts">
import { Html, Levioso, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'
import { CircleGeometry, MeshStandardMaterial } from 'three'

const gl = {
  clearColor: '#82DBC5',
  clearAlpha: 1,
  shadows: true,
  alpha: true,
}

const targetDirectionLightRef = shallowRef(null)

const geometries = [
  {
    component: 'TresBoxGeometry',
    args: [1, 1, 1],
  },
  {
    component: 'TresSphereGeometry',
    args: [0.7, 32, 32],
  },
  {
    component: 'TresTorusGeometry',
    args: [0.5, 0.2, 16, 100],
    bind: { castShadow: true, receiveShadow: true },
  },
]

const customGeometry = shallowRef(new CircleGeometry(1.25, 32))

const customMaterial = shallowRef(new MeshStandardMaterial({
  color: 'red',
  side: 2,
  opacity: 1,
  transparent: true,
}))
</script>

<template>
  <div class="html-demo-wrapper">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 1.5, 7.5]" />
      <OrbitControls />

      <Levioso
        v-for="(geometry, index) in geometries"
        :key="`html-occlude-blending-demo-${index}`"
        :speed="3"
        :float-factor="3.5"
        :rotation-factor="1"
        :range="[-0.35, 0.35]"
      >
        <TresMesh :position="[index * 3.5 - 3.5, 1, 0]" v-bind="geometry.bind">
          <component :is="geometry.component" :args="geometry.args" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Levioso>

      <Html
        center
        transform
        occlude="blending"
        :position="[-4, .75, -2]"
      >
        <div class="text-center text-s p-2 bg-[#1B1C1E] text-light">
          BASIC 💛 <br />
          <em>occlude=blending</em>
        </div>
      </Html>

      <Html
        center
        transform
        occlude="blending"
        :position="[0, .85, -2]"
        :geometry="customGeometry"
      >
        <div class="text-xs p-8 text-center bg-[#F6B03B] text-dark">
          CUSTOM <br /> <strong>CIRCLE <br /> GEOMETRY</strong>
        </div>
      </Html>

      <Html
        ref="targetDirectionLightRef"
        center
        transform
        occlude="blending"
        :position="[4, .5, -2]"
        :material="customMaterial"
        receive-shadow
      >
        <div style="width: 100px; height: auto; aspect-ratio: 250/250;"></div>
      </Html>

      <Html
        center
        transform
        occlude="blending"
        :position="[4, 2.5, -2]"
      >
        <div class="text-center text-xs p-2 text-dark bg-[#FF0000]">
          <strong>HTML + Custom material </strong> <br />
          <em>+ receive-shadow </em> ⬇️
        </div>
      </Html>

      <TresDirectionalLight
        v-if="targetDirectionLightRef?.instance"
        :target="targetDirectionLightRef?.instance"
        :shadow-normalBias="0.075"
        :position="[5, 0, 5]"
        :intensity="2"
        cast-shadow
      />

      <TresGridHelper :position-y="-1" />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.html-demo-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #82dbc5;
}
</style>
