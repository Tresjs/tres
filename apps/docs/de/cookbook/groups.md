---
title: Gruppen
description: Erfahre, wie man mehrere Objekte in der Szene gruppieren kann.
author: alvarosabu
thumbnail: /recipes/groups.png
difficulty: 0
---

# Gruppen

Eine `<TresGroup>` ist eine Instanz der Klasse [THREE.Group](https://threejs.org/docs/#api/en/objects/Group), die fast das Gleiche wie ein [THREE.Object3D](https://threejs.org/docs/#api/en/objects/Object3D) ist. Sie ermöglicht es dir, **mehrere Objekte in der Szene zu gruppieren**, sodass sie gebündelt manipuliert werden können (Transformation, Rotation, etc...)."

## Benutzung

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
