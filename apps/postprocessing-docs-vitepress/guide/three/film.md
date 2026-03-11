# Film

<DocsDemo>
  <FilmThreeDemo />
</DocsDemo>

Film is an effect that simulates the look of classic cinema film, adding film grain noise to your 3D scenes. This effect can give your renders a vintage, cinematic aesthetic reminiscent of analog film recordings.

The `<Film />` component allows you to add film grain to your scenes with adjustable intensity. You can also enable grayscale mode to create a black-and-white film look, perfect for dramatic or nostalgic visual styles.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, Film } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <Film :intensity="0.5" :grayscale="false" />
  </EffectComposer>
</template>
```

## Props

| Prop             | Description                                                                                         | Default |
|------------------|-----------------------------------------------------------------------------------------------------|---------|
| `intensity`      | The grain intensity in the range [0, 1] (0 = no effect, 1 = full effect).                           | `0.5`   |
| `grayscale`      | Whether to apply a grayscale effect.                                                                | `false` |
| `enabled`        | If set to true, the pass is processed by the composer.                                              | `true`  |
| `needsSwap`      | If set to true, the pass indicates to swap read and write buffer after rendering.                   | `true`  |
| `clear`          | If set to true, the pass clears its buffer before rendering.                                        | `false` |
| `renderToScreen` | If set to true, the result of the pass is rendered to screen.                                       | `false` |

## Further Reading

see [Three.js example](https://threejs.org/examples/?q=film#webgl_postprocessing)
