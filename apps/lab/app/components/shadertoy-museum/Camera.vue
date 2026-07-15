<script setup lang="ts">
import { Levioso } from '@tresjs/cientos'
import type { PerspectiveCamera } from 'three';
import type { ShaderToyMuseumState } from './const';
const cameraRef = ref<PerspectiveCamera>()

const state: ShaderToyMuseumState = inject('state')!

const shaderToyTarget = computed(() => state.shaderToyTargets[state.i])

watch(shaderToyTarget, (target) => {
  if(target && target.cameras.length > 0) {
    const targetCamera = target.cameras[0]
    if(targetCamera && cameraRef.value) {
      targetCamera.getWorldPosition(cameraRef.value?.position)
      targetCamera.getWorldQuaternion(cameraRef.value?.quaternion)
      cameraRef.value?.updateProjectionMatrix()
      cameraRef.value?.setFocalLength(targetCamera.getFocalLength())
    }
  }
}, { immediate: true })
</script>
<template>
  <Levioso :rotation-factor="0">
    <TresPerspectiveCamera ref="cameraRef" 
      :position="[0,5,0]"
      :look-at="[0,0,0]"
      :fov="60"
      :near="0.1"
      :far="1000"
    />
  </Levioso>
</template>