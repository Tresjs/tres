<script setup lang="ts">
import { Instance, useAnimations } from '@tresjs/cientos'
import { AnimationClip, VectorKeyframeTrack } from 'three'
import { ref, watch } from 'vue'

const BLADES = 4

// One track per blade, each targeting an <Instance> by name. Every blade is batched, so the
// mixer here is driving instanced geometry: four moving blades, one drawcall.
const clip = new AnimationClip('Spin', 2, Array.from({ length: BLADES }, (_, i) => new VectorKeyframeTrack(
  `Blade_${i}.position`,
  [0, 1, 2],
  [i * 1.2, 0, 0, i * 1.2, 2, 0, i * 1.2, 0, 0],
)))

const rootRef = ref()
const { actions } = useAnimations([clip], rootRef)

// `actions` is filled post-flush, so it is still empty in `onMounted`.
watch(() => actions.Spin, action => action?.play())
</script>

<template>
  <TresGroup ref="rootRef">
    <Instance
      v-for="i in BLADES"
      :key="i"
      batch="Blade"
      :name="`Blade_${i - 1}`"
    />
  </TresGroup>
</template>
