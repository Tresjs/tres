<script setup lang="ts">
import TheEnvironment from './TheEnvironment.vue'
</script>
<template>
  <div class="modal">
    <TheEnvironment />
  </div>
</template>

<style>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0;
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
</style>
