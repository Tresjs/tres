# useTexture

<DocsDemo>
  <UseTextureDemo />
</DocsDemo>

A composable that allows you to load textures using the [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader) into your **TresJS** scene.

## Usage

```vue [TexturedObject.vue]
<script setup lang="ts">
import { useTexture } from '@tresjs/cientos'

const { state: texture, isLoading, error } = useTexture(path)
</script>

<template>
  <TresMesh>
    <TresSphereGeometry />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>
</template>
```

## Options

| Name            | Type      | Default     | Description                          |
| :-------------- | --------- | ----------- | ------------------------------------ |
| **path**       | `string` | `undefined` | The path to the texture. |
| **manager**    | `THREE.LoadingManager` | `undefined` | The loading manager to use for the texture. |

## Component Usage

```vue [UseTexture.vue]
<script setup lang="ts">
import { UseTexture } from '@tresjs/cientos'

const path = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/black-rock/Rock035_2K_Color.jpg'

const handleLoaded = (texture: Texture) => {
  console.log('Loaded texture', texture)
}

const handleError = (error: unknown) => {
  console.error('error', error)
}
</script>

<template>
  <UseTexture
    v-slot="{ state: texture }"
    :path="path"
    @loaded="handleLoaded"
    @error="handleError"
  >
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial :map="texture" />
    </TresMesh>
  </UseTexture>
</template>
```
