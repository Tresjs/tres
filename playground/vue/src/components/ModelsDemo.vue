<script setup lang="ts">
import { FBXModel, GLTFModel, useFBX, useGLTF } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import { ref } from 'vue'

const modelPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'
const modelPathFbx = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx'

const pokeballPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf'
const { scene: model } = await useGLTF(modelPath, {
  draco: true,
})

const { scene: pokeball } = await useGLTF(pokeballPath, {
  draco: true,
})

const modelFbx = await useFBX(modelPathFbx)

const akuAkuRef = ref(null)
const jeepRef = ref(null)

/* const gl = {
  clearColor: '#333',
  alpha: true,
  toneMapping: NoToneMapping,
} */

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (akuAkuRef.value) {
    akuAkuRef.value.instance.rotation.y += 0.01
  }
  if (jeepRef.value) {
    jeepRef.value.instance.rotation.y -= 0.01
  }
})
</script>

<template>
  <TresGroup>
    <primitive
      :object="model"
      :position="[-3, 0, 0]"
    />
    <Suspense>
      <GLTFModel
        ref="akuAkuRef"
        :path="modelPath"
        draco
        :position="[0, -2, 2]"
        :rotation-x="0.5"
        name="Aku_aku"
        cast-shadow
      />
    </Suspense>
    <!-- FBX MODELS -->
    <primitive
      :object="modelFbx"
      :position="[6, 0, 2]"
      :scale="[0.01, 0.01, 0.01]"
    />
    <Suspense>
      <FBXModel
        ref="jeepRef"
        :path="modelPathFbx"
        :scale="0.01"
        :position="[0, -1, -2]"
        name="jeep_model"
        cast-shadow
      />
    </Suspense>
    <primitive
      :object="pokeball"
    />
  </TresGroup>
</template>
