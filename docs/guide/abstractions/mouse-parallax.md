# MouseParallax

<DocsDemo>
  <MouseParallaxDemo />
</DocsDemo>

`<MouseParallax />` is a component that allow you to create easily the pam parallax effect. The camera will update automatically according to the mouse position, creating a beautiful nice effect

## Usage

You only need import it and use it `<MouseParallax />` additionally you can pass two props, ease and factor.

Factor is a number to increase the movement range of the camera and ease it's a boolean that create a smooth transition. Also you can disabled with the "disable" prop

```vue
<template>
  <TresCanvas>
    <MouseParallax />
    <Text3D
      text="TresJS"
      font="/fonts/FiraCodeRegular.json"
    >
      <TresMeshNormalMaterial />
    </Text3D>
  </TresCanvas>
</template>
```

## Props

| Prop         | Description                                             | Default |
| :----------- | :------------------------------------------------------ | ------- |
| **disabled** | enable or disabled the effect, boolean                  | false   |
| **factor**   | Increase the range of the parallax | 2.5       |
| **ease-factor**   | enable or disabled the easing effect | true       |
