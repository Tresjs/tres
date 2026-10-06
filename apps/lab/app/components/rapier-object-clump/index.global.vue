<script setup lang="ts">
</script>

<template>
  <TheLoadingScreen background="#dfdfdf" text-color="#000000" />
  <TresCanvas shadows window-size clear-color="#dfdfdf" :dpr="[1, 1.5]">
    <TresPerspectiveCamera :position="[0, 0, 20]" :fov="35" :near="1" :far="40" />
    <RapierObjectClumpTheRapierObjectClump />
    <TheScreenshot />
  </TresCanvas>
</template>
