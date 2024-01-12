<script setup lang="ts">
import { ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { useGLTF, GLTFModel, useFBX, FBXModel } from '@tresjs/cientos'
import { NoToneMapping } from 'three'

const modelPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'
const modelPathFbx = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx'

const { scene: model } = await useGLTF(modelPath, {
  draco: true,
})

const modelFbx = await useFBX(modelPathFbx)

const akuAkuRef = ref(null)
const jeepRef = ref(null)

const gl = {
  clearColor: '#333',
  alpha: true,
  toneMapping: NoToneMapping,
}

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (akuAkuRef.value) {
    akuAkuRef.value.value.rotation.y += 0.01
  }
  if (jeepRef.value) {
    jeepRef.value.value.rotation.y -= 0.01
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
  </TresGroup>
</template>
