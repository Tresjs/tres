# Camera Shake

`<CameraShake />` is a component that adds **natural**, *noise-driven motion* to the **active camera**.
It offers **per-axis control**, **adjustable intensity**, and *optional decay* — perfect for *handheld feel*, *footsteps*, *impacts*, or *engine rumble* — and is based on the [Drei `CameraShake` component](https://drei.docs.pmnd.rs/staging/camera-shake#camerashake).

<DocsDemo>
  <CameraShakeDemo />
</DocsDemo>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/CameraShakeDemo.vue{0}
</details>

## Usage

You can use `<CameraShake />` component without passing any props, but still if you want you can tweak the props to find the best setup for you

```vue{8}
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />

    <!-- YOUR SCENE -->

    <OrbitControls make-default />
    <CameraShake :intensity="0.5" />
  </TresCanvas>
</template>
```

::: info
`<CameraShake />` is fully compatible with **`<OrbitControls />`**.
To ensure it works *as expected*, make sure to add the **`make-default`** prop:

```vue
<OrbitControls make-default />
```
:::

## Understanding `Pitch`, `Yaw`, and `Roll`
<img class="mx-auto w-90%" src="/camera-shake/schema.webp" />

## Props

| **Prop**            | **Description**                                                                                                   | **Default** |
|---------------------|-------------------------------------------------------------------------------------------------------------------|-------------|
| `intensity`         | **Controls the overall strength** of the shake effect.                                                            | `1`         |
| `decay`             | **Enables gradual reduction** of shake intensity over time.                                                       | `false`     |
| `decayRate`         | **Sets the speed** at which intensity decays per second when `decay` is enabled. Multiplied by `delta` each frame.| `0.65`      |
| `maxYaw`            | **Maximum amplitude** for yaw (horizontal rotation) in radians.                                                   | `0.01`      |
| `maxPitch`          | **Maximum amplitude** for pitch (vertical rotation) in radians.                                                   | `0.01`      |
| `maxRoll`           | **Maximum amplitude** for roll (tilt) in radians.                                                                 | `0.01`      |
| `yawFrequency`      | Frequency of **yaw oscillation**, used with elapsed time in Simplex noise calculations.                           | `0.1`       |
| `pitchFrequency`    | Frequency of **pitch oscillation**.                                                                               | `0.1`       |
| `rollFrequency`     | Frequency of **roll oscillation**.                                                                                | `0.1`       |
