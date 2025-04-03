---
title: Load Textures
description: Add texture maps to your TresJS objects.
author: alvarosabu
thumbnail: /recipes/load-textures.png
difficulty: 1
---

# Load Textures

> All textures used in this example are from [ambientcg](https://ambientcg.com/).

Three-dimensional (3D) textures are images that contain multiple layers of data, allowing them to represent volume or simulate three-dimensional structures. These textures are commonly used in 3D graphics and visual effects to enhance the realism and complexity of scenes and objects.

<SandboxDemo url="https://play.tresjs.org/#eNq9Vm1PGzkQ/itW7gNBJbvhVVWOVBToVb2DgoBvTVU5u5PE4LUt25uQi3K/5X7L/bIb27tZB1qUfqAgRcnj8TPPjMfjWbTuNJj3SiXTElq91rHJNFOWGLClIpyKcX/QsmbQejcQrFBSW3IHj7bUkJ9SzslIy4JsJWkMOqqt31f2C+JcnFExpYYsqx0nFrF7k2ZSr9te6SGzZ1JYLfl3zBkIK43b4f6P0yAXxeEPC4Xi1AL+IuS4cep+EpJxoLqTSS41hvTb273z07PDQSssmgnN5ayypFxNaPg6YwLxjmF/QwCUnIHuKA0j0CAyQKoJG086CvRI6oIi5DidsZeBQtYjSmvY6bsGbRRklk3hjBagK6+E9JQ0zDIpkP/L7g7Z2yGHX2uxuDySU1w5WOlHiHomRHcjUGDMCHWTGBx5bLfb7dZgLQpl3ZbII0xIYoWtnXhkmz4z9lGdM+1ikoLyC8yNXY+m66M5wGhIjwmL25md48IeAhk1thPOovJznDbniMBxGh1ya6cVyqZTUJXcGymwgBdu16BawLrtEY84LK45t4BHZ60yvTTNcoH7c+BsqhMBNhWqSGPzk/3kMOmmOTM2dTBaD1o7z4hDdf4Md9iB9EcxfQWve7EzoA+Kik20r2xPDhI8/Iq5BpOCuT0x90TDRrzO7gQZD9+i3jdgijgNeO9LAxvnNzI/2e36BON1g8ekWM9uZYd1gTX4E8Rhw0vUaNjJoWAbkNamLviD5CjlbBhTOsblQCyxJq3JpBix8ZOKzGShGAd9pdxNWK9MvFdy9qfHrC5hpS+bQPbwHfzePAbJ11gsoKeY7uYoqR6DDcsfbj/j1Y0WC5mXvDqcHyzegJG8dBqD2WkpcpQd2Xm1n/wFY2J8Zz48+ltcBbUm1M4VePRL3SFWtRaArz5x3t4fx9kLWWoi20/2o4Q/fXs2e8YWBJv46oGpnqxoFSuoIt5x328AD1tfSKl++IYNBB68sUQNdbWT9AmdUWYjsrYPBxtWj2zVBafpLBkzOymHaKeRBPNpEywY3/zQAzUYiEkLygQ2QM9j0iGn2UNHy+whvcGP7v7ht72/vp0zg/0xg8JR3Kvxls8t3v8Veom+Q0p/oQAty/FEgDGv7P2m9tO4Fu5d5q/s97N38vGicUuLoeviV1nGS3c5XtP7+ye+ahXL7agsjZrgzHKDRd93pd8WJefxursQpiyw3KWo6ry/XvntYD4QwaDdXhDskpaS5TbpvwsXNU3JJxybcFDQpSDUEpiCnuONwfmG/PPfv0fdP65vSTsHHBxybB9EjshclpoUUjAr9bYjYSPSXslNppSXsF33gSd4oqWlrlckc/KmH/SgytAcnN4XZsRqXrkEM3EZwRaxInfTickodwMezk7xZLI2GeH2W7/nI8gCLEbawy5lqrENZyz/4YadZm6K3N5aKnKq80uUpBnljYn7m3aG+MQgV9NRmjEu/MUXu1ML7iY4TDV2q5HTV5Zz+2ySWv4PY68KvA==" />

There are two ways of loading 3D textures in TresJS:

## Using `useLoader`

The `useLoader` composable allows you to pass any type of three.js loader and a URL to load the resource from. It returns a `Promise` with the loaded resource.

For a detailed explanation of how to use `useLoader`, check out the [useLoader](/api/composables#use-loader) documentation.

```ts
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

const { state: texture } = useLoader(TextureLoader, '/Rock035_2K_Color.jpg')
```

Then you can pass the texture to a material:

::: code-group
```vue [App.vue]
<script setup lang="ts">
import TexturedSphere from './TexturedSphere.vue'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
  >
    <TexturedSphere />
  </TresCanvas>
</template>
```

```vue [Model.vue]
<script setup lang="ts">
import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'

const { state: texture, isLoading } = useLoader(TextureLoader, '/Rock035_2K_Color.jpg')
</script>

<template>
  <TresMesh>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>
</template>
```
:::

## Using `useTexture`

A more convenient way of loading textures is using the `useTexture` composable. It provides reactive state management and supports both single textures and arrays of textures.

To learn more about `useTexture`, check out the [useTexture](/api/composables#use-texture) documentation.

### Loading a Single Texture

```ts
import { useTexture } from '@tresjs/core'

const { state: texture, isLoading } = useTexture('/textures/black-rock/Rock035_2K_Color.jpg')
```

### Loading Multiple Textures

```ts
import { useTexture } from '@tresjs/core'

const [albedo, normal, roughness] = useTexture([
  '/textures/black-rock/Rock035_2K_Color.jpg',
  '/textures/black-rock/Rock035_2K_NormalDX.jpg',
  '/textures/black-rock/Rock035_2K_Roughness.jpg'
])
```

Then you can use the textures in your material:

```vue
<template>
  <TresMesh>
    <TresSphereGeometry :args="[1, 32, 32]" />
    <TresMeshStandardMaterial
      :map="albedo.state.value"
      :normal-map="normal.state.value"
      :roughness-map="roughness.state.value"
    />
    <Html transform position-y="1.5">
      <span class="text-xs bg-white p-2 rounded-md">
        {{ albedo.isLoading.value ? 'Loading...' : 'Loaded' }}
      </span>
    </Html>
  </TresMesh>
</template>
```

### Reactive Texture Loading

The composable supports reactive paths, allowing you to change textures dynamically:

```ts
const texturePath = ref('/textures/black-rock/Rock035_2K_Color.jpg')
const { state: texture, isLoading } = useTexture(texturePath)

// Later, change the texture
texturePath.value = '/textures/hexagonal-rock/Rocks_Hexagons_002_basecolor.jpg'
```

### Using the UseTexture Component

For a more declarative approach, you can use the `UseTexture` component:

```vue
<script setup lang="ts">
import { UseTexture } from '@tresjs/core'

const paths = [
  '/textures/black-rock/Rock035_2K_Color.jpg',
  '/textures/black-rock/Rock035_2K_NormalDX.jpg',
  '/textures/black-rock/Rock035_2K_Roughness.jpg'
]
</script>

<template>
  <UseTexture v-slot="{ state: textures, isLoading }" :path="paths">
    <TresMesh>
      <TresSphereGeometry :args="[1, 32, 32]" />
      <TresMeshStandardMaterial
        v-if="!isLoading"
        :map="textures[0]"
        :normal-map="textures[1]"
        :roughness-map="textures[2]"
      />
    </TresMesh>
  </UseTexture>
</template>
```
