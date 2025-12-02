<script setup lang="ts">

</script>
<template>
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight :position="[0, 10, 0]" :intensity="1" />
  <CoffeeSmokeTheModel />
  <CoffeeSmokeTheSmoke />
</template>