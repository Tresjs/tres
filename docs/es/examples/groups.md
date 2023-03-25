# Group <Badge type="warning" text="^1.5.0" />

Un `<TresGroup>` es una instancia de la clase [THREE.Group](https://threejs.org/docs/#api/en/objects/Group) que es casi igual a un [THREE.Object3D](https://threejs.org/docs/#api/en/objects/Object3D) pero te permite **juntar objectos múltiples en la escena** para que pueden ser manipulados como una unidad singular (transformación, rotación, etc).

<StackBlitzEmbed projectId="tresjs-groups" />

## Utilización

```vue{12,21}
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
</template>
```
