<script lang="ts" setup>
import { useLoader } from '@tresjs/core'
import { USDZLoader } from 'three/addons/loaders/USDZLoader.js'

const res = await useLoader(
  USDZLoader,
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/usdz/saeukkang.usdz',
)

console.log(res)
</script>

<template>
  <primitive :object="res" />
</template>
