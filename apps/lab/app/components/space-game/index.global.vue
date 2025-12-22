<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { SRGBColorSpace, NoToneMapping } from 'three'
import { onMounted, provide, shallowRef } from 'vue'
import { gameStore } from './GameStore'


provide('gameStore', gameStore)
const camera = shallowRef()
onMounted(() => { gameStore.actions.init(camera.value) })
</script>

<template>
  <div class="full-screen" @pointermove="gameStore.actions.updateMouse" @pointerdown="gameStore.actions.shoot">
    <TresCanvas clear-color="#010104" :linear="true" :flat="true" :antialias="false" :tone-mapping="NoToneMapping"
      :output-ecoding="SRGBColorSpace" :shadows="true">
      <TresPerspectiveCamera ref="camera" :position="[0, 0, 2000]" :near="0.01" :far="20000"
        :fov="gameStore.mutation.fov" />
      <TresFog color="#121225" :near="150" :far="600" />
      <SpaceGameTheExperience />
      <TheScreenshot />
    </TresCanvas>
    <SpaceGameHud />
  </div>
</template>

<style scoped>
.full-screen {
  width: 100vw;
  height: 100vh;
}
</style>
