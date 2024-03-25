<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { HolographicMaterial, OrbitControls, useGLTF, Sphere } from '@tresjs/cientos'

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
    <TresPerspectiveCamera
      :position="[0, 0, 10]"
      :look-at="[0, 5, 0]"
    />
    <primitive :object="scene" />
    <Sphere :visible="false">
      <HolographicMaterial ref="holographicMaterialRef" />
    </Sphere>
    <TresAmbientLight />
    <TresDirectionalLight :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>
