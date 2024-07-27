# Installation

Learn how to install `@trejs/leches`

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
import '@tresjs/leches/styles'

useControls({
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
  <TresLeches />
</template>
```

<GettingStartedDemo />

