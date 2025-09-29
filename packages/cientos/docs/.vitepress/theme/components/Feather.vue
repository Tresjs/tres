<script setup lang="ts">
import { Levioso, useGLTF } from '@tresjs/cientos'
import { shallowRef, watchEffect } from 'vue'

const { state } = useGLTF('/feather.glb')

const featherRef = shallowRef()

watchEffect(() => {
  if (featherRef.value) {
    featherRef.value.rotation.y = -Math.PI / 4
    featherRef.value.updateMatrixWorld()
  }
})
</script>

<template>
  <Levioso
    :speed="4"
  >
    <primitive
      v-if="state?.scene"
      ref="featherRef"
      :object="state?.scene"
      :position-y="-Math.PI / 4"
    />
  </Levioso>
</template>
