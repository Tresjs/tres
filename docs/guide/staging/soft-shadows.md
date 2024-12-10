# SoftShadows

<DocsDemo>
    <SoftShadowsDemo />
</DocsDemo>

Injects percent closer soft shadows (pcss) into THREE's shader chunk. Mounting/unmounting this component or changing its props will cause all shaders to be recompiled.

## Usage

<<< @/.vitepress/theme/components/SoftShadowsDemo.vue

## Props

| Name | Description | Default |
| :--- | :--- | ------- |
| size | Size of the light source (the larger the softer the light) | `25` |
| samples | Number of samples (more samples less noise but more expensive) | `10` |
| focus | Depth focus, use it to shift the focal point (where the shadow is the sharpest) | `0` (the beginning) |
