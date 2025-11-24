<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Image } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    
    <Image
      url="https://upload.wikimedia.org/wikipedia/commons/f/f0/Cyanistes_caeruleus_Oulu_20150516.JPG"
      :scale="[2, 2]"
    />
  </TresCanvas>
</template>
