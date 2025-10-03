# Controls

## Single control

```html
<script lang="ts" setup>
  import { useControls, TresLeches } from '@tresjs/leches'
  import '@tresjs/leches/styles'

  const control = useControls({
    awiwi: true,
  })
</script>

<template>
  <TresLeches />
</template>
```

<SingleControlDemo />

When a single control is passed, the `useControls` composable is going to return an object with the control. The returned control is an object with ref properties meaning that you can deconstruct it without loosing reactivity.

```ts
const { value: awiwi } = useControls({
  awiwi: true,
})

watch(awiwi, (value) => {
  console.log(value)
})

watchEffect(() => {
  console.log(awiwi.value)
})
```

If you prefer to avoid renaming the deconstructed variable, you can also access the control value by using the property with the same name as the control.

```ts
const { awiwi } = useControls({
  awiwi: true,
})

watch(awiwi, (value) => {
  console.log(value)
})

watchEffect(() => {
  console.log(awiwi.value)
})
```

## Multiple controls

Most commonly, you will want to use multiple controls at the same time. In this case, the `useControls` composable is going to return an object with the controls. The returned controls are objects with ref properties (exactly as when you use only one control) meaning that you can deconstruct them without loosing reactivity.

```html
<script lang="ts" setup>
  import { useControls, TresLeches } from '@tresjs/leches'
  import '@tresjs/leches/styles'

  const { awiwi, slider } = useControls({
    awiwi: true,
    slider: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
  })

  watchEffect(() => {
    console.log(awiwi.value.value)
  })
</script>

<template>
  <TresLeches />
</template>
```

<MultipleControlDemo />

## Visibility

The control object has a `visible` property that can be used to hide the control from the UI.

```html
<script lang="ts" setup>
  import { useControls, TresLeches } from '@tresjs/leches'
  import '@tresjs/leches/styles'

  const visibilityControl = useControls({
    isVisible: true,
  })

  const { visible } = useControls({
    slider: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
  })

  watchEffect(() => {
    visible.value = visibilityControl.value.value
  })
</script>
```

<VisibilityDemo />

## Icons

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

### Using icons from the preset

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
