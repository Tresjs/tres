<script setup lang="ts">
import { ContactShadows, Environment, Html, Levioso, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { MathUtils } from 'three'
import { ref } from 'vue'

const gl = {
  clearColor: '#F6B03B',
  shadows: true,
  antialias: true,
}

const n = 30
const portalRef = ref<HTMLElement>()

type Vec3Tuple = [number, number, number]
interface Item {
  position: Vec3Tuple
  scale: number
  rotation: Vec3Tuple
}

const items: Item[] = Array.from({ length: n }, (): Item => ({
  position: [
    MathUtils.randFloat(-10, 10),
    MathUtils.randFloat(-2, 6.5),
    MathUtils.randFloat(3.5, 8),
  ] as Vec3Tuple,
  scale: MathUtils.randFloat(0.25, 0.5),
  rotation: [
    MathUtils.randFloat(0, Math.PI),
    MathUtils.randFloat(0, Math.PI),
    0,
  ] as Vec3Tuple,
}))
</script>

<template>
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[0, 8.5, 22]" />
      <OrbitControls make-default :enable-pan="false" :domElement="portalRef" :maxPolarAngle="Math.PI / 2.2" :target="[0, 2, 0]" />

      <Levioso v-for="(item, index) in items" :key="index" :speed="2">
        <TresMesh
          :position="[item.position[0], item.position[1], item.position[2]]"
          :scale="[item.scale, item.scale, item.scale]"
          :rotation="[item.rotation[0], item.rotation[1], item.rotation[2]]"
        >
          <TresMeshStandardMaterial color="white" attach="material" />

          <TresTetrahedronGeometry v-if="index % 9 === 0" :args="[2]" />
          <TresCylinderGeometry v-else-if="index % 9 === 1" :args="[0.8, 0.8, 2, 32]" />
          <TresConeGeometry v-else-if="index % 9 === 2" :args="[1.1, 1.7, 32]" />
          <TresSphereGeometry v-else-if="index % 9 === 3" :args="[1.5, 32, 32]" />
          <TresIcosahedronGeometry v-else-if="index % 9 === 4" :args="[2]" />
          <TresTorusGeometry v-else-if="index % 9 === 5" :args="[1.1, 0.35, 16, 32]" />
          <TresOctahedronGeometry v-else-if="index % 9 === 6" :args="[2]" />
          <TresSphereGeometry v-else-if="index % 9 === 7" :args="[1.5, 32, 32]" />
          <TresBoxGeometry v-else-if="index % 9 === 8" :args="[2.5, 2.5, 2.5]" />
        </TresMesh>
      </Levioso>

      <Levioso :speed="1.5">
        <Html
          transform
          center
          :cast-shadow="true"
          :receive-shadow="true"
          occlude="blending"
          :z-index-range="[28, 0]"
          :position-y="2.5"
          :portal="portalRef"
          :style="{ userSelect: 'none' }"
        >
          <iframe
            class="w-[700px] h-[500px]"
            src="https://tresjs.org"
            frameborder="0"
            :width="700"
            :height="500"
          ></iframe>
        </Html>
      </Levioso>

      <ContactShadows
        :blur="1"
        :opacity="0.85"
        :position-y="-5.5"
        :scale="30"
        :far="25"
      />

      <Suspense>
        <Environment preset="city" />
      </Suspense>
    </TresCanvas>
  <div ref="portalRef" class="html-tresjs-portal"></div>
</template>

<style scoped>
.html-tresjs-portal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

canvas {
  pointer-events: none !important;
}
</style>
