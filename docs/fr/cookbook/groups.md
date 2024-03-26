---
title: Groupes
description: Apprenez à regrouper plusieurs objets dans la scène.
author: alvarosabu
thumbnail: /recipes/groups.png
difficulty: 0
---

# Groupes

Un `<TresGroup>` est une instance de la classe [THREE.Group](https://threejs.org/docs/#api/en/objects/Group) qui est quasiment la même que [THREE.Object3D](https://threejs.org/docs/#api/en/objects/Object3D) mais qui permet de **regrouper plusieurs objets dans la scène** afin qu'ils puissent être manipulés comme une seule unité (transformation, rotation, etc.).

## Usage

```vue{13,22}
<script setup lang="ts">
const groupRef = ref()
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
