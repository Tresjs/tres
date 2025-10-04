# SMAA

<DocsDemo>
  <SMAAThreeDemo />
</DocsDemo>

SMAA (Subpixel Morphological Antialiasing) is an antialiasing technique that aims to reduce the visual defects that occur when high-frequency detail is displayed on a lower-resolution screen. This effect can be used to smooth out jagged edges in your 3D scenes.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, SMAA } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <SMAA :width="1024" :height="768" />
    <Output />
  </EffectComposer>
</template>
```

## Props

| Prop    | Description                                                                                       | Default                         |
|---------|---------------------------------------------------------------------------------------------------|---------------------------------|
| `width` | The width of the render target. If not provided, it defaults to the width of the renderer.        |       |
| `height`| The height of the render target. If not provided, it defaults to the height of the renderer.      |    |

## Further Reading

see [Three.js example](https://threejs.org/examples/?q=smaa#webgl_postprocessing_smaa)
