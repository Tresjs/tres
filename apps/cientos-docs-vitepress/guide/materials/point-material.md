# PointMaterial

<DocsDemo>
  <PointMaterialDemo />
</DocsDemo>

`<PointMaterial />` extends `THREE.PointsMaterial`. It renders the points as dots, rather than the default squares.

::: info
N.B., stacking order and transparency of objects using `THREE.PointsMaterial` and by extension `<PointMaterial />` can be somewhat unintuitive, especially when combined with other on-screen objects. [Please see discussions at threejs.org for more infomation.](https://discourse.threejs.org/search?q=points%20transparency)
:::

## Usage

<<< @/.vitepress/theme/components/PointMaterialDemo.vue

## Props

All [`THREE.PointsMaterial` properties](https://threejs.org/docs/#api/en/materials/PointsMaterial) are inherited by `PointMaterial`.
