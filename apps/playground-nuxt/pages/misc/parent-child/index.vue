<script setup lang="ts">
import Child from './Child.vue'
const uuid = 'leches-basic-parent-child'

useControls('fpsgraph', { uuid })
</script>
<template>
  <TresLeches :uuid="uuid" class="z-20 top-20" />
  <TresCanvas window-size clear-color="#82DBC5">
    <Child/>
  </TresCanvas>
</template>