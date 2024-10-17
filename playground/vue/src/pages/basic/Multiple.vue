<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { ref, shallowRef } from 'vue'

const boxRef = shallowRef(null)
const showBox = ref(true)

setInterval(() => {
  showBox.value = !showBox.value
}, 3000)
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="aspect-video">
      <TresCanvas clear-color="#fff">
        <TresPerspectiveCamera
          :position="[5, 5, 5]"
          :look-at="[0, 0, 0]"
        />

        <TresAmbientLight
          :intensity="0.5"
          color="red"
        />
        <TresMesh
          v-if="showBox"
          ref="boxRef"
          :position="[0, 2, 0]"
        >
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshNormalMaterial />
        </TresMesh>
        <TresDirectionalLight
          :position="[0, 2, 4]"
          :intensity="1"
          cast-shadow
        />
        <TresAxesHelper />
        <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
      </TresCanvas>
    </div>
    <div class="aspect-video">
      <TresCanvas clear-color="#000">
        <TresPerspectiveCamera
          :position="[5, 5, 5]"
          :look-at="[0, 0, 0]"
        />
        <TresMesh>
          <TresSphereGeometry :args="[1, 32, 32]" />
          <TresMeshNormalMaterial />
        </TresMesh>
        <TresAmbientLight
          :intensity="0.5"
          color="red"
        />
      </TresCanvas>
    </div>
  </div>
</template>
