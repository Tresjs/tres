# TresCustomShaderMaterial <Badge type="warning" text="^3.6.0" />

<DocsDemo>
  <CustomShaderMaterialDemo />
</DocsDemo>

The `cientos` package provides a new `<TresCustomShaderMaterial />` component which is a wrapper around the [`three-custom-shader-material`](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial) class. As states in the repo, it _"lets you extend Three.js' material library with your own Vertex and Fragment shaders"_.

## Usage

<<< @/.vitepress/theme/components/CustomShaderMaterialDemo.vue{4,9,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,59,60,99}

## Props

Being a wrapper around the `CustomShaderMaterial` class, the `<TresCustomShaderMaterial />` component accepts all the props that the class does. You can find the full list of props in the [official repo](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial).
