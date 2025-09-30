# StatsGl

[stats-gl](https://github.com/RenaudRohlinger/stats-gl) is a powerful WebGL performance monitoring tool created by [RenaudRohlinger](https://github.com/RenaudRohlinger).
It offers simple information boxes to track code performance and serves as a more advanced alternative to [stats.js](https://github.com/mrdoob/stats.js/), capable of displaying CPU and GPU metrics.

In TresJS, you can effortlessly create a performance monitoring panel in the top left corner of your canvas by using the StatsGl component.
Simply drop the StatsGl component into your TresCanvas for easy performance monitoring.

## Basic usage

```vue{3,8}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { StatsGl } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <StatsGl />
  </TresCanvas>
</template>
```

## Options

| Name              | Type      | Default | Description                                          |
| :---------------- | --------- | ------- | ---------------------------------------------------- |
| **logsPerSecond** | `number`  | `20`    | How often to log performance data, in logs per second. |
| **samplesLog**    | `number`  | `100`   | Number of recent log samples to keep for computing averages. |
| **samplesGraph**  | `number`  | `10`    | Number of recent graph samples to keep for computing averages. |
| **precision**     | `number`  | `2`     | Precision of the data, in the number of decimal places (only affects CPU and GPU). |
| **horizontal**    | `boolean` | `true`  | Display the canvases on the X-axis, set to align on the vertical axis. |
| **minimal**       | `boolean` | `false` | A boolean value to control the minimalistic mode of the panel display. If set to true, a simple click on the panel will switch between different metrics. |
| **mode**          | `number`  | `0`     | Sets the initial panel to display - 0 for FPS, 1 for CPU, and 2 for GPU (if supported). |
