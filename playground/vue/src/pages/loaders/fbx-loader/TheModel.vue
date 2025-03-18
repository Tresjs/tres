<script setup lang="ts">
import { useLoader } from '@tresjs/core'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import type { Group } from 'three'

const { data } = await useLoader<Group>(
  FBXLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx',
)
</script>

<template>
  <primitive v-if="data" :object="data" :scale="0.01" />
</template>
