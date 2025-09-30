# CubeCamera

<DocsDemo>
  <CubeCameraDemo />
</DocsDemo>

`<CubeCamera />` creates a `THREE.CubeCamera` and uses it to render an environment map of your scene. The environment map is then applied to component's children.

`<CubeCamera />` makes its children invisible while rendering to the internal buffer so that they are not included in the reflection.

## Usage

<<< @/.vitepress/theme/components/CubeCameraDemo.vue

## Props

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `frames`         | Number of frames to render. Set to `1` for a static scene. `Infinity` to update continuously.  | `Infinity`    |
| `resolution`     | Resolution of the FBO                                | `255`         |
| `near`           | Camera near                                          | `0.1`         |
| `far`            | Camera far                                           | `1000`        |
| `envMap`         | Custom environment map that is temporarily set as the scene's background | |
| `fog`            | Custom fog that is temporarily set as the scene's fog | |
