# PamCameraMouse

![](/cientos/PamCameraMouse.gif)

`<PamCameraMouse />` is a component that allow you to create easily the pam mouse camera effect. The camera will update automatically according to the mouse position, creating a beautiful nice effect

## Usage

You only need import it and use it `<PamCameraMouse />` additionally you can pass two props, disabled and factor. Factor is a number to increase the movement range of the camera

```vue
<template>
  <TresCanvas>
    <PamCameraMouse />
    <TresScene>
      <Text3D text="TresJS" font="/fonts/FiraCodeRegular.json">
        <TresMeshNormalMaterial />
      </Text3D>
    </TresScene>
  </TresCanvas>
</template>
```

::: warning
By the nature of the pam mouse camera effect it creates conflicts if it's used in combination with OrbitControls
:::

## Props [[1]](#1)

| Prop         | Description                                             | Default |
| :----------- | :------------------------------------------------------ | ------- |
| **disabled** | enable or disabled the effect, boolean                  | false   |
| **factor**   | Number use to increase the range of the camera movement | 5       |
