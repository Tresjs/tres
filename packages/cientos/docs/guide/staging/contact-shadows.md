# ContactShadows

<DocsDemo>
  <ContactShadowsDemo />
</DocsDemo>

`<ContactShadows />` is a "fake", non-lighting-based shadow component. It displays shadows on a single plane. The component is based on the [THREE.js contact shadows example](https://threejs.org/examples/webgl_shadow_contact.html) by [@mrdoob](https://twitter.com/mrdoob).

## Usage

<<< @/.vitepress/theme/components/ContactShadowsDemo.vue

## Props

| Prop         | Description                                                                    | Default     |
| ------------ | ------------------------------------------------------------------------------ | ----------- |
| `opacity`    | The opacity of the shadows.                                                    | `1`         |
| `blur`       | The blur of the shadows.                                                       | `1`         |
| `color`      | The color of the shadows.                                                      | `'#000000'` |
| `tint`       | If provided, the color of the "core" of the shadows. "Added" to `color`.       | `undefined` |
| `scale`      | The scale of the shadows/shadow plane. Can be a number or an array of two numbers `[x, y]`. | 10        |
| `width`      | The width of the shadow plane.                                                 | `1`         |
| `height`     | The height of the shadow plane.                                                | `1`         |
| `far`        | The distance of the orthographic shadow camera extends above the shadow plane. | `10`        |
| `smooth`     | Whether the shadows should be smoothed to reduce artifacts.                    | `true`      |
| `resolution` | The resolution of the shadow textures.                                         | `512`       |
| `frames`     | For performance, optionally stop updating shadows after `frames` frames.       | `Math.POSITIVE_INFINITY`  |
| `depthWrite` | Whether the shadows should write to the depth buffer or not.                   | `false`     |
