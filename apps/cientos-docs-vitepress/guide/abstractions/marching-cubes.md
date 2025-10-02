# MarchingCubes

<DocsDemo>
  <MarchingCubesDemo />
</DocsDemo>

`<MarchingCubes />` is a wrapper around [THREE's Marching Cubes](https://threejs.org/examples/#webgl_marchingcubes).

It includes 3 components:

* `<MarchingCubes />` – container element for `<MarchingCube />`s and `<MarchingPlane />`s
* `<MarchingCube />` - an individual metaball
* `<MarchingPlane />` – optional bounding plane that interacts with the metaballs

## Usage

<<< @/.vitepress/theme/components/MarchingCubesDemo.vue

## Props

| Prop | Description | Default |
| :----| :---------- | ------- |
| `resolution` | Resolution of the marching cube field. Higher resolution produces smoother meshes at the cost of performance and memory. | `28` |
| `maxPolyCount` | Maximum number of polygons to generate.  | `10000` |
| `enableUvs` | Whether UVs are enabled. | `false` |
| `enableColors` | Whether vertex colors are enabled. | `false` |

## `<MarchingCube />` Props

| Prop | Description | Default |
| :----| :---------- | ------- |
| `strength` | How strongly this cube affects the marching cube field. | `0.5` |
| `subtract` | How quickly strength moves to `0` over distance. | `12` |

## `<MarchingPlane />` Props

| Prop | Description | Default |
| :----| :---------- | ------- |
| `planeType` | Which axis the plane appears on. `'x' \| 'y' \| 'z'` | `'x'` |
| `strength` | How strongly this plane affects the marching cube field. | `0.5` |
| `subtract` | How quickly strength moves to `0` over distance. | `12` |
