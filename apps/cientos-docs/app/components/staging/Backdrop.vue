<script setup lang="ts">
import { Backdrop, GLTFModel, OrbitControls, useProgress } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import type { Camera } from 'three'
import { PCFSoftShadowMap, SRGBColorSpace } from 'three'
import { ref, watchEffect } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: 'pink',
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
}

const cameraRef = ref(null)

watchEffect(() => {
  if (cameraRef.value) {
    (cameraRef.value as Camera).lookAt(0, 5, 0)
  }
})

const { hasFinishLoading, progress } = await useProgress()

const { floor, segments, receiveShadow } = useControls({
  floor: { value: 1.5, min: 0, max: 5, step: 0.05 },
  segments: { value: 20, min: 1, max: 128, step: 1 },
  receiveShadow:  true,
})
</script>

<template>
  <div class="aspect-video w-full relative">
    <Transition
      name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-200"
      leave-active-class="opacity-0 transition-opacity duration-200"
    >
      <div
        v-show="!hasFinishLoading"
        class="absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
      >
        <div class="w-200px">
          Loading... {{ progress }} %
        </div>
      </div>
    </Transition>
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[0.07224002153117198, 2, 2.9469498522622626]"
        :rotation="[-0.04419077275543715, 0.025561987075415186, 0.0011302162688196786]"
        :fov="35"
      />
      <OrbitControls />
      <Suspense>
        <GLTFModel
          path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb"
          :rotation="[0, 0.5, 0]"
          :position="[0, 1, 0]"
          :scale="0.5"
          castShadow
          draco
        />
      </Suspense>
      <Backdrop
        :floor="floor"
        :segments="segments"
        :scale="[10, 3, 3]"
        :position="[0, 0, -3]"
        :receive-shadow="receiveShadow"
      >
        <TresMeshPhysicalMaterial
          :roughness="1"
          color="pink"
          :side="2"
        />
      </Backdrop>
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight
        :args="['white', 2]"
        cast-shadow
        :position="[3, 4, 4]"
        :look-at="[0, 0, 0]"
        :shadow-camera-near="0.5"
        :shadow-camera-left="-10"
      />
      <TresDirectionalLight
        :args="['pink', 1]"
        cast-shadow
        :position="[-3, 2, 4]"
        :look-at="[0, 0, 0]"
        :shadow-camera-near="0.5"
        :shadow-camera-left="-10"
      />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
