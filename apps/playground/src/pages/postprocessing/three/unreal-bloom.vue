<script lang="ts" setup>
import { UnrealBloom } from '@tresjs/post-processing'
import { ref } from 'vue'
import BasicScene from '@/components/BasicScene.vue'
import { useControls, TresLeches } from '@tresjs/leches';

const { enabled, radius, strength, threshold } = useControls({
  enabled: true,
  radius: { value: 0.85, min: 0, max: 1, step: 0.01 },
  strength: { value: 0.4, min: 0, max: 1, step: 0.01 },
  threshold: { value: 0.1, min: 0, max: 1, step: 0.01 },
}, {
  uuid: 'postprocessing-three-unreal-bloom',
})
</script>

<template>
  <TresLeches uuid="postprocessing-three-unreal-bloom" />
  <BasicScene>
    <template #effects>
      <UnrealBloom v-if="enabled" :radius="radius" :strength="strength" :threshold="threshold" />
    </template>
  </BasicScene>
</template>
