# useVideoTexture <Badge type="warning" text="^3.2.0" />

<DocsDemo>
  <VideoTextureDemo />
</DocsDemo>

A composable to easily use videos as textures in your meshes.

This composable is based on the Drei [useVideoTexture](https://github.com/pmndrs/drei/tree/master#usevideotexture)

## Usage

::: code-group
```vue [app.vue]
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import TheModel from './TheModel.vue'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera
      :position="[0, 5, 9]"
      :look-at="[0, 1, 0]"
    />
    <OrbitControls />
    <Suspense>
      <TheModel />
    </Suspense>
    <TresGridHelper />
    <TresAmbientLight />
  </TresCanvas>
</template>
```
```vue{3,8,13} [TheVideoTexture.vue]
<script setup lang="ts">
import { ref } from 'vue'
import { Sphere, useVideoTexture } from '@tresjs/cientos'

const videoPath = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/textures/video-textures/useVideoTexture.mp4'
const texture = ref()
texture.value = await useVideoTexture(videoPath, { loop: false })
</script>

<template>
   <Sphere :position="[0, 2, 0]">
      <TresMeshBasicMaterial :map="texture" />
    </Sphere>
</template>
```
:::

## Props

| Prop          | Description                                                              | Default          |
| :------------ | :----------------------------------------------------------------------- | ---------------- |
| `src`         | Path to the video.                                                       | `undefined`      |
| `unsuspend`   | Path to the model file.                                                  | `loadedmetadata` |
| `crossOrigin` | Whether to use CORS to fetch the related video.                          | `Anonymous`      |
| `muted`       | Whether to set the audio silenced.                                       | true             |
| `loop`        | Automatically seek back to the start upon reaching the end of the video. | true             |
| `start`       | To play to the video once loaded or not.                                 | true             |
| `playsInline` | To be play the video inline or not.                                      | true             |

- Any other attribute for a `<video>` tag is accepted and will automatically set
