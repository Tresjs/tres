# Contact Shadows

<DocsDemo>
  <ContactShadowDemo />
</DocsDemo>

A contact shadow implementation is a technique used in 3D graphics to create shadows that appear where objects meet or "contact" each other. This is different from traditional shadowing techniques, which often only create shadows based on the position of a light source relative to an object.

This component is used to create and manage contact shadows in a 3D scene. It is based on the original code by [@mrdoob](https://twitter.com/mrdoob) and the implementation in [pmndrs drei](https://github.com/pmndrs/drei/blob/master/src/core/ContactShadows.tsx#L113) but adapted for Vue Composition API.

## Usage

```vue{11}
<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Box ref="boxRef" :args="[0.4, 0.4, 0.4]" :position="[0, 1, 0]">
      <TresMeshNormalMaterial />
    </Box>
    <Icosahedron ref="icoRef" :args="[0.3]" :position="[1, 1, 1]">
      <TresMeshNormalMaterial />
    </Icosahedron>
    <ContactShadows :blur="0.5" :resolution="512" :opacity="0.2" />
    <Plane :args="[10, 10, 10]" :position="[0, -0.02, 0]">
      <TresMeshBasicMaterial :color="'#ffffff'" />
    </Plane>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

| Prop         | Description                                                                    | Default   |
| ------------ | ------------------------------------------------------------------------------ | --------- |
| `opacity`    | The opacity of the shadows.                                                    | 1         |
| `width`      | The width of the shadows.                                                      | 1         |
| `height`     | The height of the shadows.                                                     | 1         |
| `blur`       | The blur of the shadows.                                                       | 1         |
| `far`        | How far the OrthographicCamera should be to capture the shadows.               | 10        |
| `smooth`     | Whether the shadows should be smooth or not.                                   | true      |
| `resolution` | The resolution of the shadows.                                                 | 512       |
| `frames`     | The number of frames to render the shadows.                                    | Infinity  |
| `scale`      | The scale of the shadows. Can be a number or an array of two numbers `[x, y]`. | 10        |
| `color`      | The color of the shadows.                                                      | '#000000' |
| `depthWrite` | Whether the shadows should write to the depth buffer or not.                   | false     |
