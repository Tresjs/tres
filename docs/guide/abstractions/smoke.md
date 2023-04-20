# Smoke

`<Smoke />` is a component that renders a smoke in your scene. It is an abstraction that use a combination of textures, transparency and some calculation, to create a beautiful  smoke - cloud - fog effect

<!-- <StackBlitzEmbed projectId="tresjs-text3d-cientos" /> -->

## Usage

::: warning
Smoke componente comes with a default texture abstraction it needs to be wrapped by a Suspense component
:::

You can use `<Smoke />` component without passing any props, but still if you want you can tweak the props to find the best setup for you

```vue
<template>
  <TresCanvas>
  ...
    <Suspense>
      <Smoke />
    </Suspense>
    ...
  </TresCanvas>
</template>
```

Notice that you can pass a texture in combination with props,  to personalize your effect

```vue
<template>
  <TresCanvas>
  ...
    <Suspense>
        <Smoke :speed="0.8" :segments="12" texture="my_texture_path" :color="#f7f" />
      </Suspense>
    ...
  </TresCanvas>
</template>
```
## Props

| Prop               | Description                                                            | Default |
| :----------------- | :--------------------------------------------------------------------- | ------- |
| **opacity**        | The strength of the opacity.                                           |   0.1   |
| **speed**          | The rotation speed of the smoke.                                      | true    |
| **width**          | The base width.                                                        | true    |
| **depth**          | The base depth.                                                        | 0.01    |
| **segments**       | The number of smoke to render.                                        | null    |
| **texture**        | The texture of the smoke.                                             | 5000    |
| **color**          | The color of the smoke.                                               | 50      |
| **depthTest**      | The depthTest.                                                         | 100     |
