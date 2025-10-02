<script setup lang="ts">
// NOTE:
// Based on https://github.com/pmndrs/drei/blob/master/src/core/ScreenQuad.tsx
// reference https://medium.com/@luruke/simple-postprocessing-in-three-js-91936ecadfb7
// and @gsimone ;)
import * as THREE from 'three'
import { shallowRef } from 'vue'

const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([-1, -1, 3, -1, -1, 3])
geometry.boundingSphere = new THREE.Sphere()
geometry.boundingSphere.set(new THREE.Vector3(), Infinity)
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 2))

const meshRef = shallowRef()
defineExpose({ instance: meshRef })
</script>

<template>
  <TresMesh ref="meshRef" :geometry="geometry" :frustum-culled="false">
    <slot></slot>
  </TresMesh>
</template>
