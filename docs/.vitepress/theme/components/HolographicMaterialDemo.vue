<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { HolographicMaterial, Levioso, OrbitControls, useGLTF } from '@tresjs/cientos'

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'
const { scene } = await useGLTF(path)

const holographicMaterialRef = shallowRef()

watch(holographicMaterialRef, (value) => {
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.dispose()
      child.material = value.root
    }
  })
})
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera :position="[0, 0, 6]" />
    <Levioso :speed="5">
      <primitive
        :object="scene"
        :position-y="-2.5"
      >
        <HolographicMaterial ref="holographicMaterialRef" />
      </primitive>
    </Levioso>
    <OrbitControls />
  </TresCanvas>
</template>
