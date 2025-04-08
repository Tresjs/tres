# useGraph

A composable that creates a named object/material collection from any `Object3D`

## Usage

```ts
import { useGraph } from '@tresjs/core'

const { nodes, materials, meshes } = useGraph(object3D)
```

## Return Value

Returns a computed ref containing a `TresObjectMap` with the following structure:

```ts
interface TresObjectMap {
  nodes: { [name: string]: Object3D }
  materials: { [name: string]: Material }
  meshes: { [name: string]: Mesh }
}
```

## Why use useGraph?

The `useGraph` composable is particularly useful when working with complex 3D models (like GLTF) because it:

1. **Simplifies Access**: Provides direct access to objects by name instead of traversing the scene graph manually
2. **Organizes Resources**: Automatically categorizes objects into nodes, materials, and meshes
3. **Improves Performance**: Caches the graph structure in a computed ref, preventing unnecessary recalculations
4. **Enables Easy Manipulation**: Makes it easy to find and modify specific parts of your 3D model

## Example

```vue
<script setup lang="ts">
import { useGraph, useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/path/to/model.gltf')
const { nodes, materials } = useGraph(scene)

// Access objects by name
const carBody = nodes.carBody
const paintMaterial = materials.paint
</script>
```

## Implementation Details

The composable uses an util function `buildGraph` internally to traverse the object hierarchy and create a map of:
- All named objects in the `nodes` object
- All unique materials in the `materials` object
- All meshes in the `meshes` object

This structure is particularly useful when working with models exported from 3D modeling software, as it maintains the naming conventions used in the original model.
