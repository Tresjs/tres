# useTexture

The `useTexture` composable allows you to load textures using the [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader). Built on top of VueUse's [useAsyncState](https://vueuse.org/core/useAsyncState/#useasyncstate), it provides a reactive way to load single or multiple textures with built-in loading state management.

## Features

- 🔄 Reactive texture loading
- 🗺️ Support for single or multiple textures
- ⏳ Loading state tracking
- ❌ Error handling
- 🔄 Manual reload capability

## Implementation Details

The composable is built on top of VueUse's `useAsyncState` to provide:
- Automatic state management for loading, error, and data states
- Reactive updates when texture paths change
- Type-safe return values based on input type
- Efficient handling of complex THREE.js objects

## Basic Usage

```ts
import { useTexture } from '@tresjs/core'
```

### Loading a Single Texture

```ts
const { state: texture, isLoading } = useTexture('path/to/texture.png')
```

### Loading Multiple Textures

```ts
const [texture1, texture2] = useTexture([
  'path/to/albedo.png',
  'path/to/normal.png'
])

// Access individual textures
const albedo = texture1.state.value
const normal = texture2.state.value
```

## Advanced Usage

### Using a Custom Loading Manager

You can provide a THREE.js LoadingManager to track loading progress across multiple resources:

```ts
import { LoadingManager } from 'three'

const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  console.log(`Loading ${url}: ${loaded} of ${total} files.`)
}

const { state: texture } = useTexture('path/to/texture.png', { manager })
```

### Handling Loading States

The composable provides reactive references for tracking loading state:

```ts
const { state: texture, isLoading, error } = useTexture('path/to/texture.png')

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
const { state: texture, execute } = useTexture('path/to/initial-texture.png')

// Later, load a different texture
execute(0, 'path/to/new-texture.png')
```

### Reactive Path Handling

The composable fully supports reactive paths using refs:

```ts
const texturePath = ref('https://example.com/texture1.png')
const { state: texture, isLoading } = useTexture(texturePath)

// Change the texture path and the composable will automatically reload
texturePath.value = 'https://example.com/texture2.png'

// You can also use computed paths
const texturePath = computed(() => {
  return isDarkMode.value
    ? 'https://example.com/dark-texture.png'
    : 'https://example.com/light-texture.png'
})
```

## Common Use Cases

### Material Textures

```ts
const [albedo, normal, roughness, ao] = useTexture([
  'textures/wood/albedo.jpg',
  'textures/wood/normal.jpg',
  'textures/wood/roughness.jpg',
  'textures/wood/ao.jpg'
])

// In your setup function
const material = computed(() => {
  if (!albedo.state.value) { return null }

  return {
    map: albedo.state.value,
    normalMap: normal.state.value,
    roughnessMap: roughness.state.value,
    aoMap: ao.state.value
  }
})
```

### Environment Maps

```ts
const { state: envMap } = useTexture('textures/environment.hdr')

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
const { state: atlas } = useTexture('textures/sprite-atlas.png')

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
| `options` | `{ manager?: LoadingManager, asyncOptions?: UseAsyncStateOptions }` | Optional configuration options |

### Returns

| Property | Type | Description |
| --- | --- | --- |
| `state` | `Ref<Texture \| null>` | The loaded texture |
| `isLoading` | `Ref<boolean>` | Whether the texture is currently loading |
| `error` | `Ref<Error \| undefined>` | Any error that occurred during loading |
| `execute` | `Function` | Method to manually load texture |

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
  <UseTexture v-slot="{ state: texture }" :path="paths">
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

The slot provides the same properties as the composable (`state`, `isLoading`, `error`).
