# Image

<DocsDemo>
  <ImageDemo />
</DocsDemo>

`<Image />` is a shader-based component that optionally loads then displays an image texture on a default plane or on your custom geometry.

## Usage

<<< @/.vitepress/theme/components/ImageDemo.vue

## Props

::: info
`<Image />` is a THREE.Mesh and most Mesh attributes can be used as props on the component.
:::

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `segments`          | Number of divisions in the default geometry.              | `1`           |
| `scale` | Scale of the geometry. `number \| [number, number]`                         | `1`           |
| `color`    | Color multiplied into the image texture.                         | `'white'`           |
| `zoom`          | Shrinks or enlarges the image texture. | `1` |
| `radius`        | Border radius applied to the image texture. (Intended for rectangular geometries. Use with `transparent`.) | `0` |
| `grayscale`        | Power of grayscale effect. 0 is off. 1 is full grayscale. | `0` |
| `toneMapped`        | Whether this material is tone mapped according to the renderers toneMapping settings. [See THREE.material.tonemapped](https://threejs.org/docs/?q=material#api/en/materials/Material.toneMapped) | `0` |
| `transparent` |  Whether the image material should be transparent. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent) | `false` |
| `transparent` |  Whether the image material should be transparent. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent) | `false` |
| `opacity` | Opacity of the image material. [See THREE.material.transparent](https://threejs.org/docs/?q=material#api/en/materials/Material.transparent) | `1` |
| `side` | THREE.Side of the image material. [See THREE.material.side](https://threejs.org/docs/?q=material#api/en/materials/Material.side) | `FrontSide` |
| `texture` | Image texture to display on the geometry. |  |
| `url` | Image URL to load and display on the geometry. |  |
