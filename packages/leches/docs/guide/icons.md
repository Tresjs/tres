# Icons

The control object has an `icon` property that can be used to set an icon instead of the label.

This packages uses [Unocss Icons preset](https://unocss.dev/presets/icons) under the hood. You can use any of the icons from the preset.

To do that you would need to install locally `unocss` and the collection of icons that you want to use `@iconify-json/[the-collection-you-want]` (ex: `@iconify-json/mdi`).

```ts
// uno.config.ts
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }),
    // ...other presets
  ],
})
```

## Using icons from the preset

```html
<script setup lang="ts">
  import { TresLeches, useControls } from '@tresjs/leches'
  import { Vector3 } from 'three'

  const uuid = 'icon'
  const { value } = useControls(
    {
      message: {
        value: new Vector3(0, 0, 0),
        icon: 'i-carbon-camera',
      },
    },
    {
      uuid,
    },
  )
</script>
```

<IconDemo />
