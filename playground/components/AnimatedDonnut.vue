<script setup lang="ts">
defineProps<{
  color: string
}>()

const donutRef = ref()

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (donutRef.value) {
    donutRef.value.rotation.x += delta
    donutRef.value.rotation.y += delta
  }
})
</script>

<template>
  <TresMesh ref="donutRef">
    <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
    <TresMeshBasicMaterial :color="color" />
  </TresMesh>
</template>
