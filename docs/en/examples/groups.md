# Group <Badge type="warning" text="^1.5.0" />

A `<TresGroup>` is an instance of the [THREE.Group](https://threejs.org/docs/#api/en/objects/Group) class which is almost the same as a [THREE.Object3D](https://threejs.org/docs/#api/en/objects/Object3D) but allows you to **group together multiple objects in the scene** so that they can be manipulated as a single unit (transform, rotation, etc).

<StackBlitzEmbed projectId="tresjs-groups" />

## Usage

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
