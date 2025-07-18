<script setup lang="ts">
import { extend, useTres } from '@tresjs/core'
import { OrbitControls } from 'three-stdlib'

const { camera, renderer } = useTres()
extend({ OrbitControls })
</script>

<template>
  <TresOrbitControls
    v-if="renderer"
    :args="[camera, renderer?.domElement]"
  />
</template>
