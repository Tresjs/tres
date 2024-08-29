# useFBX

<DocsDemo>
  <UseFBXDemo />
</DocsDemo>

A composable that allows you to easily load glTF models into your **TresJS** scene.

## Usage

::: code-group
```vue [app.vue]
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import TheModel from './TheModel.vue'
</script>

<template>
  <TresCanvas clear-color="#1F90FF">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <TheModel />
    </Suspense>
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```
```vue{2,6} [TheModel.vue]
<script setup lang="ts">
import { useFBX } from '@tresjs/cientos'

const path = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx'
const { scene } = await useFBX(path)
</script>

<template>
  <primitive
    :object="scene"
    :scale="0.025"
  />
</template>
```
:::
