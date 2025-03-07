# useTexture

The `useTexture` composable allows you to load textures using the [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader). This composable provides a convenient way to load single or multiple textures with built-in loading state management.

## Features

- 🔄 Reactive texture loading
- 🔢 Support for single or multiple textures
- ⏳ Loading state tracking
- ❌ Error handling
- ⏱️ Async/await support with Suspense
- 🔄 Manual reload capability

## Basic Usage

```ts
import { useTexture } from '@tresjs/core'
```

### Loading a Single Texture

```ts
const { data: texture } = useTexture('path/to/texture.png')
```

### Loading Multiple Textures

```ts
const { data: textures } = useTexture([
  'path/to/albedo.png',
  'path/to/normal.png',
  'path/to/roughness.png'
])

// Access individual textures
const [albedo, normal, roughness] = textures.value
```

## Advanced Usage

### With Async/Await and Suspense

The composable can be awaited directly, making it compatible with Vue's Suspense component:

```ts
// In an async setup function
const { data: texture } = await useTexture('path/to/texture.png')
```

### Using a Custom Loading Manager

You can provide a THREE.js LoadingManager to track loading progress across multiple resources:

```ts
import { LoadingManager } from 'three'

const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  console.log(`Loading ${url}: ${loaded} of ${total} files.`)
}

const { data: texture } = useTexture('path/to/texture.png', manager)
```

### Handling Loading States

The composable provides reactive references for tracking loading state:

```ts
const { data: texture, isLoading, error } = useTexture('path/to/texture.png')

watch(isLoading, (value) => {
  if (value) {
    console.log('Texture is loading...')
  }
})

watch(error, (value) => {
  if (value) {
    console.error('Error loading texture:', value)
  }
})
```

### Manual Loading

```ts
const { data: texture, load } = useTexture('path/to/initial-texture.png')

// Later, load a different texture
const newTexture = await load('path/to/new-texture.png')

// Or load multiple textures
const newTextures = await load([
  'path/to/texture1.png',
  'path/to/texture2.png'
])
```

## Common Use Cases

### Material Textures

```ts
const { data: textures } = useTexture([
  'textures/wood/albedo.jpg',
  'textures/wood/normal.jpg',
  'textures/wood/roughness.jpg',
  'textures/wood/ao.jpg'
])

// In your setup function
const material = computed(() => {
  if (!textures.value) { return null }

  const [albedo, normal, roughness, ao] = textures.value

  return {
    map: albedo,
    normalMap: normal,
    roughnessMap: roughness,
    aoMap: ao
  }
})
```

### Environment Maps

```ts
const { data: envMap } = useTexture('textures/environment.hdr')

// Use with a scene or material
const scene = computed(() => {
  if (envMap.value) {
    return {
      background: envMap.value,
      environment: envMap.value
    }
  }
  return {}
})
```

### Texture Atlas

```ts
const { data: atlas } = useTexture('textures/sprite-atlas.png')

// Configure texture for sprite use
watchEffect(() => {
  if (atlas.value) {
    atlas.value.wrapS = atlas.value.wrapT = THREE.RepeatWrapping
    atlas.value.repeat.set(1 / 8, 1 / 8) // For an 8x8 grid
  }
})
```

## API Reference

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string \| string[]` | Path or array of paths to texture file(s) |
| `manager` | `LoadingManager` | Optional THREE.js LoadingManager |

### Returns

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<Texture \| Texture[] \| null>` | The loaded texture(s) |
| `isLoading` | `Ref<boolean>` | Whether the texture is currently loading |
| `error` | `Ref<Error \| null>` | Any error that occurred during loading |
| `promise` | `Promise<Texture \| Texture[]>` | Promise that resolves when the texture is loaded |
| `load` | `Function` | Method to manually load texture(s) |

## Notes

- Textures are loaded both synchronously and asynchronously. The initial texture object is created immediately, but the actual image data loads asynchronously.
- The composable uses `shallowRef` for better performance when dealing with complex THREE.js objects.
- Error handling is built-in, with detailed error messages available in the `error` ref.

## Component Usage

The `UseTexture` component provides a slot-based API for loading textures directly in your template:

```vue
<script setup lang="ts">
import { UseTexture } from '@tresjs/core'

const paths = [
  'textures/black-rock/color.jpg',
  'textures/black-rock/displacement.jpg',
]
</script>

<template>
  <UseTexture v-slot="{ data: texture }" :path="paths">
    <TresMesh :position="[-3, 1, 0]">
      <TresSphereGeometry :args="[1, 32, 32]" />
      <TresMeshStandardMaterial
        v-if="texture"
        :map="texture[0]"
        :displacement-map="texture[1]"
        :displacement-scale="0.1"
      />
    </TresMesh>
  </UseTexture>
</template>
```

The component provides the loaded texture(s) through its default slot prop. This approach is particularly useful when:
- You want to scope texture loading to a specific part of your scene
- You need to ensure a mesh and its textures are loaded together
- You prefer a more declarative template-based approach

The slot provides the same properties as the composable (`data`, `isLoading`, `error`).
