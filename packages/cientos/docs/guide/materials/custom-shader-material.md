# TresCustomShaderMaterial <Badge type="warning" text="^3.6.0" />

<DocsDemo>
  <CustomShaderMaterialDemo />
</DocsDemo>

The `cientos` package provides a new `<TresCustomShaderMaterial />` component which is a wrapper around the [`three-custom-shader-material`](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial) class. As states in the repo, it _"lets you extend Three.js' material library with your own Vertex and Fragment shaders"_.

## Usage

<<< @/.vitepress/theme/components/CustomShaderMaterialDemo.vue{3,7,16-49,55-56,97}

## Props

Being a wrapper around the `CustomShaderMaterial` class, the `<TresCustomShaderMaterial />` component accepts all the props that the class does. You can find the full list of props in the [official repo](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial).
