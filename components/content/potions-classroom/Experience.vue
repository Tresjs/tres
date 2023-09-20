<script setup lang="ts">
const tableTexture = await useTexture(['/models/potions-classroom/table.png'])
tableTexture.flipY = false
const roomTexture = await useTexture(['/models/potions-classroom/room.png'])
roomTexture.flipY = false
</script>

<template>
  <Suspense>
    <template v-if="tableTexture">
      <Table :texture="tableTexture" />
      <Room :texture="roomTexture" />
      <Cauldron :texture="tableTexture" />
      <Stands :texture="roomTexture" />
      <Bricks :texture="roomTexture" />
      <Books :texture="tableTexture" />
      <Bottles />
      <Chalkboard :texture="roomTexture" />
      <Lamp :texture="tableTexture" />
      <Mortar :texture="tableTexture" />
      <Windows :texture="tableTexture" />
      <Skulls :texture="tableTexture" />
      <FloatingCandles />
      <Jars />
      <!-- <Cauldron :texture="tableTexture" />
        <Stands :texture="roomTexture" />
        <Bricks :texture="roomTexture" />
        <Books :texture="tableTexture" />
        <Bottles />
        <Skulls :texture="tableTexture" />
        <Lamp :texture="tableTexture" />
        <Mortar :texture="tableTexture" />
        <Windows :texture="tableTexture" />
        <Chalkboard :texture="roomTexture" /> -->
    </template>
  </Suspense>
</template>
