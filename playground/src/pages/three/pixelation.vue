<script lang="ts" setup>
import { PixelationThree } from '@tresjs/post-processing'
import BasicScene from '../../components/BasicScene.vue'
</script>

<template>
  <BasicScene>
    <template #effects>
      <PixelationThree :pixel-size="16" />
    </template>
  </BasicScene>
</template>
