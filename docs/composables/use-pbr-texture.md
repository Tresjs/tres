# usePBRTexture

![PBR Maps explained](https://learnopengl.com/img/pbr/textures.png)

A Vue composable for loading and managing [PBR (Physically Based Rendering)](https://learnopengl.com/PBR/Theory) texture sets in TresJS applications. This composable provides a convenient way to load multiple PBR textures concurrently and manage them as a cohesive set.

## Features

- 🎨 Simplified PBR texture management
- ⚡️ Concurrent texture loading
- 🔄 Reactive texture references
- ⏳ Loading state tracking
- ❌ Error handling
- ⏱️ Async/await support with Suspense

## Basic Usage

The composable can be used in two ways: with or without `await`.

### With await (Recommended)

```ts
import { usePBRTexture } from '@tresjs/core'

// Wait for all textures to fully load
const { data: textures } = await usePBRTexture(
  // Texture paths
  {
    map: 'textures/wood/albedo.jpg',
    normalMap: 'textures/wood/normal.jpg',
    roughnessMap: 'textures/wood/roughness.jpg'
  },
  // Optional loading manager
  loadingManager
)

// All textures are fully loaded and ready to use
console.log(textures.value.map) // Texture object with loaded image
```

### Without await

```ts
import { usePBRTexture } from '@tresjs/core'
import { watch } from 'vue'

// Textures will start loading immediately
const { data: textures, isLoading } = usePBRTexture(
  // Texture paths
  {
    map: 'textures/wood/albedo.jpg',
    normalMap: 'textures/wood/normal.jpg',
    roughnessMap: 'textures/wood/roughness.jpg'
  }
)

// Watch for loading completion
watch(isLoading, (loading) => {
  if (!loading) {
    console.log('All textures loaded:', textures.value)
  }
})
```

### Using with TresMeshStandardMaterial

The textures can be directly bound to a TresMeshStandardMaterial. When using without await, make sure to handle the loading state:

```vue
<script setup>
import { usePBRTexture } from '@tresjs/core'

const { data: textures, isLoading } = usePBRTexture(
  // Texture paths
  {
    map: 'textures/wood/albedo.jpg',
    normalMap: 'textures/wood/normal.jpg',
    roughnessMap: 'textures/wood/roughness.jpg'
  }
)
</script>

<template>
  <TresMesh v-if="!isLoading">
    <TresBoxGeometry />
    <TresMeshStandardMaterial v-bind="textures.value" />
  </TresMesh>
</template>
```

## Advanced Usage

### With Loading States

```vue
<script setup>
const { data: textures, isLoading, error } = usePBRTexture(
  // Texture paths
  {
    map: 'textures/metal/albedo.jpg',
    normalMap: 'textures/metal/normal.jpg',
    roughnessMap: 'textures/metal/roughness.jpg'
  }
)
</script>

<template>
  <div v-if="isLoading">Loading textures...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <TresMesh v-else>
    <TresBoxGeometry />
    <TresMeshStandardMaterial v-bind="textures.value" />
  </TresMesh>
</template>
```

### With Suspense

When using with Suspense, you must use the await pattern:

```vue
<template>
  <Suspense>
    <PBRMaterial />
    <template #fallback>
      <div>Loading material...</div>
    </template>
  </Suspense>
</template>
```

```vue
<!-- PBRMaterial.vue -->
<script setup>
const { data: textures } = await usePBRTexture(
  // Texture paths
  {
    map: 'textures/metal/albedo.jpg',
    normalMap: 'textures/metal/normal.jpg',
    roughnessMap: 'textures/metal/roughness.jpg'
  }
)
</script>

<template>
  <TresMeshStandardMaterial v-bind="textures.value" />
</template>
```

## API Reference

### Options

The `usePBRTexture` composable accepts the following parameters:

#### Paths Object

| Property | Type | Description |
| --- | --- | --- |
| `map` | `string` | Path to the base color/albedo texture |
| `normalMap` | `string` | Path to the normal map texture |
| `roughnessMap` | `string` | Path to the roughness map texture |
| `metalnessMap` | `string` | Path to the metalness map texture |
| `aoMap` | `string` | Path to the ambient occlusion map texture |
| `displacementMap` | `string` | Path to the height/displacement map texture |
| `emissiveMap` | `string` | Path to the emissive map texture |

#### Loading Manager

| Parameter | Type | Description |
| --- | --- | --- |
| `manager` | `LoadingManager` | Optional THREE.js LoadingManager for tracking load progress |

### Returns

The composable returns an object with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `data` | `Ref<PBRTextures>` | Reactive reference containing all loaded textures |
| `isLoading` | `Ref<boolean>` | Whether any texture is currently loading |
| `error` | `Ref<Error \| null>` | Any error that occurred during loading |
| `promise` | `Promise<PBRTextureResult>` | Promise that resolves when all textures are loaded |

The `data` object contains the following properties:

```ts
{
  map: Texture | null
  normalMap: Texture | null
  roughnessMap: Texture | null
  metalnessMap: Texture | null
  aoMap: Texture | null
  displacementMap: Texture | null
  emissiveMap: Texture | null
}
```

## Notes

- Built on top of the `useTexture` composable, providing the same loading behavior
- All textures are loaded concurrently for better performance
- Missing or undefined texture paths are ignored
- Uses `shallowRef` for better performance with Three.js objects
- Compatible with Vue's Suspense feature for loading states
- When using without await, textures will start loading immediately but might not be fully loaded
- Always check `isLoading` when using without await to ensure textures are ready

## Component Usage

```vue
<script setup>
const paths = {
  map: 'textures/wood/albedo.jpg',
  normalMap: 'textures/wood/normal.jpg',
  roughnessMap: 'textures/wood/roughness.jpg'
}
</script>

<template>
  <PBRTexture
    :paths="paths"
    @loaded="onTexturesLoaded"
    @error="onError"
  />
</template>

### Props

| Name | Type | Description |
| --- | --- | --- |
| `paths` | `PBRTexturePaths` | Object containing paths to PBR textures |
| `manager` | `LoadingManager` | Optional THREE.js LoadingManager |
