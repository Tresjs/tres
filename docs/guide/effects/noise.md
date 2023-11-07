# Noise

<DocsDemo>
  <NoiseDemo />
</DocsDemo>

Noise is an effect that adds Gaussian noise to the scene. This can be used to simulate a variety of effects, such as static on a TV or film grain.

## Usage

```vue
<script setup lang="ts">
import { BlendFunction } from 'postprocessing'

import { EffectComposer, Bloom } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <Noise
      premultiply
      :blend-function="BlendFunction.SCREEN"
    />
  </EffectComposer>
</template>
```

## Props

| Prop                 | Description                                                                                          | Default                                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `blendFunction`      | The blend function of this effect. This prop is not reactive.                                        |  [BlendFunction.SCREEN](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/enums/BlendFunction.js#L40) |
| `premultiply`          | Indicates whether noise will be multiplied with the input colors prior to blending | `false`           | 


## Further Reading
see [postprocessing docs](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/NoiseEffect.js~NoiseEffect.html)