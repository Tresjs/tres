# Primitives

The `<primitive />` component is a versatile  is a low-level component in TresJS that allows you to directly use any Three.js object within your Vue application without any abstraction. It acts as a bridge between Vue's reactivity system and Three.js's scene graph.

## Usage

```html
<script setup lang="ts">
  // Import necessary Three.js classes
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

`object`: This prop expects a Three.js Object3D or any of its derived classes. It is the primary object that the `<primitive />` component will render. In the updated example, a `Mesh` object with an associated `Material` is passed to this prop.

## Usage with Models 

The `<primitive />` component is speciallly usefull to render complex objects like models loaded from external sources. The following example shows how to load a model from a GLTF file and render it using the `<primitive />` component.

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
