# Halftone

<DocsDemo>
  <HalftoneThreeDemo />
</DocsDemo>

Halftone is an effect that simulates the halftone printing technique, which uses dots of varying sizes and spacing to create the illusion of continuous tone images. This effect can be used to give your 3D scenes a unique, comic book-like appearance.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, Halftone } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <Halftone :shape="1" :radius="4" :rotateR="Math.PI / 12" :rotateG="Math.PI / 3" :rotateB="Math.PI / 6" :scatter="0" :blending="1" :greyscale="false" />
  </EffectComposer>
</template>
```
## Props

## Props

| Prop          | Description                                                                                       | Default |
|---------------|---------------------------------------------------------------------------------------------------|---------|
| `shape`       | The shape of the halftone dots. Can be `1` (Dot), `2` (Ellipse), `3` (Line), or `4` (Square).      | `1`     |
| `radius`      | The radius of the halftone dots.                                                                  | `4`     |
| `rotateR`     | The rotation of the red channel.                                                                  | `0`     |
| `rotateG`     | The rotation of the green channel.                                                                | `0`     |
| `rotateB`     | The rotation of the blue channel.                                                                 | `0`     |
| `scatter`     | The scatter of the halftone dots.                                                                 | `0`     |
| `blending`    | The blending mode of the halftone effect.                                                         | `1`     |
| `greyscale`   | If true, the halftone effect will be in greyscale.                                                | `false` |
| `blendingMode`| The blending mode used for the halftone effect.                                                   | `1`     |

## Further Reading

see [Three.js example](https://threejs.org/examples/?q=halftone#webgl_postprocessing_rgb_halftone)
