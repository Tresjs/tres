<script setup lang="ts">
/* eslint-disable no-console */
import { Html } from '@tresjs/cientos'
import { useTexture2 } from '@tresjs/core'

const [texture1, texture2] = useTexture2([
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Displacement.jpg',
])

const { state: texture1State, isLoading: texture1IsLoading, then } = texture1
const { state: texture2State, isLoading: texture2IsLoading } = texture2

then(() => {
  console.log('texture1 loaded')
})

const promise = new Promise(then) // TODO remove

await promise // TODO remove

const isLoading = computed(() => texture1IsLoading.value || texture2IsLoading.value) // TODO remove

const textures = computed(() => [texture1State.value, texture2State.value]) // TODO remove

watch(textures, (newVal) => {
  console.log('Multiple texture Async', newVal)
}, { immediate: true })

// eslint-enable no-console
</script>

<template>
  <TresMesh :position="[9, 1, 0]">
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        Multiple (async)
      </span>
    </Html>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial
      v-if="textures.length && textures[0] && textures[1]"
      :map="textures[0]"
      :displacement-map="textures[1]"
      :displacement-scale="0.1"
    />
  </TresMesh>
</template>
