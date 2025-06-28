---
title: Groups
description: Learn how to group multiple objects in the scene.
author: alvarosabu
thumbnail: /recipes/groups.png
difficulty: 0
---

# Group

A `<TresGroup>` is an instance of the [THREE.Group](https://threejs.org/docs/#api/en/objects/Group) class which is almost the same as a [THREE.Object3D](https://threejs.org/docs/#api/en/objects/Object3D) but allows you to **group together multiple objects in the scene** so that they can be manipulated as a single unit (transform, rotation, etc).

## Usage

```vue{13,22}
<script setup lang="ts">
const groupRef = shallowRef()
const { onLoop } = useRenderLoop()

onLoop(() => {
  if (groupRef.value) {
    groupRef.value.rotation.y += 0.01
  }
})
</script>
<template>
  <TresCanvas>
    <TresGroup ref="groupRef" :position="[2,0,0]">
      <TresMesh>
        <TresBoxGeometry />
        <TresMeshBasicMaterial color="red" />
      </TresMesh>
      <TresMesh>
        <TresSphereGeometry />
        <TresMeshBasicMaterial color="blue" />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>
```
