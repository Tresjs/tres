# Glitch

<DocsDemo>
  <GlitchThreeDemo />
</DocsDemo>

Glitch is an effect that simulates digital glitches, which are random or intentional errors that occur in digital media. The effect can be used to create a distorted or disrupted appearance, with elements of the scene appearing to shift or flicker in a chaotic manner.

The native `<Glitch />` component allows you to add this effect to your 3D scenes, and provides several parameters that can be tweaked to achieve the desired glitchy look, such as delay, duration, strength, mode, and more. The end result can be a unique and striking visual style that adds an extra layer of interest to your 3D scenes.

::: warning
This effect may potentially cause epileptic seizures in people with photosensitive epilepsy. Viewer discretion is advised.
:::

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, Glitch } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <Glitch />
  </EffectComposer>
</template>
```

## Props

| Prop     | Description                                                                             | Default |
|----------|-----------------------------------------------------------------------------------------|---------|
| `dtSize` | The size of the generated noise map. Will be ignored if a perturbation map is provided. | `64`    |
| `goWild` | If true, the glitch effect will be more wild 🤪  | `false`

## Further Reading

see [Three.js example](https://threejs.org/examples/?q=glit#webgl_postprocessing_glitch)
