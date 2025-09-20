# LOD

Level of Detail - show meshes with more or less geometry based on distance from the camera.

`<LOD />` is a wrapper for THREE's [LOD](https://threejs.org/docs/?q=LOD#api/en/objects/LOD) class.

<DocsDemo>
  <LODDemo />
</DocsDemo>

## Usage
<<< @/.vitepress/theme/components/LODDemo.vue

## Props

| Prop               | Description                                                            | Default |
| :----------------- | :--------------------------------------------------------------------- | ------- |
| **levels**           |  `number[]` - The distances at which to display each level of detail. There should be one `levels` value for each `LOD` child. |         |
| **hysteresis**           | Threshold used to avoid flickering at LOD boundaries, as a fraction of distance. | `0.0` |
