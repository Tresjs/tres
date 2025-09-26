<script setup lang="ts">
import TheBasic from '../misc/BrownianDistribution.vue'
</script>

<template>
  <div class="modal">
    <TheBasic />
  </div>
</template>

<style>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0;
  width: 600px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
</style>
