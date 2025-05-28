# useTres

The `useTres` composable provides access to a simplified version of the TresJS context. It is a wrapper around the `useTresContext` composable that provides a more convenient API for common use cases.

## Usage

```ts
import { useTres } from '@tresjs/core'

const { scene, renderer, camera, invalidate } = useTres()
```

:::warning
`useTres` can be only be used inside a child component of a `TresCanvas` since this component acts as the provider for the context data.
:::

::: code-group

```vue [App.vue]
<script setup>
import { TresCanvas } from '@tresjs/core'
import SubComponent from './SubComponent.vue'
</script>

<template>
  <TresCanvas
  >
    <SubComponent />
  </TresCanvas>
</template>
```

```vue [SubComponent.vue]
<script lang="ts" setup>
import { useTres } from '@tresjs/core'

const { camera } = useTres()

watchEffect(() => {
  console.log(camera.value)
})
</script>
```

## Properties

| Property | Description |
| --- | --- |
| **camera** | the currently active camera |
| **scene** | the [scene](https://threejs.org/docs/?q=sce#api/en/scenes/Scene) |
| **renderer** | Contains the [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer)  |
| **sizes** | contains width, height and aspect ratio of your canvas |
| **loop** | the renderer loop |
| **controls** | the controls of your scene |
| **raycaster** | the global raycaster used for pointer events |
| **perf** | the performance monitor |
| **extend** | Extends the component catalogue. See [extending](/advanced/extending). |

## Methods

| Method | Description |
| --- | --- |
| **invalidate** | Marks the scene as needing an update in the next frame. This is used in on-demand rendering mode to schedule a render. |
| **advance** | Manually advances the render loop by one frame. This is particularly useful in manual rendering mode where you want explicit control over when frames are rendered. |
