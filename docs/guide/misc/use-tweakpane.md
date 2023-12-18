# useTweakPane <Badge type="warning" text="deprecated" />

::: warning

useTweakPane is deprecated as of Cientos v3.7.0 and will no longer be part of this package. Please migrate to [`@tresjs/leches` package](https://github.com/Tresjs/leches) or [v-tweakpane](https://github.com/vinayakkulkarni/v-tweakpane) instead.

:::

[TweakPane](https://cocopon.github.io/tweakpane/) is a JavaScript library for creating a user interface for tweaking values of JavaScript variables. It's a great tool for fine-tuning parameters and monitoring value changes on your three.js applications.


::: code-group

```bash [pnpm]
pnpm add @tweakpane/core @tweakpane/essentials -D
```

```bash [npm]
npm install @tweakpane/core @tweakpane/essentials -D

```

```bash [yarn]
yarn add @tweakpane/core @tweakpane/plugin-essentials -D
```

:::

**TresJS** provides a composables called `useTweakPane` that creates a Tweakpane panel to your container so you can add tweaks to it. By default, the panel is created on the top right corner of the canvas and includes a FPS graph monitor to keep and eye on the performance of your scene.

::: info
You can change the container of the panel by passing the `selector` option to the `useTweakPane` function.
:::

## Basic usage

```ts
import { useTweakPane } from '@tresjs/cientos'

const { pane } = useTweakPane()

const experiment = reactive({
  clearColor: '#000000',
  alpha: true,
  shadow: true,
})

pane.addInput(experiment, 'clearColor', {
  label: 'Clear Color',
  colorMode: 'hex',
})

pane.addInput(experiment, 'alpha')
```

The result will be something like this:

![](/use-tweakpane.png)

## Options

| Name         | Type     | Default     | Description                                                    |
| :----------- | -------- | ----------- | -------------------------------------------------------------- |
| **selector** | `string` | `undefined` | The selector of the container where the panel will be created. |
