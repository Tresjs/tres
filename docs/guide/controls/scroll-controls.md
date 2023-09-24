# ScrollControls

<DocsDemo>
  <ScrollControlsDemo />
</DocsDemo>

`ScrollControls` use scroll as a trigger for control the scene, you can use the HTML native scroll or use the one that it get creates for you.

The `cientos` package create this controls from scratch for you, and comes with really useful props to customize your experiences, try it out. ✨

## Usage

To start using it, you just need to import it and play with it.

```vue{4}
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <ScrollControls />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

::: warning
Is really important that the Perspective camera is set first in the canvas. Otherwise might break.
:::

By default `ScrollControls` creates a scroll around the canvas and takes the camera as a default for animate, also it comes with a reactive `progress` param that returns a normalized value from 0 (start point) to 1 (end point) you just need to attach it to a v-model.

```vue{2-5,10}
<script setup>
const progress = ref(0) // it will return a normalized number from 0 to 1
watchEffect(() => {
  console.log('tresjs ~ progress:', progress.value)
})
</script>
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <ScrollControls v-model="progress" />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

You can use the `horizontal` prop, to makes the scroll horizontal way,.

```vue{4}
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <ScrollControls v-model="progress" horizontal />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

With the `pages` prop you can control the length of the scroll, and with the `distance` you can control how much movement is apply to the objects ( you can for example use it with 0 value and use the progress element)

```vue{4-8}
<template>
  <TresCanvas window-size> // 
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <ScrollControls
    v-model="progress"
    :pages="20" // the scroll length will be really long
    :distance="0" // the objects (camera by default) will follow the scroll
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

But it's not all, you can also pass the `htmlScroll` props and deactivate the custom scroll and use the native html scroll.

```vue{5}
<template>
<div style="height="200vh"></div> //
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <ScrollControls v-model="progress" htmlScroll />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

::: warning
- If you set the `htmlScroll` you need to set your html to have content that create scroll. so the `pages` prop will not work
- The `htmlScroll` will set the TresCanvas as a fixed background.
:::

### Slots

The elements that you pass as a slot will be affected by the scroll effect, and follow the camera.

```vue{5-7}
<template>
<div style="height="200vh"></div> //
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 0, 3]" />
    <ScrollControls v-model="progress" htmlScroll >
      <Box :args="[1, 1, 1]" color="green" /> // will follow the camera
    </ScrollControls>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

## Props

| Prop             | Description                                              | Default |
| :--------------- | :------------------------------------------------------- | ------- |
| **pages**        | The length of the scroll (not available with htmlScroll) | `4`     |
| **distance**     | The distance to move the objects                         | `4`     |
| **smoothScroll** | The smooth factor of the scrolling.                      | `0.5`   |
| **horizontal**   | Whether the scroll is horizontal or vertical.            | `false` |
| **htmlScroll**   | Whether to use the native HTML scroll.                   | `false` |
