# Primitives

The `<primitive />` component is a versatile low-level component in TresJS that allows you to directly use any [three.js](https://threejs.org/) object within your Vue application without an abstraction. It acts as a bridge between Vue's reactivity system and THREE's scene graph.

## Usage

```html
<script setup lang="ts">
  // Import necessary three.js classes
  import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

  // Create a box geometry and a basic material
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00ff00 })

  // Create a mesh with the geometry and material
  const meshWithMaterial = new Mesh(geometry, material)
</script>

<template>
  <primitive :object="meshWithMaterial" />
</template>
```

## Props

- `object`: This prop expects either a plain or a reactive three.js [Object3D](https://threejs.org/docs/index.html?q=Object#api/en/core/Object3D) (preferably a [shallowRef](https://vuejs.org/api/reactivity-advanced.html#shallowref)) or any of its derived classes. It is the primary object that the `<primitive />` component will render. In the updated example, a `Mesh` object with an associated `Material` is passed to this prop.

## Events

The same pointer events available on the TresJS components are available on the `<primitive />` component. You can use these events to interact with the object in the scene. See the complete list of events [here](/api/events).

```html
<template>
  <primitive
    :object="meshWithMaterial"
    @click="onClick"
    @pointermove="onPointerMove"
  />
</template>
```

## Passing childrens via slots

You can also pass children to the `<primitive />` component using slots. This is useful when you want to add additional objects to the scene that are not part of the main object.

```html
<template>
  <primitive :object="meshWithOnlyGeometry">
    <MeshBasicMaterial :color="0xff0000" />
  </primitive>
</template>
```

## Usage with Models

The `<primitive />` component is especially useful for rendering complex objects like models loaded from external sources. The following example shows how to load a model from a GLTF file and render it using the `<primitive />` component.

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
