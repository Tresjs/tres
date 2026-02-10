---
title: Map Controls
description: similar to OrbitControls but for map views
---

::SceneControlsWrapper
  ::ControlsMapControls
  ::
::

[MapControls](https://threejs.org/docs/index.html?q=controls#examples/en/controls/MapControls) similar to OrbitControls, this control is intended for transforming a camera over a map from bird's eye perspective, but uses a specific preset for mouse/touch interaction and disables screen space panning by default.

## Usage

```vue{7}
<script setup>
import { MapControls } from "@tresjs/cientos"
</script>
<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <MapControls />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
    <TresGridHelper />
  </TresCanvas>
</template>
```

::prose-warning
It is really important that the perspective camera is set first in the canvas. Otherwise the scene might break.
::

## Props

| Prop              | Description                                                                                                      | Default     |
| :---------------- | :--------------------------------------------------------------------------------------------------------------- | ----------- |
| **makeDefault**   | If `true`, the controls will be set as the default controls for the scene.                                       | `false`     |
| **camera**        | The camera to control.                                                                                           | `undefined` |
| **domElement**    | The dom element to listen to.                                                                                    | `undefined` |
| **screenSpacePanning** | Defines how the camera's position is translated when panning. If `true`, the camera pans in screen space. Otherwise, the camera pans in the plane orthogonal to the camera's up direction. | `false` |

::prose-note
All the props of the orbit controls component apply here too.
::
