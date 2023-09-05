<script setup lang="ts">
import type { Object3D } from 'three'
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref, watchEffect } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { GLTFModel, OrbitControls } from '@tresjs/cientos'

/* import { OrbitControls, GLTFModel } from '@tresjs/cientos' */

const state = reactive({
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,

  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

const venomSnake = ref(null)

watchEffect(() => {
  if (venomSnake.value) {
    const { model }: { model: Object3D } = venomSnake.value
    model.scale.set(0.02, 0.02, 0.02)
    model.position.set(0, 2, 0)
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
})
</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[-8, 3, -3]"
    />
    <OrbitControls make-default />
    <TresAmbientLight :intensity="0.5" />

    <Suspense>
      <GLTFModel
        ref="venomSnake"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf"
        draco
      />
    </Suspense>
    <TresAxesHelper />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>
