<script setup lang="ts">
import { shallowRef } from 'vue'
import type { Points } from 'three'
import { Stars } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'

const star = shallowRef()

const options = reactive({
  size: 4,
  sizeAttenuation: true,
  count: 50000,
  depth: 50,
  radius: 1000,
})

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  (star.value.instance as Points).rotation.y += 0.003
})
</script>

<template>
  <Stars
    ref="star"
    :radius="options.radius"
    :depth="options.depth"
    :count="options.count"
    :size="options.size"
    :size-attenuation="options.sizeAttenuation"
  />
</template>
