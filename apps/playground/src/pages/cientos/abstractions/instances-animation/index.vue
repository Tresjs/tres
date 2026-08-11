<script setup lang="ts">
import { Merged, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BoxGeometry, Mesh, MeshStandardMaterial, NoToneMapping, SRGBColorSpace } from 'three'
import { onUnmounted, ref } from 'vue'
import Rotor from './Rotor.vue'

const gl = {
  clearColor: '#0f172a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const blade = new Mesh(
  new BoxGeometry(0.4, 0.15, 1.6),
  new MeshStandardMaterial({ color: '#38bdf8', roughness: 0.4 }),
)

const meshes = { Blade: blade }

onUnmounted(() => {
  blade.geometry.dispose()
  ;(blade.material as MeshStandardMaterial).dispose()
})

const canvasRef = ref()
</script>

<template>
  <TresCanvas
    ref="canvasRef"
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[6, 5, 8]" />
    <OrbitControls />

    <Merged :meshes="meshes">
      <Rotor />
    </Merged>

    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1.2" />
    <TresDirectionalLight :position="[6, 10, 4]" :intensity="2" />
  </TresCanvas>
</template>
