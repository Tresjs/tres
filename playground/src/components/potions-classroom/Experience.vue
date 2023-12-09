<script setup lang="ts">
import { useTexture } from '@tresjs/core'

const tableTexture = await useTexture(['/models/potions-classroom/table.png'])
tableTexture.flipY = false
const roomTexture = await useTexture(['/models/potions-classroom/room.png'])
roomTexture.flipY = false
</script>

<template>
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
  </template>
</template>
