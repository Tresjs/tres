# Unreal Bloom

<DocsDemo>
  <UnrealBloomThreeDemo />
</DocsDemo>

Unreal Bloom is an effect that simulates the bloom effect seen in many modern video games. It creates a glow around bright areas of the scene, giving it a more vibrant and dynamic look.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, UnrealBloom } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <UnrealBloom :radius="0.5" :strength="1.5" :threshold="0.8" />
  </EffectComposer>
</template>
```

## Props

| Prop       | Description                                                                                       | Default |
|------------|---------------------------------------------------------------------------------------------------|---------|
| `radius`   | The radius of the bloom effect.                                                                   | `0`     |
| `strength` | The strength of the bloom effect.                                                                 | `1`     |
| `threshold`| The threshold luminance for the bloom effect.                                                     | `0`     |

## Further Reading

see [Three.js example](https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom)
