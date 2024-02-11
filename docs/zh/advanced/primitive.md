# Primitives

`<primitive />` 组件是 TresJS 中一种通用的底层组件，它允许您在 Vue 应用程序中直接使用任何 three.js 对象，而无需进行抽象。它是 Vue 响应式系统和 three.js 场景画面之间的桥梁。

## 使用方法

```html
<script setup lang="ts">
  // Import necessary three.js classes
  import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

  // Create a box geometry and a basic material
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });

  // Create a mesh with the geometry and material
  const meshWithMaterial = new Mesh(geometry, material);
</script>

<template>
  <TresCanvas>
    <primitive :object="meshWithMaterial" />
  </TresCanvas>  
</template>
```

## Props

`object`：这个 prop 接受一个 three.js Object3D 或其任何派生类。它是 `<primitive />` 组件将呈现的主要对象。在更新的示例中，一个被附加了 `Material` 的 `Mesh` 对象被传递给此 prop。

## 与模型一起使用

对于呈现复杂对象（如从外部加载的模型），`<primitive />` 组件尤其有用。下面的示例展示了如何从 GLTF 文件加载模型，并使用 `<primitive />` 组件对其进行渲染。

```html
<script lang="ts" setup>
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF('/models/AkuAku.gltf')
</script>

<TresCanvas>
  <Suspense>
    <primitive :object="nodes.AkuAku" />
  </Suspense>
</TresCanvas>
```
