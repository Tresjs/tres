<script setup lang="ts">
const { state: tableTexture, isReady: isTableTextureReady } = useTexture('/models/potions-classroom/table.png')
const { state: roomTexture, isReady: isRoomTextureReady } = useTexture('/models/potions-classroom/room.png')

watch(tableTexture, (texture) => {
  texture.flipY = false
})

watch(roomTexture, (texture) => {
  texture.flipY = false
})
</script>

<template>
  <template v-if="isTableTextureReady && isRoomTextureReady">
    <PotionsClassroomRoom :texture="roomTexture" />
    <PotionsClassroomBricks :texture="roomTexture" />
    <PotionsClassroomTable :texture="tableTexture" />
    <PotionsClassroomStands :texture="roomTexture" />
    <PotionsClassroomBooks :texture="tableTexture" />
    <PotionsClassroomBottles />
    <PotionsClassroomChalkboard :texture="roomTexture" />
    <PotionsClassroomCauldron :texture="tableTexture" />
    <PotionsClassroomWindows :texture="tableTexture" />
    <PotionsClassroomSkulls />
    <PotionsClassroomFloatingCandles />
    <PotionsClassroomMortar :texture="tableTexture" />
    <PotionsClassroomLamp :texture="tableTexture" />
    <PotionsClassroomJars />
  </template>
</template>
