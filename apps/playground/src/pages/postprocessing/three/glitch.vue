<script lang="ts" setup>
import { Glitch } from '@tresjs/post-processing'
import BasicScene from '../../../components/BasicScene.vue'
import { useControls, TresLeches } from '@tresjs/leches';

const { goWild } = useControls({
  goWild: false,
}, {
  uuid: 'postprocessing-three-glitch',
})
</script>

<template>
  <TresLeches uuid="postprocessing-three-glitch" />

  <BasicScene>
    <template #effects>
      <Glitch :go-wild="goWild" />
    </template>
  </BasicScene>
</template>
