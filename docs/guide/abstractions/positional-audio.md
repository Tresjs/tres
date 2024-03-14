# Positional Audio

<DocsDemo>
  <PositionalAudioDemo />
</DocsDemo>

The `cientos` package provides an abstraction of the [PositionalAudio](https://threejs.org/docs/index.html?q=posi#api/en/audio/PositionalAudio), `<PositionalAudio>` is an object specifically designed for controlling sound in a scene graph space. This allows for the simulation of various audio environments, creating a more immersive user experience.

`<PositionalAudio>` includes a helper 🛠️ that allows you to view the directional cone of te audio. The helper is based on the [PositionalAudioHelper](https://threejs.org/docs/#examples/en/helpers/PositionalAudioHelper) class.

::: info
This component is still under development, so please report any problems or suggestions on the [@tresjs/cientos](https://github.com/Tresjs/cientos) repository on GitHub.
:::

## Usage

::: info

:::

::: warning

:::

### Minimal

The minimal version is very easy to set up: you just need to insert a `<Decal>` component with a map props for the Texture and a call to `v-bind`.

*The default material is [MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)*.

<DocsDemo>
  <PositionalAudioDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/PositionalAudioDemo.vue{3-4,6-7,16-17}

See [decalsDatas](#decal-datas) part to see the contents of the Decal's datas object of the demo.

### V-For
Description

Demo

Code

## Props

| Prop              | Description                                          | Default                   |
| :---------------- | :--------------------------------------------------- | ------------------------- |
| **debug**         | `boolean` — Debug mode (Useful for positioning Decal)            | `false`                   |
| **map**           | [`Texture`](https://threejs.org/docs/#api/en/textures/Texture) or `null` — The color map. The map should be applied to the `<Decal>` when no material is applied as a child. (See [usages](#usage) for more details)     | `null`                       |
| **mesh**         | [`Mesh`](https://threejs.org/docs/#api/en/objects/Mesh) or `null` — Define the surface to which the decal must attach using the mesh prop. (See [Mesh Prop](#mesh-prop) part for more details)            | `null`                   |
| **position**         | `number[]` — Position of the decal. Transformed into [`Vector3`](https://threejs.org/docs/#api/en/math/Vector3)         | `[-9999,-9999,-9999]`                   |
| **orientation**         | `number[]` — Orientation of the decal. Transformed into [`Euler`](https://threejs.org/docs/#api/en/math/Euler)         | `[0,0,0]`                   |
| **size**         | `number[]` — Size of the decal. Transformed into [`Vector3`](https://threejs.org/docs/#api/en/math/Vector3)           | `[1,1,1]`                   |
| **normal**         | `number[]` — Normal of the decal. Transformed into [`Vector3`](https://threejs.org/docs/#api/en/math/Vector3)        | `[0,0,0]`                   |
| **polygonOffsetFactor**         | `number` — Sets the polygon offset factor | `-10`                   |
| **depthTest**         | `boolean` — Whether to have depth test enabled when rendering this material. | `true`                   |
| **depthWrite**         | `boolean` — Whether rendering this material has any effect on the depth buffer. | `false`                   |
| **order**         | `number` — This value allows the default rendering order of scene graph objects to be overridden although opaque and transparent objects remain sorted independently. <br /> **Sorting is from lowest to highest.** | `Math.round(Math.random() * 100)`                   |
