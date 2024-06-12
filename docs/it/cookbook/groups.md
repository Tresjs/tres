---
title: Gruppi
description: Scopri come raggruppare più oggetti nella scena.
author: alvarosabu
thumbnail: /recipes/groups.png
difficulty: 0
---

# Gruppo

A `<TresGroup>` è un'istanza della classe [THREE.Group] (https://threejs.org/docs/#api/en/Objects/Group) che è quasi la stessa di una [THREE.Object3D](https:///threejs.org/docs/#api/en/objects/Object3D) ma permette di **raggruppare più oggetti nella scena** in modo che possano essere manipolati come una singola unità (trasformazione, rotazione, ecc.).

## Utilizzo

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
