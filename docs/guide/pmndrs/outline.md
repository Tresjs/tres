# Outline

<DocsDemo>
  <OutlineDemo />
</DocsDemo>

Outline is an effect that applies an outline to objects in your scene. This effect is commonly used to highlight objects.

## Usage

```vue{2,11-15}
<script setup lang="ts">
import { EffectComposerPmndrs, OutlinePmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <OutlinePmndrs />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop             | Description                                                                                 | Default                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| outlinedObjects  | The objects to highlight                                                                    | []                                                                                                                                            |
| blur             | Whether the outline should be blurred.                                                      | false                                                                                                                                         |
| xRay             | Whether occluded parts of selected objects should be visible.                               | true                                                                                                                                          |
| kernelSize       | The blur kernel size. Use together with blur being true.                                    | [KernelSize.VERY_SMALL](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/enums/KernelSize.js)       |
| pulseSpeed       | The pulse speed. A value of zero disables the pulse effect.                                 | 0.0                                                                                                                                           |
| resolutionX      | The horizontal resolution.                                                                  | [Resolution.AUTO_SIZE](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/core/Resolution.js#L515)    |
| resolutionY      | The vertical resolution.                                                                    | [Resolution.AUTO_SIZE](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/core/Resolution.js#L515)    |
| edgeStrength     | The edge strength.                                                                          | 1.0                                                                                                                                           |
| patternScale     | The pattern scale.                                                                          | 1.0                                                                                                                                           |
| multisampling    | The number of samples used for multisample antialiasing. Requires WebGL 2.                  | 0                                                                                                                                             |
| blendFunction    | The blend function. Use `BlendFunction.ALPHA` for dark outlines.                            | [BlendFunction.SCREEN](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/enums/BlendFunction.js#L40) |
| patternTexture   | A pattern texture.                                                                          | null                                                                                                                                          |
| resolutionScale  | The resolution scale.                                                                       | 0.5                                                                                                                                           |
| hiddenEdgeColor  | The color of hidden edges.                                                                  | 0x22090a                                                                                                                                      |
| visibleEdgeColor | The color of visible edges.                                                                 | 0xffffff                                                                                                                                      |

## Further Reading
For more details, see the [OutlineEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/OutlineEffect.js~OutlineEffect.html)
