# Scanline

<DocsDemoGUI>
  <ScanlineDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/ScanlineDemo.vue{0}
</details>

The `Scanline` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ScanlineEffect.js~ScanlineEffect.html) package. It simulates scanlines reminiscent of old CRT displays, creating a nostalgic or stylized visual effect for your scene. This effect can enhance the retro aesthetic of your project or add a unique visual touch.

## Usage

The `<ScanlinePmndrs>` component is easy to use and provides customizable options to achieve the desired visual appearance.

```vue{3,11-15,24-28}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, ScanlinePmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#0ff000',
  toneMapping: NoToneMapping,
}

const effectProps = {
  density: 1.25,
  opacity: 0.65,
  scrollSpeed: 0.05,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <ScanlinePmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.                                                               | `BlendFunction.OVERLAY`   |
| density           | The density of the scanlines. Higher values increase the frequency of lines.                                  | `1.25`                    |
| opacity           | The opacity of the scanlines. Controls the transparency of the effect.                                       | `1.0`                     |
| scrollSpeed       | The speed at which the scanlines scroll vertically. When set to `0`, the scanlines remain static. Any non-zero value animates the scanlines vertically. | `0.0`                     |

## Further Reading

For more details, see the [ScanlineEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ScanlineEffect.js~ScanlineEffect.html)
