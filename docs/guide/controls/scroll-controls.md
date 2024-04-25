# ScrollControls

<DocsDemo>
  <ScrollControlsDemo />
</DocsDemo>

`ScrollControls` use scroll as a trigger for control the scene, you can use the HTML native scroll or use the one that it get creates for you.

The `cientos` package create this controls from scratch for you, and comes with really useful props to customize your experiences, try it out. ✨

## Usage

To start using it, you just need to import it and play with it.

<<< @/.vitepress/theme/components/ScrollControlsDemo.vue{3,14}

::: warning
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
:::

You can use the `horizontal` prop, to makes the scroll horizontal way.

<DocsDemo>
  <ScrollControlsHorizontalDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/ScrollControlsHorizontalDemo.vue{3,14}

With the `pages` prop you can control the length of the scroll, and with the `distance` you can control how much movement is apply to the objects ( you can for example use it with 0 value and use the progress element)

In addition a nice effect could be achieve by using the `smoothScroll` prop like so:
<DocsDemo>
  <ScrollControlsPagesDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/ScrollControlsPagesDemo.vue{14-18}

By default `ScrollControls` creates a scroll around the canvas and takes the camera as a default for animate, also it comes with a reactive `progress` param that returns a normalized value from 0 (start point) to 1 (end point) you just need to attach it to a v-model.

<DocsDemo>
  <ScrollControlsProgressDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/ScrollControlsProgressDemo.vue{7,27-30}

If you don't want to use the default camera movement you can set the distance to 0 a just rely on progress to animate (the progress is not affected by the `smoothScroll` )

<DocsDemo>
  <ScrollControlsProgressCameraDemo />
</DocsDemo>

But it's not all, you can also pass the `htmlScroll` props this will deactivate the custom scroll and use the native html scroll.

```vue{1}
    <ScrollControls htmlScroll />
```

::: warning
- If you set the `htmlScroll` you need to set your html to have content that create scroll. so the `pages` prop will not work
- The `htmlScroll` will set the TresCanvas as a fixed background.
:::

### Slots

The elements that you pass as a slot will be affected by the scroll effect, and follow the camera.

<DocsDemo>
  <ScrollControlsSlotsDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/ScrollControlsSlotsDemo.vue{31-43}

## Props

| Prop             | Description                                              | Default |
| :--------------- | :------------------------------------------------------- | ------- |
| **pages**        | The length of the scroll (not available with htmlScroll) | `4`     |
| **distance**     | The distance to move the objects                         | `4`     |
| **smoothScroll** | The smooth factor of the scrolling.                      | `0.5`   |
| **horizontal**   | Whether the scroll is horizontal or vertical.            | `false` |
| **htmlScroll**   | Whether to use the native HTML scroll.                   | `false` |

::: warning
Currently the props are not reactive for this control
:::
