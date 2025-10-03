# Texture

<DocsDemoGUI>
  <TextureDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/TextureDemo.vue{0}
</details>

The `TextureEffect` component is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/TextureEffect.js~TextureEffect.html) package.
It allows rendering a texture with customizable options to create various visual effects.

## Usage

The `<TexturePmndrs>` component is easy to use and provides customizable options to suit different visual styles.

:::info
This component is designed to work with a provided texture and **does not** include built-in functionality to modify the texture itself. <br><br>
If you need to adjust properties such as **rotation**, **repeat**, or **other attributes**, you should modify them directly the texture *(See usage example below)* that you pass to the `<TexturePmndrs />` component.
:::

```vue{2,16-20,41-45}
<script setup lang="ts">
import { EffectComposerPmndrs, TexturePmndrs } from '@tresjs/post-processing'
import { TresCanvas, useTexture } from '@tresjs/core'
import { NoToneMapping, RepeatWrapping, SRGBColorSpace } from 'three'
import { BlendFunction, ColorChannel } from 'postprocessing'

const gl = {
  toneMapping: NoToneMapping,
}

const effectProps = {
  blendFunction: BlendFunction.OVERLAY,
  opacity: 0.65
}

const texture = await useTexture(['your-path-to-texture'])
texture.colorSpace = SRGBColorSpace
texture.wrapS = texture.wrapT = RepeatWrapping
texture.rotation = Math.PI / 2
texture.repeat.set( 2, 2 );

function setTextureSwizzleRGBA(red, green, blue, alpha) {
  // This is an example of using a function belonging to the TextureEffect class.
  // https://pmndrs.github.io/postprocessing/public/docs/file/src/effects/TextureEffect.js.html#lineNumber192
  textureEffectRef.value?.effect.setTextureSwizzleRGBA(red, green, blue, alpha)
}

// Example how to mix texture's color channels.
setTextureSwizzleRGBA(ColorChannel.GREEN, ColorChannel.BLUE, ColorChannel.RED, ColorChannel.ALPHA)

// Example how to reset the texture's color channels (default).
setTextureSwizzleRGBA(ColorChannel.RED, ColorChannel.BLUE, ColorChannel.GREEN, ColorChannel.ALPHA)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your Scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <TexturePmndrs v-bind="effectProps" :texture="texture" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop          | Description                                                                                     | Default                     |
| ------------- | ----------------------------------------------------------------------------------------------- | --------------------------- |
| blendFunction | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`      |
| texture       | The texture used for the effect. See the [`Texture`](https://threejs.org/docs/#api/en/textures/Texture) documentation                                                          | `null`                      |
| opacity       | The opacity of the texture.                                                                    | `1.0`                       |

## Further Reading

For more details, see the [TextureEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/TextureEffect.js~TextureEffect.html).
