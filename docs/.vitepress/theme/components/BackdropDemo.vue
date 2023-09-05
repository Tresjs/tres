<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PCFSoftShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { useProgress, Backdrop, GLTFModel } from '@tresjs/cientos'
import { ref, watch, watchEffect } from 'vue'

const gl = {
  clearColor: 'pink',
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
}

const model = ref(null)

watch(model, ({ value }) => {
  value.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
    }
  })
})

function onCameraChange(e) {
  // eslint-disable-next-line no-console
  console.log('camera changed', e)
}

const cameraRef = ref(null)

watchEffect(() => {
  if (cameraRef.value) {
    cameraRef.value.lookAt(0, 5, 0)
  }
})

const { hasFinishLoading, progress, items } = await useProgress()
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
        :position="[0.07224002153117198, 0.5245876539770153, 2.9469498522622626]"
        :rotation="[-0.04419077275543715, 0.025561987075415186, 0.0011302162688196786]"
        :fov="35"
      />
      <Suspense>
        <GLTFModel
          ref="model"
          cast-shadow
          path="/card-bo-bot/CardBoBotv3.glb"
          draco
          :rotation="[0, 0.5, 0]"
        />
      </Suspense>
      <Backdrop
        :floor="1.5"
        :scale="[10, 3, 3]"
        :position="[0, 0, -3]"
        receive-shadow
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
        :shadow-map-size-width="256"
        :shadow-map-size-height="256"
        :shadow-camera-near="0.5"
        :shadow-camera-left="-10"
      />
      <TresDirectionalLight
        :args="['pink', 1]"
        cast-shadow
        :position="[-3, 2, 4]"
        :look-at="[0, 0, 0]"
        :shadow-map-size-width="256"
        :shadow-map-size-height="256"
        :shadow-camera-near="0.5"
        :shadow-camera-left="-10"
      />
    </TresCanvas>
  </div>
</template>
