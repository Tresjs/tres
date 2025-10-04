# Installation

Learn how to install `@tresjs/leches`

::: code-group

```bash [pnpm]
pnpm add three @tresjs/leches
```

```bash [npm]
npm install three @tresjs/leches
```

```bash [yarn]
yarn add three @tresjs/leches
```

:::

::: warning
This package is on heavy WIP and it's not ready for production. Expect possible breaking changes.
:::

## Usage

```html
<script lang="ts" setup>
  import { useControls, TresLeches } from '@tresjs/leches'

  const controls = useControls({
    awiwi: true,
    slider: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
    color: '#008080',
  })
</script>

<template>
  <pre>{{ controls }}</pre>
  <TresLeches />
</template>
```

<GettingStartedDemo />

To use `TresLeches` in your project, you need to import the `TresLeches` component and the `useControls` composable from `@tresjs/leches`.

```ts
import { TresLeches, useControls } from '@tresjs/leches'
```

<!-- Removed outdated CSS import instructions -->

In your Vue app, you need to use the `useControls` composable to create the controls.

```ts
const { isButtonVisible } = useControls({
  isButtonVisible: true,
})
```

And then you can use the controls in your template.

```html
<TresLeches />
<div v-show="isButtonVisible">
  <button>{{ isButtonVisible ? 'Hide' : 'Show' }}</button>
</div>
```

The `useControls` composable returns an object with the controls values as [Vue Refs](https://vuejs.org/api/reactivity-core.html#ref) so you can use them as you would use any other reactive value.

```ts
const { isButtonVisible } = useControls({
  isButtonVisible: true,
})

watch(isButtonVisible, (value) => {
  console.log('Is button visible?', value)
})
```

For more info about the `useControls` composable, check the next page below 👇🏻.
