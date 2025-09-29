<script setup lang="ts">
import { Html, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { reactive, ref } from 'vue'
import Card from './Card.vue'
import '@tresjs/leches/styles'

const sphereRef = ref(null)
const torusRef = ref(null)

const state = reactive({
  wrapperClass: 'wrapper',
  as: 'div',
  center: true,
})

const isActive = ref(false)
const { showHtml } = useControls({
  showHtml: false,
})
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#82DBC5" shadows>
    <TresPerspectiveCamera :position="[3, 0, 8]" />
    <OrbitControls />
    <TresMesh
      :position="[1, 1, 1]"
      @click="isActive = !isActive"
    >
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html
        v-if="showHtml"
        v-bind="state"
        transform
        :occlude="[sphereRef]"
      >
        <h1
          class="text-xs p-0.5 rounded"
          :class="isActive ? 'bg-dark' : 'bg-white'"
        >
          Box
        </h1>
      </Html>
    </TresMesh>
    <TresMesh
      ref="sphereRef"
      :position="[4, 1, 1]"
    >
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
      <Html
        v-bind="state"
        transform
        :position="[0.5, 1, 0]"
      >
        <Card :active="isActive" />
      </Html>
    </TresMesh>
    <TresMesh
      ref="torusRef"
      :position="[7, 1, 1]"
    >
      <Html :position="[0.5, 1, 0]">
        <Card :active="isActive" />
      </Html>
      <TresTorusGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<style scoped>
.web {
  width: 600px;
  height: 400px;
  border-radius: 10px;
}
</style>
