<script lang="ts" setup>
import { Output, SMAA } from '@tresjs/post-processing'
import { ref } from 'vue'
import BasicScene from '../../components/BasicScene.vue'

const enabled = ref(true)
</script>

<template>
  <div class="absolute top-0 left-0 z-10">
    <input v-model="enabled" type="checkbox" /> enabled
  </div>
  <BasicScene wireframe>
    <template #effects>
      <SMAA v-if="enabled" />
      <Output />
    </template>
  </BasicScene>
</template>
