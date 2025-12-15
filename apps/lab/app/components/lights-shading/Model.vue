<script setup lang="ts">
import { Mesh, type ShaderMaterial } from 'three';

const props = defineProps<{
  material: ShaderMaterial
}>()

const { nodes } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })

const cube = computed(() => nodes.value.BlenderCube)

const { onBeforeRender } = useLoop()

onBeforeRender(({delta}) => {
  if (cube.value) {
    cube.value.rotation.y += delta * 0.5
    cube.value.rotation.x += delta * 0.5
  }
})

watch(cube, (newCube) => {
  if (newCube) {
    newCube.children.forEach((child: TresObject) => {
      if (child instanceof Mesh) {
        child.material = props.material
      }
    })
  }
}, { immediate: true })

</script>

<template>
  <primitive v-if="cube" :object="cube" />
</template>