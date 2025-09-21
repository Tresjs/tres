<script setup lang="ts">
const insideLightRef = ref<TresObject | null>(null)

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (insideLightRef.value) {
    insideLightRef.value.intensity = Math.sin(elapsed) * 6 + 7
  }
  /* if (cameraRef.value) {
    cameraRef.value.lookAt(0, 1, 0)
  } */
})
</script>

<template>
  <TresPointLight
    ref="insideLightRef"
    color="#FF3F00"
    :scale="[0.5, 0.5, 0.5]"
    :intensity="5"
    :position="[0, 1.5, -0.3]"
    :distance="0"
    :decay="100"
    :shadow-mapSize-width="1024"
    :shadow-mapSize-height="1024"
    :shadow-camera-far="50"
    :shadow-camera-left="-10"
    :shadow-camera-right="10"
    :shadow-camera-top="10"
    :shadow-camera-bottom="-10"
    :shadow-bias="-0.000001"
    cast-shadow
  />
</template>