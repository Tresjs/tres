<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { color, mix, positionLocal, sin, time } from 'three/tsl'
import BackendInfo from './BackendInfo.vue'

const knotColorNode = mix(
  color('#82dbc5'),
  color('#fbb03b'),
  sin(time.add(positionLocal.y.mul(4))).mul(0.5).add(0.5),
)

const backend = ref<string>()
</script>

<template>
  <div class="absolute top-2 left-2 z-10 px-3 py-1 rounded bg-black/60 text-white text-sm font-mono">
    Backend: {{ backend ?? '…' }}
  </div>

  <!-- No `renderer` prop: the /webgpu TresCanvas creates a WebGPURenderer -->
  <TresCanvas clear-color="#1a1a1a" shadows>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresMesh :position-y="1" cast-shadow>
      <TresTorusKnotGeometry :args="[0.6, 0.2, 128, 32]" />
      <TresMeshStandardNodeMaterial :color-node="knotColorNode" :roughness="0.3" :metalness="0.2" />
    </TresMesh>

    <TresMesh :rotation-x="-Math.PI / 2" receive-shadow>
      <TresPlaneGeometry :args="[8, 8]" />
      <TresMeshStandardNodeMaterial color="#444444" />
    </TresMesh>

    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[3, 5, 2]" :intensity="2" cast-shadow />

    <BackendInfo @backend="backend = $event" />
  </TresCanvas>
</template>
