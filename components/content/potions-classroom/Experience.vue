<script setup lang="ts">
import { useTexture } from '@tresjs/core'

const tableTexture = await useTexture(['/models/potions-classroom/table.png'])

const roomTexture = await useTexture(['/models/potions-classroom/room.png'])
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
