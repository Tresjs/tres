# Controls

## Single control

```html
<script lang="ts" setup>
import { useControls, TresLeches } from '@tresjs/leches'
import '@tresjs/leches/style'

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
import '@tresjs/leches/style'

const { awiwi, slider} = useControls({
  awiwi: true,
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  }
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
import '@tresjs/leches/style'

const visibilityControl = useControls({
  isVisible: true
})

const { visible } = useControls({
  slider: {
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.01,
  }
})

watchEffect(() => {
  visible.value = visibilityControl.value.value
})

</script>
```

<VisibilityDemo />