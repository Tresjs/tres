# useTweakPane

[TweakPane](https://cocopon.github.io/tweakpane/) is a JavaScript library for creating a user interface for tweaking values of JavaScript variables. It's a great tool for fine-tuning parameters and monitoring value changes on your three.js applications.

**TresJS** provides a composables called `useTweakPane` that creates a Tweakpane panel to your container so you can add tweaks to it. By default, the panel is created on the top right corner of the canvas and includes a FPS graph monitor to keep and eye on the performance of your scene.

## Basic usage

```ts
import { useTweakPane } from '@tresjs/cientos'

const { pane } = useTweakPane()

const experiment = reactive({
  clearColor: '#000000',
  alpha: true,
  shadow: true,
})

pane.addInput(state, 'clearColor', {
  label: 'Clear Color',
  colorMode: 'hex',
})

pane.addInput(experiment, 'alpha')
```

The result will be something like this:

![](/use-tweakpane.png)
