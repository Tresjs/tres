# God Rays

<DocsDemoGUI>
  <GodRaysDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/GodRaysDemo.vue{0}
</details>

The `GodRays` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/GodRaysEffect.js~GodRaysEffect.html) package. It simulates the appearance of light rays shining through objects, creating a volumetric lighting effect. This effect can enhance the visual appeal of your scene by adding a dramatic and realistic lighting effect.

## Usage

The `<GodRaysPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{4,13-17,30-37}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'
import { EffectComposerPmndrs, GodRaysPmndrs } from '@tresjs/post-processing'

const gl = {
  clearColor: 'blue',
  toneMapping: NoToneMapping,
}

const sphereMeshRef = ref(null)

const effectProps = {
  opacity: .8,
  exposure: .8,
  resolutionScale: 0.65
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- The lightSource (in this case a Sphere) -->
    <TresMesh ref="sphereMeshRef" :position="[-10, 8, 0]">
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshBasicMaterial color="#FFDDAA" :transparent="true" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <GodRaysPmndrs
          v-bind="effectProps"
          :lightSource="sphereMeshRef"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.        | `BlendFunction.SCREEN`       |
| lightSource       | The light source. Must not write depth and has to be flagged as transparent. <br> This can be a [`Mesh`](https://threejs.org/docs/index.html#api/en/objects/Mesh) or a [`Points`](https://threejs.org/docs/#api/en/objects/Points).                                 | `undefined`               |
| opacity           | The opacity of the God Rays.                                                                                  | `1.0`                     |
| density           | The density of the light rays.                                                                                | `0.96`                    |
| decay             | The decay of the light rays.                                                                                  | `0.9`                     |
| kernelSize        | The blur kernel size. <br> Has no effect if `blur` props is disabled. <br> See the [`KernelSize`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-KernelSize) options.                                                     | `KernelSize.SMALL`        |
| resolutionScale   | The resolution scale.                                                                                         | `0.5`                     |
| blur              | Whether the god rays should be blurred to reduce artifacts.                                                   | `true`                    |
| resolutionX       | The horizontal resolution.                                                                                    | `Resolution.AUTO_SIZE`    |
| resolutionY       | The vertical resolution.                                                                                      | `Resolution.AUTO_SIZE`    |
| weight            | The weight of the light rays.                                                                                 | `0.4`                     |
| exposure          | A constant attenuation coefficient.                                                                           | `0.6`                     |
| samples           | The number of samples per pixel.                                                                              | `60`                      |
| clampMax          | An upper bound for the saturation of the overall effect.                                                      | `1.0`                     |

## Further Reading
For more details, see the [GodRaysEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/GodRaysEffect.js~GodRaysEffect.html)
