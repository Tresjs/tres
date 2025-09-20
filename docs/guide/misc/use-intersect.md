# useIntersect

`useIntersect` is a function that returns `intersect`, a `Ref<boolean>` that's updated when the observed object enters or leaves the screen. This relies on [THREE.Object3D.onBeforeRender](https://threejs.org/docs/#api/en/core/Object3D.onBeforeRender) so it only works on objects that are effectively rendered, like meshes, lines, sprites. It won't work on other types like group, object3d, bone, etc.

## Usage

::: warning
`useIntersect` requires a `TresCanvas` context, so it is only available in `TresCanvas` descendant components' `<script setup>`.
:::

```vue
<script setup lang="ts">
import { Torus, useIntersect } from '@tresjs/cientos'

const { ref, intersect, off } = useIntersect()
</script>

<template>
  <Torus ref="ref">
    <TresMeshNormalMaterial />
  </Torus>
</template>
```

## Arguments

| Name         | Description |  Type       |
| :----------- | ----------- | ----------- |
| **onChange** | Optional callback function triggered when the observed object enters or leaves the screen. | `(isIntersected: boolean) => void` |

## Return

| Name         | Description |  Type       |
| :----------- | ----------- | ----------- |
| **ref** | Vue `ShallowRef` to pass to the object to be observed. | `ShallowRef<Object3D>` |
| **intersects** | Updates when the observed object's intersect status changes. | `ShallowRef<boolean>` |
| **off** | Calling this function stops `useIntersect` until `ref` changes. | `() => void` |
