# Afterimage

<DocsDemo>
  <AfterimageThreeDemo />
</DocsDemo>

Afterimage is an effect that creates persistent motion trails by blending previous frames with the current one. It produces a ghostly trailing effect where objects leave behind fading echoes as they move, similar to long-exposure photography.

The `<Afterimage />` component wraps the Three.js `AfterimagePass` and provides a configurable `damp` property to control the intensity and duration of the trails.

## Usage

```vue
<script setup lang="ts">
import { Afterimage, EffectComposer } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <Afterimage :damp="0.96" />
  </EffectComposer>
</template>
```

## Props

| Prop             | Description                                                                                         | Default |
|------------------|-----------------------------------------------------------------------------------------------------|---------|
| `damp`           | Damping intensity from 0.0 to 1.0. Higher values produce stronger, longer-lasting motion trails.    | `0.96`  |
| `enabled`        | If set to true, the pass is processed by the composer.                                              | `true`  |
| `needsSwap`      | If set to true, the pass indicates to swap read and write buffer after rendering.                   | `true`  |
| `clear`          | If set to true, the pass clears its buffer before rendering.                                        | `false` |
| `renderToScreen` | If set to true, the result of the pass is rendered to screen.                                       | `false` |

## Further Reading

see [Three.js example](https://threejs.org/examples/?q=afterimage#webgl_postprocessing_afterimage)
