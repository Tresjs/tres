<script setup lang="ts">
/* eslint-disable no-console */

import { useLoader } from '@tresjs/core'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

const { state, isLoading } = useLoader(
  FBXLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx',
)

watch(isLoading, (newIsLoading) => {
  console.log('newIsLoading', newIsLoading)
}, { immediate: true })

watch(state, (newState) => {
  console.log('newState', newState)
})
/* eslint-enable no-console */
</script>

<template>
  <primitive v-if="state" :object="state" :scale="0.01" />
</template>
