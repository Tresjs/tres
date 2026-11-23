<script setup lang="ts">
import { Environment } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'

const props = withDefaults(defineProps<{ preset?: string, color?: string }>(), {
  preset: 'dawn',
  color: '#ffffff',
})

const obj = ref()
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  if (obj.value) {
    obj.value.rotation.x += delta * 0.6
    obj.value.rotation.y += delta * 0.4
  }
})
</script>

<template>
  <!-- Each portal's <Environment> configures ITS OWN scene, thanks to the context
       override in MeshPortalMaterial. If the override were broken, every portal
       would instead show the world's environment. -->
  <Suspense>
    <Environment :preset="(props.preset as any)" :background="true" />
  </Suspense>

  <TresAmbientLight :intensity="0.25" />

  <!-- Metallic surface so the portal's own IBL is visible as reflections -->
  <TresMesh ref="obj" :position="[0, 0.1, -1]">
    <TresTorusKnotGeometry :args="[0.5, 0.2, 128, 32]" />
    <TresMeshStandardMaterial :color="props.color" :metalness="0.8" :roughness="0.12" />
  </TresMesh>

  <TresMesh :position="[0, -1.2, 0]" :rotation="[-Math.PI / 2, 0, 0]">
    <TresPlaneGeometry :args="[12, 12]" />
    <TresMeshStandardMaterial color="#1a1a20" :roughness="0.4" :metalness="0.2" />
  </TresMesh>
</template>
