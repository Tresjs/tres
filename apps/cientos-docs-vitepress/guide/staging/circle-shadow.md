# CircleShadow

<DocsDemo>
    <CircleShadowDemo />
</DocsDemo>

`<CircleShadow />` is a cheap, texture-based radial gradient on a `THREE.PlaneGeometry`.

## Usage

<<< @/.vitepress/theme/components/CircleShadowDemo.vue

## Props

All props are optional.

| Name | Description | Default |
| :--- | :--- | ------- |
| `color` | Color of the shadow as a `Color \| number \| string` | `'black'` |
| `opacity` | Opacity of the shadow | `0.5` |
| `offset` | Placement of the first radial gradient color stop. `0.0` is the center of the circle. `1.0` is edge. | `0` |
| `fog` | Whether the material is affected by fog | `false` |
| `depthWrite` | Whether rendering the material has any effect on the depth buffer | `false` |
