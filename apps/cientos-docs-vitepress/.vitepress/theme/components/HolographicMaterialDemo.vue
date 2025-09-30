<script setup lang="ts">
import { HolographicMaterial, Levioso, OrbitControls, useGLTF } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'
import { TresCanvas } from '@tresjs/core'
import { shallowRef, watch } from 'vue'

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'
const { state } = useGLTF(path)

const holographicMaterialRef = shallowRef()

watch(holographicMaterialRef, (value) => {
  state.value?.scene?.traverse((child: TresObject) => {
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
        v-if="state?.scene"
        :object="state?.scene"
        :position-y="-2.5"
      >
        <HolographicMaterial ref="holographicMaterialRef" />
      </primitive>
    </Levioso>
    <OrbitControls />
  </TresCanvas>
</template>
