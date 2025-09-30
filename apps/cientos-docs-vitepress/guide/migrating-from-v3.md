# Migration Guide from v3

This guide is intended to help you migrate from Cientos v3 to v4 🤩✨.

::: code-group

```bash [pnpm]
pnpm update @tresjs/cientos
```

```bash [npm]
npm update @tresjs/cientos
```

```bash [yarn]
yarn upgrade @tresjs/cientos
```

:::

## What's new?

### Updated `defineExport` properties

Since the beginning we exported our components' underlying `Three.js` instances using the name `value`. This created a very ambiguos situation with some components. When we access them using a `ref` in `<template>`, we ended up with something like:

```vue{6}
<script>
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'

const starsRef = shallowRef()

watch(starsRef, () => {
  // to access the instance we have a nested `value.value`
  console.log(starsRef.value.value)
  // Wrong in v4 ❌
})
</script>
<template>
  <TresCanvas>
    ...
    <Stars ref="starsRef" />
    ...
  </TresCanvas>
</template>
```

This created confusion and was not good DX. Unfortunately, to fix this, a breaking change needed to be introduced, and we felt this was the right moment.

The new implementation is very similar, but instead of two confusing `value`s we have standardized all our components with `instance`, so to access the components now use:

```js
// Correct in v4 ✅
console.log(starsRef.value.instance)
```

### Remove `TweakPane` from deps

After some iteration, we decided to drop the instance of `useTweakPane`. Some of the reasons are:

- No compatibility with the v4 of [TweakPane](https://tweakpane.github.io/docs/)
- Massive bundle size
- Not so intuitive, lots of code repetition
- Support for the upcoming pkg [Leches](https://tresleches.tresjs.org/)

You can check this recipe on the tres docs on how to use tweakpane with tres: [TweakPane](https://docs.tresjs.org/cookbook/tweakpane.html)

### Move directives to core

The use of `directives` started as a experiment to see how valuable it would be for the ecosystem. Since it has had a good reception, we have decided that it is appropriate for the `directives` to live under the core pkg [Directives section](https://docs.tresjs.org/directives/v-log.html).

So now you have to import your directives from the core:
```ts
// Correct ✅
import { vLog } from '@tresjs/core'
```

Instead of:
```ts
// Wrong ❌
import { vLog } from '@tresjs/cientos'
```

::: info
Since the addition of the new `useLoop` method, `vAlwaysLookAt` and `vRotate` have been temporarily removed.
:::

### Changes in `KeyboardControls`

The implementation of `KeyboardControls` has been changed, since this component doesn't provide the right setup for what was originally developed. We took the decision to adopt floating controls similar to Unreal Engine 5, which make more sense given the name of this component.

We have also brought the `PointerLockControls` inside `KeyboardControls`, so you don't have to set it up manually.

Learn more about it [here](https://cientos.tresjs.org/guide/controls/keyboard-controls.html).
