# useLoader

The `useLoader` composable provides a unified way to load external resources using THREE.js loaders. This composable offers a flexible API to load single or multiple resources with built-in state management and error handling.

## Features

* 🔄 Reactive resource loading
* 🔢 Support for single or multiple resources
* ⏳ Loading state tracking
* ❌ Error handling
* ⏱️ Async/await support with Suspense
* 🛠️ Support for any THREE.js loader
* 🔍 Automatic object traversal for GLTF models

## Basic Usage

```ts
import { type TresGLTF, useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
```

### Loading a Single Model

```ts
const { data: model } = useLoader<TresGLTF>(GLTFLoader, 'path/to/model.glb')
```

### Loading Multiple Models

```ts
const { data: models } = useLoader<TresGLTF>(GLTFLoader, [
  'path/to/model1.glb',
  'path/to/model2.glb'
])

// Access individual models
const [model1, model2] = models.value
```

## Advanced Usage

### With Async/Await and Suspense

The composable can be awaited directly, making it compatible with Vue's Suspense component:

```ts
// In an async setup function
const { data: model } = await useLoader<TresGLTF>(GLTFLoader, 'path/to/model.glb')
```

### Using Extensions

You can extend the loader's functionality using the extensions parameter:

```ts
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const { data: model } = useLoader<TresGLTF>(
  GLTFLoader,
  'path/to/model.glb',
  (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
  }
)
```

### Handling Loading States

The composable provides reactive references for tracking loading state:

```ts
const { data: model, isLoading, error } = useLoader<TresGLTF>(GLTFLoader, 'path/to/model.glb')

watch(isLoading, (value) => {
  if (value) {
    console.log('Model is loading...')
  }
})

watch(error, (value) => {
  if (value) {
    console.error('Error loading model:', value)
  }
})
```

### Manual Loading

```ts
const { data: model, load } = useLoader<TresGLTF>(GLTFLoader, 'path/to/initial-model.glb')

// Later, load a different model
const newModel = await load('path/to/new-model.glb')

// Or load multiple models
const newModels = await load([
  'path/to/model1.glb',
  'path/to/model2.glb'
])
```

## Common Use Cases

### Loading GLTF Models

```ts
const { data: gltf } = useLoader<TresGLTF>(GLTFLoader, 'models/scene.glb')

// Access the scene
const model = computed(() => gltf.value?.scene)

// Access specific nodes or materials
const { nodes, materials } = gltf.value || {}
```

### Loading FBX Models

```ts
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const { data: fbx } = useLoader(FBXLoader, 'models/character.fbx')
```

### Loading OBJ Models

```ts
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const { data: obj } = useLoader(OBJLoader, 'models/mesh.obj')
```

## API Reference

### Parameters

| Parameter   | Type                                    | Description                                |
|------------|----------------------------------------|-------------------------------------------|
| Loader     | LoaderProto<T>                         | THREE.js loader class                     |
| path       | string \| string[]                     | Path or array of paths to resource file(s) |
| extensions | (loader: TresLoader<T>) => void        | Optional loader extensions function        |
| onProgress | (event: ProgressEvent) => void         | Optional progress callback                |
| cb         | (proto: TresLoader<T>) => void         | Optional loader configuration callback     |

### Returns

| Property  | Type                          | Description                                    |
|-----------|-------------------------------|------------------------------------------------|
| data      | Ref<T \| T[] \| null>        | The loaded resource(s)                         |
| isLoading | Ref<boolean>                  | Whether the resource is currently loading      |
| error     | Ref<Error \| null>            | Any error that occurred during loading         |
| promise   | Promise<T \| T[]>             | Promise that resolves when loading completes   |
| load      | Function                      | Method to manually load resource(s)            |

## Notes

* Resources are loaded asynchronously and can be used with Vue's Suspense component
* The composable uses `shallowRef` for better performance when dealing with complex THREE.js objects
* For GLTF models, nodes and materials are automatically traversed and made available
* Error handling is built-in, with detailed error messages available in the `error` ref

## Component Usage

The `UseLoader` component provides a slot-based API for loading resources directly in your template:

```vue
<script setup lang="ts">
import { UseLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const url = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb'
</script>

<template>
  <UseLoader
    v-slot="{ data }"
    :loader="GLTFLoader"
    :url="url"
    @loaded="onLoaded"
    @error="onError"
  >
    <primitive v-if="data?.scene" :object="data.scene" />
  </UseLoader>
</template>
```

The component provides the loaded resource(s) through its default slot prop. This approach is particularly useful when:

* You want to scope resource loading to a specific part of your scene
* You need to ensure a mesh and its resources are loaded together
* You prefer a more declarative template-based approach

The slot provides the same properties as the composable (`data`, `isLoading`, `error`).

### Events

The component emits the following events:

| Event   | Payload | Description                          |
|---------|---------|--------------------------------------|
| loaded  | void    | Emitted when loading completes       |
| error   | Error   | Emitted when an error occurs         |
