---
title: Camera Shake
description: Apply smooth camera shake to the active camera.
---

::SceneControlsWrapper
  ::AbstractionsCameraShake
  ::
::

`<CameraShake />` is a component that adds **natural**, *noise-driven motion* to the **active camera**.
It offers **per-axis control**, **adjustable intensity**, and *optional decay* — perfect for *handheld feel*, *footsteps*, *impacts*, or *engine rumble* — and is based on the [Drei `CameraShake` component](https://drei.docs.pmnd.rs/staging/camera-shake#camerashake).

::prose-note
`<CameraShake />` is fully compatible with **`<OrbitControls />`**.
To ensure it works *as expected*, make sure to add the **`make-default`** prop:

```vue
<OrbitControls make-default />
```
::

## Props

| Prop               | Description                                           | Default |
| ------------------ | ----------------------------------------------------- | ------- |
| `intensity`        | The intensity of the shake (0–1).                     | `1`     |
| `decay`            | If `true`, intensity decays over time.                | `false` |
| `decayRate`        | How fast intensity changes when `decay` is enabled.   | `0.65`  |
| `maxYaw`           | Maximum yaw angle in radians.                         | `0.01`  |
| `maxPitch`         | Maximum pitch angle in radians.                       | `0.01`  |
| `maxRoll`          | Maximum roll angle in radians.                        | `0.01`  |
| `yawFrequency`     | Frequency of yaw oscillation.                         | `0.1`   |
| `pitchFrequency`   | Frequency of pitch oscillation.                       | `0.1`   |
| `rollFrequency`    | Frequency of roll oscillation.                        | `0.1`   |
