---
title: Groups
description: Leer hoe je meerdere objecten kunt groeperen in de scene.
author: alvarosabu
thumbnail: /recipes/groups.png
difficulty: 0
---

# Groep

Een `<TresGroup>` is een instantie van de [THREE.Group](https://threejs.org/docs/#api/en/objects/Group) klasse die bijna gelijk is aan [THREE.Object3D](https://threejs.org/docs/#api/en/objects/Object3D) maar je in staat stelt om **meerdere objecten samen te groeperen in de scene** zodat deze tegelijk gemanipuleerd kunnen worden als een enkele unit. (transform, rotation, etc).

## Gebruik

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
