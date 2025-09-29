<script setup lang="ts">
import { useFBX } from '@tresjs/cientos'
import { type Group, Mesh } from 'three'

const model = await useFBX(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx',
)

const truckRef = shallowRef<Group | null>(null)

watch(truckRef, (truck) => {
  if (truck) {
    truck.scale.set(0.01, 0.01, 0.01)
    truck.position.set(0, -1.6, 0)
    truck.rotation.y = -Math.PI * 0.5
    truck.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
      }
    })
  }
})
</script>

<template>
  <primitive ref="truckRef" :object="model" />
</template>
