# Sepia

<DocsDemo>
  <SepiaDemo />
</DocsDemo>

The `Sepia` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/SepiaEffect.js~SepiaEffect.html) package. It applies a sepia tone to the scene, giving it a warm, antique appearance. This effect can enhance the visual appeal of your scene by adding a vintage or stylized touch.

## Usage

The `<SepiaPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,36-40}
<script setup lang="ts">
import { EffectComposerPmndrs, SepiaPmndrs } from '@tresjs/post-processing/pmndrs'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <OrbitControls auto-rotate />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="black" :roughness=".25" />
    </TresMesh>

    <ContactShadows
      :opacity="1"
      :position-y="-.5"
    />

    <Suspense>
      <Environment background :blur=".5" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <SepiaPmndrs :intensity="2" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.        | `BlendFunction.NORMAL`       |
| intensity         | The intensity of the sepia effect.                                                                            | `1.0`                     |

## Further Reading
For more details, see the [Sepia documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/SepiaEffect.js~SepiaEffect.html)
