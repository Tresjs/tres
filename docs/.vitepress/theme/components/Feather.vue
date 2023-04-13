<script setup lang="ts">
import { computed } from 'vue'
import { useGLTF, TorusKnot, Levioso } from '/@'
import { shallowRef } from 'vue'
import { watchEffect } from 'vue'
const { scene, nodes } = await useGLTF('/feather.glb')

const feather = computed(() => nodes.Sketchfab_model)

const featherRef = shallowRef()

watchEffect(() => {
  if (featherRef.value) {
    featherRef.value.rotationY = -Math.PI / 2
    featherRef.value.updateMatrixWorld()
  }
})
</script>
<template>
  <Levioso ref="groupRef" speed="4">
    <TresMesh ref="featherRef" v-bind="feather"></TresMesh>
  </Levioso>
  <!--  <TresMesh ref="featherRef" v-bind="feather"></TresMesh> -->
</template>
