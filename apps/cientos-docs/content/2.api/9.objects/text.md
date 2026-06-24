---
title: Text
description: Render high-quality SDF text from real font files using troika-three-text.
---

::SceneControlsWrapper
  ::ObjectsSdfText
  ::
::

`<Text />` renders crisp, scalable text using [SDF (signed distance field)](https://en.wikipedia.org/wiki/Signed_distance_function) glyphs, wrapping [`troika-three-text`](https://github.com/protectwise/troika/tree/main/packages/troika-three-text). It consumes real `.ttf`, `.otf` and `.woff` font files at runtime and supports kerning, ligatures, RTL/bidi and unicode fallback.

The component owns the underlying troika `Text` instance: it calls `.sync()` whenever props change and disposes of the instance automatically when unmounted, so you never need the manual `<primitive>` wiring.

## Text3D vs Text — which do I use?

::prose-note
Use **`<Text3D>`** for chunky, extruded 3D titles from a pre-baked `typeface.json` font. Use **`<Text>`** for labels, UI, body copy and multilingual content where kerning, wrapping and unicode fallback matter.
::

| | `<Text3D>` | `<Text>` |
| :--- | :--- | :--- |
| **Technique** | Extruded `TextGeometry` | SDF, runtime-generated |
| **Font input** | pre-baked `typeface.json` | real `.ttf` / `.otf` / `.woff` |
| **Kerning / ligatures / RTL** | ✗ | ✓ |
| **Unicode fallback** | ✗ | ✓ |
| **Best for** | 3D titles | labels, UI, multilingual |

## Usage

The text can be provided through the `text` prop or the default slot. By default the [Roboto](https://fonts.google.com/specimen/Roboto) font is loaded from Google Fonts; pass the `font` prop to use your own font file.

::prose-note
For dynamic or reactive content, prefer the `text` prop. The default slot is best for static strings, since reactive values interpolated into the slot may not always re-trigger an update.
::

```vue
<script setup lang="ts">
import { Text } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 6]" />
    <Text
      text="Hello TresJS"
      font="/fonts/Inter.woff"
      :font-size="0.5"
      color="#ffffff"
      anchor-x="center"
      anchor-y="middle"
      :max-width="4"
      @sync="onSync"
    />
  </TresCanvas>
</template>
```

Any extra props (such as `position`, `rotation` or `scale`) are forwarded to the underlying object.

## Events

| Event    | Description                                                                                   |
| :------- | :-------------------------------------------------------------------------------------------- |
| **sync** | Fires after the text layout has completed (`.sync()`). The troika `Text` instance is emitted. |

## Props

| Prop                    | Description                                                                                     | Default    |
| :---------------------- | :---------------------------------------------------------------------------------------------- | ---------- |
| **text**                | The string of text to render. Can also be provided via the default slot.                        |            |
| **characters**          | The set of characters to pre-generate SDF glyphs for.                                           | `null`        |
| **color**               | The color of the text.                                                                          | white         |
| **fontSize**            | The em-height at which to render the font, in local world units.                                | `1`           |
| **fontWeight**          | The weight of the font (variable fonts only).                                                   | `normal`      |
| **fontStyle**           | The style of the font, `normal` or `italic`.                                                    | `normal`      |
| **maxWidth**            | The maximum width of the text block, above which lines wrap.                                    | `Infinity`    |
| **lineHeight**          | The height of each line of text, as a multiple of `fontSize`.                                   | `normal`      |
| **letterSpacing**       | Spacing between letters after layout, in local world units.                                     | `0`           |
| **textAlign**           | Horizontal alignment: `left`, `right`, `center` or `justify`.                                   | `left`        |
| **font**                | URL of a custom font file (`.ttf`, `.otf`, `.woff`).                                            | Roboto        |
| **anchorX**             | Horizontal position in the text block that lines up with the local origin.                      | `'center'`    |
| **anchorY**             | Vertical position in the text block that lines up with the local origin.                        | `'middle'`    |
| **clipRect**            | Clipping region `[minX, minY, maxX, maxY]` in local units.                                      | `null`        |
| **depthOffset**         | Fixed offset added to the text's rendered z-depth (helps prevent z-fighting).                   | `0`           |
| **direction**           | Base text direction: `auto`, `ltr` or `rtl`.                                                    | `auto`        |
| **overflowWrap**        | How text wraps when a word is too long: `normal` or `break-word`.                               | `normal`      |
| **whiteSpace**          | Whitespace handling: `normal` or `nowrap`.                                                       | `normal`      |
| **outlineWidth**        | Width of an outline/halo drawn around each glyph.                                               | `0`           |
| **outlineOffsetX**      | Horizontal offset of the text outline.                                                          | `0`           |
| **outlineOffsetY**      | Vertical offset of the text outline.                                                            | `0`           |
| **outlineBlur**         | Blur radius applied to the text outline.                                                        | `0`           |
| **outlineColor**        | Color of the text outline.                                                                      | black         |
| **outlineOpacity**      | Opacity of the text outline.                                                                    | `1`           |
| **strokeWidth**         | Width of an inner stroke drawn on each glyph.                                                   | `0`           |
| **strokeColor**         | Color of the glyph stroke.                                                                      | grey          |
| **strokeOpacity**       | Opacity of the glyph stroke.                                                                    | `1`           |
| **fillOpacity**         | Opacity of the glyph fill.                                                                      | `1`           |
| **sdfGlyphSize**        | The size of each glyph's SDF texture, in pixels.                                                | `64`          |
| **glyphGeometryDetail** | The level of detail of each glyph's geometry tessellation.                                      | `1`           |

::prose-note
Only `fontSize`, `anchorX`, `anchorY` and `sdfGlyphSize` are defaulted by the component. All other defaults are applied by `troika-three-text` itself, so the values above reflect troika's behaviour when the prop is left unset.
::
