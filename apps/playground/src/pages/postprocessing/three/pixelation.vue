<script lang="ts" setup>
import { TresLeches } from '@tresjs/leches'
import { Pixelation } from '@tresjs/post-processing'
import BasicScene from '../../../components/BasicScene.vue'
</script>

<template>
  <BasicScene>
    <template #effects>
      <Pixelation :pixel-size="16" />
    </template>
  </BasicScene>
</template>
