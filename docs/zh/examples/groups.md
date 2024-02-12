# 组

`<TresGroup>` 是一个 [THREE.Group](https://threejs.org/docs/#api/zh/objects/Group) 类的实例，它与 [THREE.Object3D](https://threejs.org/docs/#api/zh/objects/Object3D) 非常相似，但允许您将 场景中的多个对象分组在一起，以便将它们作为一个整体进行操作（变换、旋转等）。

## 使用方法

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
