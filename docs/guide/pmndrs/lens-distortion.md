# Lens Distortion

<DocsDemoGUI>
  <LensDistortionDemo />
</DocsDemoGUI>

The `LensDistortion` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/LensDistortionEffect.js~LensDistortionEffect.html) package. It allows you to apply a lens distortion effect to your scene, providing flexibility for creating realistic camera effects.

## Usage

The `<LensDistortionPmndrs>` component is straightforward to use and provides customizable options to fine-tune the distortion effect of your visuals.

```vue{3,12-17,52-56}
<script setup lang="ts">
import { Vector2 } from 'three'
import { EffectComposerPmndrs, LensDistortionPmndrs } from '@tresjs/post-processing'
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useTexture } from '@tresjs/core'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const effectProps = {
  distortion: new Vector2(0.5, 0.5),
  principalPoint: new Vector2(0.0, 0.0),
  focalLength: new Vector2(0.5, 0.5),
  skew: 0,
}

const pbrTexture = await useTexture({
  map: '/lens-distortion/room-map.png',
  normalMap: '/lens-distortion/room-normal.png',
})

pbrTexture.map.colorSpace = SRGBColorSpace
</script>

<template>
   <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[-2, 1, 5]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, 2, 0]">
      <TresBoxGeometry :args="[8, 8, 8]" />
      <TresMeshStandardMaterial :side="BackSide" :map="pbrTexture.map" :normal-map="pbrTexture.normalMap" />
    </TresMesh>

    <TresMesh :position="[0, 0, 0]">
      <TresBoxGeometry :args="[1.65, 1.65, 1.65]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresAmbientLight :intensity="2" />

    <Suspense>
      <Environment background :blur=".25" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <LensDistortionPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **distortion** | The distortion effect strength. <br> Accepts `Vector2` or `[number, number]`.                                                                                                      | `[0.0, 0.0]`             |
| **principalPoint** | The center point. <br> Accepts `Vector2` or `[number, number]`.                                                                                                               | `[0.0, 0.0]`             |
| **focalLength** | The focal length. <br> Accepts `Vector2` or `[number, number]`.                                                                                                                  | `[1.0, 1.0]`             |
| **skew**        | The skew value.                                                                                                                                               | `0`                      |

## Further Reading

For more details, see the [LensDistortion documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/LensDistortionEffect.js~LensDistortionEffect.html).
