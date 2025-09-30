# Precipitation

`<Precipitation />` is a fully flexible component that renders an infinite particle flow, It comes with several props that allow you customize it to create different effects like precipitation, snow, waterfall, beams, etc.

<DocsDemo>
  <PrecipitationDemo />
</DocsDemo>

## Usage

You can use `<Precipitation />` component without passing any props, this will achieve a snowy effect, like the before example.

<<< @/.vitepress/theme/components/PrecipitationDemo.vue{3,9}

### Rain

By setting the randomness to 0, increase the speed  and reduce the count. You can easily achieve a more rainy effect.

<DocsDemo>
  <PrecipitationRainDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/PrecipitationRainDemo.vue{3,9-13}

### Storm

A storm effect? Easy just increase the randomness.

<DocsDemo>
  <PrecipitationStormDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/PrecipitationStormDemo.vue{3,9-13}

### Beam

What about an infinite beam? Just set the area, to the axis that you need constrain.

<DocsDemo>
  <PrecipitationBeamDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/PrecipitationBeamDemo.vue{3,9-15}

You can create much more! ☔

::: warning
Be careful with the performance this components render infinite particles in movement
:::

## Props

| Prop                | Description                                             | Default      |
| :------------------ | :------------------------------------------------------ | ------------ |
| **size**            | The size of the drops.                                  | 0.1          |
| **area**            | The size of the precipitation area.                              | [10, 10, 20] |
| **color**           | The color of the drops.                                  | 0xffffff     |
| **map**             | Color texture of the drops.                             | null         |
| **alphaMap**        | Alpha texture of the Drops.                             | null         |
| **alphaTest**       | Enables the WebGL to know when not to render the pixel. | 0.01         |
| **opacity**         | Set the opacity of the drops.                           | 0.8          |
| **count**           | Number of drops.                                        | 5000         |
| **speed**           | Drops speed.                                            | 0.1          |
| **randomness**      | Add randomness to the drops.                            | 0.5          |
| **depthWrite**      | Whether should write to the depth buffer or not. drops. | true         |
| **transparent**     | Transparency on the drops texture                       | false        |
| **sizeAttenuation** | Keep the same size regardless distance. drops.          | true         |
