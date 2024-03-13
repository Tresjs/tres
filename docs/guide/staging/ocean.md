# Ocean

<DocsDemo>
  <OceanDemo />
</DocsDemo>

`<Ocean />` is a wrapper for the [Three.js `Water` add-on](https://threejs.org/examples/?q=ocean#webgl_shaders_ocean).

::: warning
<Ocean /> comes with a default texture, so it needs to be wrapped in a Suspense component.
:::

## Usage

<<< @/.vitepress/theme/components/OceanDemo.vue{3,11}

### SKY

<Ocean /> works hand in hand with the Sky component, detecting the position of the sun and reflecting on the water.
(<Sky /> is not required for making this component work.)

### Fog

The `<Ocean />` component also reacts when there's [Fog](https://threejs.org/docs/index.html?q=fog#api/en/scenes/Fog) or [FogExp2](https://threejs.org/docs/index.html?q=fog#api/en/scenes/FogExp2) in your scene.

## Custom Geometry

You can use custom geometry by adding it as a child.

```
    <Suspense>
      <Ocean>
        <TresCircleGeometry :args="[50, 16]" />
      </Ocean>
    </Suspense>
```

## Props

::: warning
All of the props of this component are not reactive.
:::

| Prop                | Description                                  | Default                                                                                          |
| :------------------ | :------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **textureWidth**    | Width of the mirror texture                  | 512                                                                                              |
| **textureHeight**   | Height of the mirror texture                 | 512                                                                                              |
| **waterNormals**    | Normals of the water                         | https://raw.githubusercontent.com/Tresjs/assets/main/textures/water-normals/Water_1_M_Normal.jpg |
| **sunDirection**    | Sun direction to be reflected on the water   | Vector3(0,0,0)                                                                                   |
| **sunColor**        | Sun color to be reflected on the water       | 0xffffff                                                                                         |
| **waterColor**      | Water Color                                  | 0x001e0f                                                                                         |
| **distortionScale** | Distortion scale on reflected objects        | 3.7                                                                                              |
| **size**            | Size of the water normals                    | 1                                                                                                |
| **clipBias**        | To use the clipBias property                 | 0.0                                                                                              |
| **alpha**           | To use the clipBias Alpha                    | 1.0                                                                                              |
| **side**            | Which size of the mesh will render the water | FrontSide                                                                                        |
