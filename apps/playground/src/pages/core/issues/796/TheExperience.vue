<script setup lang="ts">
import TheBox from './TheBox.vue'
</script>

<template>
  <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />
  <TheBox />
</template>
