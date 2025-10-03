<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { Mesh } from 'three'
import { watch } from 'vue'

const { state }
  = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf', { draco: true })

watch(state, (model) => {
  model.scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
    }
  })
})
</script>

<template>
  <primitive v-if="state" :object="state.scene" />
</template>
