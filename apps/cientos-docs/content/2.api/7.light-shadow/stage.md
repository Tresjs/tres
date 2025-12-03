---
title: Stage
description: Creates a complete stage setup with lighting, shadows, and environment.
---

::SceneWrapper
  ::LightShadowStage
  ::
::

This component creates a "stage" for your models. It sets up:

* model lighting
* ground shadows
* zoom to fit
* environment

::UAlert{icon="i-lucide-info" title="Info" color=neutral }

#description
If you are using other camera controls, be sure to make them the 'default'.
```vue
<OrbitControls make-default />
```

::


::UAlert{icon="i-lucide-info" title="Info" color="neutral" style="margin:1rem 0;"}

#description
If you are using shadows='accumulative', enable shadows on your canvas and on your objects.
```vue
<TresCanvas shadows />
```

```vue
<TresMesh cast-shadow />
  ...
</TresMesh>
```
::



## Usage

```vue{3,10-15}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Stage, OrbitControls, Plane } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas shadows>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <OrbitControls make-default />
    <Stage
      lighting="rembrandt"
      shadows="contact"
      :adjust-camera="true"
      environment="city"
      :intensity="0.5"
    >
      <TresMesh cast-shadow>
        <TresBoxGeometry />
        <TresMeshStandardMaterial color="orange" />
      </TresMesh>
      <Plane :position="[0, -2, 0]" receive-shadow :args="[5, 5]">
        <TresMeshStandardMaterial />
      </Plane>
    </Stage>
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| :--- | :---------- | :------ |
| **lighting** | Lighting setup. Options: `null \| undefined \| false \| 'rembrandt' \| 'portrait' \| 'upfront' \| 'soft' \| { main: [x, y, z], fill: [x, y, z] }` | `'rembrandt'` |
| **shadows** | Controls the ground shadows. Options: `boolean \| 'contact' \| 'accumulative' \| StageShadows` | `'contact'` |
| **adjustCamera** | Optionally wraps and thereby centers the models using `<Bounds>`, can also be a camera offset | `true` |
| **environment** | The default environment | `'city'` |
| **intensity** | Lighting intensity, `0` removes lights | `0.5` |
| **align** | To adjust alignment | `undefined` |

### StageShadows Type

When using custom shadow configuration, you can pass an object with the following properties:

| Prop | Description | Default |
| :--- | :---------- | :------ |
| **type** | Shadow type: `'contact' \| 'accumulative'` | - |
| **offset** | Shadow plane offset | `0` |
| **bias** | Shadow bias | `-0.0001` |
| **normalBias** | Shadow normal bias | `0` |
| **size** | Shadow map size | `1024` |

Additionally inherits all props from `AccumulativeShadowsProps`, `RandomizedLightsProps`, and `ContactShadowsProps`.