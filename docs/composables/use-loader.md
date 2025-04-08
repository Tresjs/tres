# useLoader

  The `useLoader` composable provides a unified way to load external resources like models in TresJS using any [Three.js loader](https://threejs.org/docs/#api/en/loaders/Loader). It handles both single and multiple resources, provides loading states, and properly manages resource disposal.

## Basic Usage

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Single model
const gltf = useLoader(GLTFLoader, '/path/to/model.gltf')

// Multiple models
const models = useLoader(GLTFLoader, [
  '/path/to/model1.gltf',
  '/path/to/model2.gltf'
])
```

## Features

- 🔄 Reactive loading states
- 🎯 Type-safe loader handling
- 📦 Support for single or multiple resources
- 🧹 Automatic resource cleanup
- 🔌 Extensible loader configuration
- 🎮 Progress tracking support

## API

### Type Parameters

- `T extends TresObjectMap`: The type of the loaded resource
- `G extends MaybeRef<ModelPath>`: The type of the path (string or string[])
- `Shallow extends boolean = false`: Whether to use shallow reactive state

### Arguments

| Name | Type | Description |
|------|------|-------------|
| `Loader` | `LoaderProto<T>` | The Three.js loader constructor to use |
| `path` | `G` | Path or array of paths to the resource(s) |
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

The return type depends on whether you're loading a single resource or multiple resources:

- Single resource: `UseAsyncStateReturn<T, [ModelPath], Shallow>`
- Multiple resources: `UseAsyncStateReturn<T, [ModelPath], Shallow>[]`

Each state object contains:
- `state`: The loaded resource
- `isReady`: Whether the resource has finished loading
- `error`: Any error that occurred during loading
- `execute`: Function to reload the resource

## Component Usage

TresJS provides a component wrapper for the `useLoader` composable:

```vue
<script setup lang="ts">
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
</script>

<template>
  <TresLoader
    :loader="GLTFLoader"
    path="/path/to/model.gltf"
    @loaded="onLoaded"
    @error="onError"
  >
    <template #default="{ state, isReady, error }">
      <div v-if="!isReady">Loading...</div>
      <div v-else-if="error">Error loading model</div>
      <primitive v-else :object="state.scene" />
    </template>
  </TresLoader>
</template>
```

### Component Props

| Name | Type | Description |
|------|------|-------------|
| `loader` | `LoaderProto<T>` | The Three.js loader constructor |
| `path` | `string \| string[]` | Path or array of paths to resource(s) |
| `manager?` | `LoadingManager` | Optional THREE.js LoadingManager |

### Component Events

| Name | Type | Description |
|------|------|-------------|
| `loaded` | `(result: T \| T[]) => void` | Emitted when resource(s) load successfully |
| `error` | `(error: unknown \| unknown[]) => void` | Emitted when loading fails |

## Advanced Examples

### Using a Loading Manager

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { LoadingManager } from 'three'

const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  console.log(`Loading file: ${url}. Loaded ${loaded} of ${total} files.`)
}

const gltf = useLoader(GLTFLoader, '/path/to/model.gltf', { manager })
```

### With DRACO Compression

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const gltf = useLoader(GLTFLoader, '/model.gltf', {
  extensions: (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
  }
})
```

### Loading Multiple Resources

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

const textures = useLoader(TextureLoader, [
  '/texture1.jpg',
  '/texture2.jpg'
])

// Check if all textures are loaded
const allLoaded = computed(() =>
  textures.every(({ isReady }) => isReady.value)
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

3. **Loading States**: Use the `isReady` state to show loading indicators:
```vue
<template>
  <div v-if="!isReady">Loading...</div>
  <primitive v-else :object="state.scene" />
</template>
```

4. **Type Safety**: Leverage TypeScript for better type inference:
```ts
useLoader<GLTF>(GLTFLoader, '/model.gltf')
```

5. **Progress Tracking**: Use a loading manager for detailed progress tracking:
```ts
const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total) * 100
  console.log(`Loading: ${progress.toFixed(2)}%`)
}
```
