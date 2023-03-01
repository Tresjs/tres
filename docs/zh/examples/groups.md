# 分组 <Badge type="warning" text="^1.5.0" /> {#Group}

`<TresGroup>` 是 [THREE.Group](https://threejs.org/docs/#api/en/objects/Group) 的一个实例。**THREE.Group** 和 [THREE.Object3D](https://threejs.org/docs/#api/en/objects/Object3D) 几乎相同，但它允许**将场景中的多个对象组合在一起**，以便将它们作为一个整体进行操作（变换、旋转等）

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
