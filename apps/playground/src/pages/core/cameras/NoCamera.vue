<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PerspectiveCamera } from 'three'

const state = reactive({
  clearColor: '#4f4f4f',
  shadows: true,
  alpha: false,
})

const camera = new PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(13, 13, 13)
camera.lookAt(0, 0, 0)

const useOwnCamera = ref(false)
</script>

<template>
  <div>
    <input
      v-model="useOwnCamera"
      type="checkbox"
    />
    <div class="w-1/2 aspect-video">
      <TresCanvas
        v-bind="state"
        :camera="useOwnCamera ? camera : undefined"
      >
        <TresAmbientLight :intensity="0.5" />
        <TresMesh :position="[0, 4, 0]">
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshToonMaterial color="cyan" />
        </TresMesh>

        <TresDirectionalLight
          :position="[0, 2, 4]"
          :intensity="1"
        />
      </TresCanvas>
    </div>
  </div>
</template>
