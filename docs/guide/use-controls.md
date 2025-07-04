# `useControls`

## Single control

```html
<script lang="ts" setup>
  import { useControls, TresLeches } from '@tresjs/leches'

  const control = useControls({
    awiwi: true,
  })
</script>

<template>
  <TresLeches />
</template>
```

<SingleControlDemo />

When a single control is passed, the `useControls` composable is going to return an object with the control value as a [Vue Ref](https://vuejs.org/api/reactivity-core.html#ref).

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

Most commonly, you will want to use multiple controls at the same time. In this case, the `useControls` composable is going to return an object with all the controls values.

```html
<script lang="ts" setup>
  import { useControls, TresLeches } from '@tresjs/leches'

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
    console.log(awiwi.value)
  })
</script>

<template>
  <TresLeches />
</template>
```

<MultipleControlDemo />

## Passing a reactive Object

You can pass a reactive object to the `useControls` composable and it will return an object with the controls values. TresLeches will do it's best to intelligently detect the controls to create.

```html
<script lang="ts" setup>
  import { useControls, TresLeches } from '@tresjs/leches'

  const gl = reactive({
    clearColor: '#008080',
    shadows: true,
  })

  const { clearColor, shadows } = useControls(gl)
</script>
```

## Folders

To better organize your controls, you can pass a folder to the `useControls` composable and it will return an object with the controls values.

```html
<script lang="ts" setup>
  import { useControls, TresLeches } from '@tresjs/leches'
  import { Vector3, Euler } from 'three'
  const { position } = useControls('Camera', {
    position: {
      value: new Vector3(0, 0, 0),
    },
    rotation: {
      value: new Euler(0, 0, 0),
    },
  })
</script>
```

<FolderDemo />
