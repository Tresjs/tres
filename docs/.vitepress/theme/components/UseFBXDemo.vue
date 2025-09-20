<script setup lang="ts">
import { OrbitControls, useFBX } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, Mesh, NoToneMapping, SRGBColorSpace } from 'three'
import { watchEffect } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx'

// Use the new reactive useFBX API
const { state: model } = useFBX(path)

// Apply transformations and shadows when model loads
watchEffect(() => {
  if (model.value) {
    model.value.scale.set(0.01, 0.01, 0.01)
    model.value.position.set(0, -1.6, 0)
    model.value.rotation.y = -Math.PI * 0.5

    // Enable shadows for all meshes
    model.value.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
      }
    })
  }
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5.3, 2.45, 9.3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <primitive v-if="model" :object="model" />
    <TresMesh
      :rotate-x="Math.PI * -0.5"
      :position-y="-2"
      receive-shadow
    >
      <TresPlaneGeometry :args="[40, 40]" />
      <TresMeshStandardMaterial :color="0xF7F7F7" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      cast-shadow
      :position="[5, 10, 5]"
    />
  </TresCanvas>
</template>
