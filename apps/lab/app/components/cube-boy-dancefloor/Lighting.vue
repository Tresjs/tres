<script setup lang="ts">

</script>
<template>
  <TresAmbientLight :intensity="0.4" />
  <TresDirectionalLight
    :position="[5, 5, 5]"
    :intensity="1"
    color="red"
    cast-shadow
  />
  <TresDirectionalLight
    :position="[-5, 5, -5]"
    :intensity="1"
    color="blue"
    cast-shadow
  />
</template>