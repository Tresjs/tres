<script setup lang="ts">
import { Levioso, useGLTF } from '@tresjs/cientos'
import { shallowRef, watchEffect } from 'vue'

const { nodes } = await useGLTF('/feather.glb')

/* const feather = computed(() => nodes.Sketchfab_model)
 */

const featherRef = shallowRef()

watchEffect(() => {
  if (featherRef.value) {
    // eslint-disable-next-line no-console
    console.log(featherRef.value)
    featherRef.value.rotation.y = -Math.PI / 4
    featherRef.value.updateMatrixWorld()
    /*  featherRef.value.rotation.y = -Math.PI / 2
    featherRef.value.updateMatrixWorld() */
  }
})
</script>

<template>
  <Levioso
    :speed="4"
  >
    <primitive
      ref="featherRef"
      :object="nodes.Sketchfab_model"
      :position-y="-Math.PI / 4"
    />
  </Levioso>
  <!--  <TresMesh ref="featherRef" v-bind="feather"></TresMesh> -->
</template>
