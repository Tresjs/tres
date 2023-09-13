# SVG <Badge type="warning" text="^3.3.0" />

A wrapper around the `three` [SVGLoader](https://threejs.org/examples/?q=sv#webgl_loader_svg), this component allows you to easily load and display SVG elements in your **TresJS** scene. 

## Usage

```ts
import { SVG } from '@tresjs/cientos'
```

```vue{4}
<template>
  <TresCanvas>
    <Suspense>
      <SVG src="/favicon.svg" />
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop                | Type                                             | Description                                                        | Default       |
| :------------------ | -------------------------------------------------| :----------------------------------------------------------------- | ------------- |
| **src**             | `string`                                         | Either a path to an SVG *or* an SVG string                         |               |
| **skipStrokes**     | `boolean`                                        | If `true`, the SVG strokes will not be rendered.                   | `false`       |
| **skipFills**       | `boolean`                                        | If `true`, the SVG fills will not be rendered.                     | `false`       |
| **strokeMaterial**  | `MeshBasicMaterialParameters`                    | Props to assign to the stroke materials of the resulting meshes.   | `undefined`   |
| **fillMaterial**    | `MeshBasicMaterialParameters`                    | Props to assign to the fill materials of the resulting meshes.     | `undefined`   |
| **strokeMeshProps** | `TresOptions`                                    | Props to assign to the resulting stroke meshes.                    | `undefined`   |
| **fillMeshProps**   | `TresOptions`                                    | Props to assign to the resulting fill meshes.                      | `undefined`   |
| **depth**           | `'renderOrder' \| 'flat' \| 'offsetZ' \| number` | Specify how SVG layers are to be rendered. ([See "Depth"](#depth)) | `renderOrder` |

## Depth

The `SVG` component's `depth` prop allows you to specify how the 2D layers will be rendered in 3D. It accepts the following values:

### `'renderOrder'`

**Use case: Lone SVGs or applications that don't rely on stacked SVGs**

This is the default `depth` option.

This value sets the materials' `depthWrite` to `false` and increments the [mesh layers' `renderOrder`](https://threejs.org/docs/?q=mesh#api/en/core/Object3D.renderOrder). This makes the SVG layers render dependably regardless of perspective.

Disadvantage: Scene objects may render out of order.

SVG layers with higher `renderOrder` will be rendered after (i.e., sometimes "on top of") other objects in the scene graph with a lower `renderOrder`. Depending on their settings, those other objects may render behind the SVG, even if they are closer to the camera.

### `'flat'`

**Use case: simple SVGs**

This option sets the [materials' `depthWrite`](https://threejs.org/docs/?q=mesh#api/en/materials/Material.depthWrite) to `false`.

Disadvantage: SVG layers may render out of order.

Overlapping layers in an SVG may be drawn out of order, depending on viewing perspective.

### `'zOffset'`

**Use case: unscaled SVGs seen from the front**

When this value is passed, the result is a 3D "stack" of mesh layers. A small space is added between each mesh layer in the "stack". 

Disadvantage: "Bottom" of the "stack" is visible; layers may z-fight.

When seen from behind, the "bottom" of the mesh layer "stack" is visible. The space between the layers may be noticeable depending on viewing perspective and scale. The layers may [z-fight](https://en.wikipedia.org/wiki/Z-fighting), particularly if the SVG is scaled down. 

### `number`

**Use case: SVGs seen from the front**

This is the same as `'zOffset'` but allows you to specify how much space is added between each layer, in order to eliminate [z-fighting](https://en.wikipedia.org/wiki/Z-fighting). For most use cases, this should be a value greater than 0.025 and less than 1.

Disadvantage: "Bottom" of the "stack" is visible.

## Troubleshooting

::: warning
This is not a general-purpose SVG renderer. Many SVG features are unsupported. 
:::

Here are some things to try if you run into problems:

### Error: "XML Parsing Error: unclosed token"

* In the SVG source, convert hex colors to rgb, e.g., convert `#ff0000` to `rgb(255, 0, 0)`.

### Parts of the SVG render in the wrong order or disappear, depending on viewing angle

* In the component, [change the `depth` prop](#depth).
* In the SVG source, use `fill="none"` rather than `fill-opacity="0"`.

### Parts of the SVG ["z-fight"](https://en.wikipedia.org/wiki/Z-fighting)

* In the component, [change the `depth` prop](#depth).
* Increase the distance between the component and other on-screen elements.