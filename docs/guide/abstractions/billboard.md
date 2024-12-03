# Billboard

<DocsDemo>
  <BillboardDemo />
</DocsDemo>

Adds a `THREE.Group` that faces the camera.

## Usage

<<< @/.vitepress/theme/components/BillboardDemo.vue

## Props

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `autoUpdate`     | Whether the `<Billboard />` should face the camera automatically on every frame.       | `true`  |
| `lockX`          | Whether to lock the x-axis.                          | `false` |
| `lockY`          | Whether to lock the y-axis.                          | `false` |
| `lockZ`          | Whether to lock the z-axis.                          | `false` |
