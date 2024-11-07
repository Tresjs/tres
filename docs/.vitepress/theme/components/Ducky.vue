<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene: model }
  = await useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf', { draco: true })
</script>

<template>
  <primitive :object="model" />
</template>
