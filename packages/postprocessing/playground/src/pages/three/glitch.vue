<script lang="ts" setup>
import { Glitch } from '@tresjs/post-processing'
import { ref } from 'vue'
import BasicScene from '../../components/BasicScene.vue'

const goWild = ref(false)
</script>

<template>
  <div class="absolute top-0 left-0 z-10">
    <input id="goWild" v-model="goWild" type="checkbox" />
    <label for="goWild">Go Wild</label>
  </div>
  <BasicScene>
    <template #effects>
      <Glitch :go-wild="goWild" />
    </template>
  </BasicScene>
</template>
