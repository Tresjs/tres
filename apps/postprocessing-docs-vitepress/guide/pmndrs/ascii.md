# ASCII

<DocsDemoGUI>
  <ASCIIDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/ASCIIDemo.vue{0}
</details>

The `ASCIIEffect` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ASCIIEffect.js~ASCIIEffect.html) package.
This effect transforms the visual output into a grid of ASCII characters, offering a unique and artistic way to display 3D content. The ASCII characters used can be customized, allowing for a wide range of creative possibilities.

## Usage

The `<ASCIIPmndrs>` component is straightforward to integrate and offers a variety of customizable properties, allowing you to adapt it to diverse artistic and visual requirements.

```vue{2,12-17,29-33}
<script setup lang="ts">
import { EffectComposerPmndrs, ASCIIPmndrs } from '@tresjs/post-processing'

const gl = {
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const effectProps = {
  blendFunction: BlendFunction.NORMAL,
  asciiTexture: {
    characters: ' .,:-~+=*≡HELLOWORLD#░▒▓█■▲◼◾',
  }
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshToonMaterial color="black" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs v-bind="glComposer">
        <ASCIIPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                     | Default                     |
| -------------- | ----------------------------------------------------------------------------------------------- | --------------------------- |
| blendFunction  | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`      |
| opacity        | The opacity of the effect.                                                                      | `1.0`                       |
| cellSize       | The size of the ASCII grid cells.                                                               | `16`                 |
| inverted       | Controls whether the effect should be inverted.                                                 | `false`                     |
| color          | The color of the effect. Can be a [`Color`](https://threejs.org/docs/#api/en/math/Color), `string`, `number`, or `null`. If set to `null`, the colors of the scene will be used.                           | `null`                      |
| useSceneColor  | Controls whether the effect should use the scene color. If `true`, overrides the `color` prop.                                 | `false`                     |
| asciiTexture   | Options for creating an ASCIITexture instance. |  See the [`ASCIITexture`](https://pmndrs.github.io/postprocessing/public/docs/class/src/textures/ASCIITexture.js~ASCIITexture.html) documentation.                 |

## Further Reading
For more details, see the [ASCIIEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ASCIIEffect.js~ASCIIEffect.html)
