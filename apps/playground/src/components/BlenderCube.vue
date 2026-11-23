<script setup lang="ts">
import { Mesh } from 'three'
import { useGLTF } from '@tresjs/cientos'
import { whenever } from '@vueuse/core'

const emit = defineEmits<{
  ready: []
}>()
const { nodes, isReady } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
const model = computed(() => nodes.value.BlenderCube)

defineExpose({
  model,
})

watch(model, (model) => {
  if (model) {
    model.traverse((node) => {
      if (node instanceof Mesh) {
        node.castShadow = true
      }
    })
  }
})

whenever(
  isReady,
  () => emit('ready'),
  { once: true },
)
</script>

<template>
  <TresGroup :position="[0, 1, 0]">
    <primitive v-if="model" :object="model" />
  </TresGroup>
</template>
