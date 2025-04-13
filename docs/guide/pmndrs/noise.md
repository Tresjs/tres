# Noise

<DocsDemo>
  <NoiseDemo />
</DocsDemo>

Noise is an effect that adds Gaussian noise to the scene. This can be used to simulate a variety of effects, such as static on a TV or film grain.

## Usage

```vue{2,12-19}
<script setup lang="ts">
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <NoisePmndrs
          premultiply
          :blend-function="BlendFunction.SCREEN"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop                 | Description                                                                                          | Default                                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `blendFunction`      | The blend function of this effect.                                        | [BlendFunction.SCREEN](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/enums/BlendFunction.js#L40) |
| `premultiply`          | Indicates whether noise will be multiplied with the input colors prior to blending | `false`           |

## Further Reading
For more details, see the [NoiseEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/NoiseEffect.js~NoiseEffect.html)
