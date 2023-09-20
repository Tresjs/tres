<script setup lang="ts">
const gl = {
  shadows: true,
  alpha: false,
  windowSize: true,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 0, 6]"
      :fov="75"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />

    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
  </TresCanvas>
</template>
