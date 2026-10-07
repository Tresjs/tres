<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { MarchingCube, MarchingCubes, MarchingPlane, OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { shallowRef } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-marching-cubes'
const onReady = useBackendControl(uuid)

const { enableColors } = useControls({ enableColors: true }, { uuid })

const balls = [shallowRef(), shallowRef(), shallowRef(), shallowRef(), shallowRef(), shallowRef()]
const colors = ['red', 'red', 'blue', 'blue', 'green', 'green']

let time = 0
setInterval(() => {
  time += 1 / 30
  balls.forEach((ball, i) => {
    const position = ball.value?.instance.position
    if (!position) { return }
    position.x = Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27
    position.y = Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i)) * 0.77
    position.z = Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27
  })
}, 1000 / 30)

// MarchingCubes rebuilds its geometry buffers every frame and can use vertex colors.
const checks = [
  'Colored blobs move and merge with each other and with the three walls',
  'With `enableColors`, the blobs are red, blue and green (vertex colors). The walls are black, as on WebGL',
  'Without `enableColors`, they are lit blue with a highlight',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas clear-color="#82DBC5" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />
    <MarchingCubes :enable-colors="true" :resolution="40" :max-poly-count="40000">
      <MarchingPlane plane-type="x" />
      <MarchingPlane plane-type="y" />
      <MarchingPlane plane-type="z" />

      <MarchingCube
        v-for="(ball, i) in balls"
        :key="i"
        :ref="(instance) => { ball.value = instance }"
        :color="colors[i]"
      />

      <TresMeshBasicMaterial v-if="enableColors" :vertex-colors="true" />
      <TresMeshPhongMaterial v-else specular="#111111" :shininess="30" color="#049ef4" />
    </MarchingCubes>

    <TresDirectionalLight :intensity="3" :position="[0, 200, 0]" />
    <TresDirectionalLight :intensity="3" :position="[100, 200, 100]" />
  </TresCanvas>
</template>
