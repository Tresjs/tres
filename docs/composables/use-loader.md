# useLoader

The `useLoader` composable provides a unified way to load external resources like models and textures in TresJS using any [Three.js loader](https://threejs.org/docs/#api/en/loaders/Loader). It handles loading states and properly manages resource disposal.

## Basic Usage

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const { state, isLoading } = useLoader(GLTFLoader, '/path/to/model.gltf')
```

For multiple models, you can create multiple loader instances:

```ts
const models = [
  '/path/to/model1.gltf',
  '/path/to/model2.gltf'
].map(path => useLoader(GLTFLoader, path))
```

You can also use the `useLoader` composable to load textures:

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

const { state: texture } = useLoader(TextureLoader, '/path/to/texture.jpg')
```

## Features

- 🔄 Reactive loading states
- 🎯 Type-safe loader handling
- 🧹 Automatic resource cleanup
- 🔌 Extensible loader configuration
- 🎮 Progress tracking support

## API

### Type Parameters

- `T extends TresObjectMap`: The type of the loaded resource (use `TresGLTF` for GLTF models)
- `Shallow extends boolean = false`: Whether to use shallow reactive state

### Arguments

| Name | Type | Description |
|------|------|-------------|
| `Loader` | `LoaderProto<T>` | The Three.js loader constructor to use |
| `path` | `MaybeRef<string>` | Path to the resource |
| `options?` | `TresLoaderOptions<T, Shallow>` | Optional configuration |

### Options

```ts
interface TresLoaderOptions<T extends TresObjectMap, Shallow extends boolean> {
  manager?: LoadingManager
  extensions?: (loader: TresLoader<T>) => void
  asyncOptions?: UseAsyncStateOptions<Shallow, any | null>
}
```

### Returns

Returns a `UseAsyncStateReturn` object containing:
- `state`: The loaded resource
- `isLoading`: Whether the resource is currently loading
- `error`: Any error that occurred during loading
- `execute`: Function to reload the resource

## Component Usage

You can use the `UseLoader` component to load a resource and use it in your template directly.

```vue
<script setup lang="ts">
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const url = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb'
</script>

<template>
  <UseLoader v-slot="{ state }" :loader="GLTFLoader" :path="url">
    <primitive v-if="state?.scene" :object="state.scene" />
  </UseLoader>
</template>
```

## Advanced Examples

### Using a Loading Manager

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { LoadingManager } from 'three'
import type { TresGLTF } from '@tresjs/core'

const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  console.log(`Loading file: ${url}. Loaded ${loaded} of ${total} files.`)
}

const { state } = useLoader<TresGLTF>(GLTFLoader, '/path/to/model.gltf', { manager })
```

### Loading Multiple Resources

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

const models = [
  '/path/to/model1.gltf',
  '/path/to/model2.gltf'
].map(path => useLoader(GLTFLoader, path))

// Check if all models are loaded
const allLoaded = computed(() =>
  models.every(({ isLoading }) => !isLoading.value)
)
```

## Best Practices

1. **Resource Cleanup**: The composable automatically handles resource disposal when the component is unmounted.

2. **Error Handling**: Always handle potential loading errors in production:
```ts
const { error, state } = useLoader(GLTFLoader, '/model.gltf')

watch(error, (err) => {
  if (err) { console.error('Failed to load model:', err) }
})
```

3. **Loading States**: Use the `isLoading` state to show loading indicators:
```vue
<template>
  <primitive v-if="!isLoading" :object="state.scene" />
</template>
```

4. **Type Safety**: Always use proper types for better type inference:
```ts
// For GLTF models
useLoader<GLTF>(GLTFLoader, '/model.gltf')

// For textures
useLoader<Texture>(TextureLoader, '/texture.jpg')
```

5. **Progress Tracking**: Use a loading manager for detailed progress tracking:
```ts
const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total) * 100
  console.log(`Loading: ${progress.toFixed(2)}%`)
}
```
