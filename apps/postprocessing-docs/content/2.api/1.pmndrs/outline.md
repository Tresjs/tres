---
title: Outline
description: Apply an outline to selected objects in your scene.
---

::DocsDemo{:controls="false"}
  ::PmndrsOutline
  ::
::

Outline is an effect that applies an outline to objects in your scene. This effect is commonly used to highlight objects. Click a mesh in the demo to toggle its outline.

## Usage

```vue
<script setup lang="ts">
import { EffectComposerPmndrs, OutlinePmndrs } from '@tresjs/post-processing'
import type { Intersection, Object3D } from 'three'

const outlinedObjects = ref<Object3D[]>([])

const toggleMeshSelectionState = ({ object }: Intersection) => {
  if (outlinedObjects.value.some(({ uuid }) => uuid === object.uuid)) {
    outlinedObjects.value = outlinedObjects.value.filter(({ uuid }) => uuid !== object.uuid)
  }
  else {
    outlinedObjects.value = [...outlinedObjects.value, object]
  }
}
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->
    <TresMesh @click="toggleMeshSelectionState">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="hotpink" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <OutlinePmndrs :outlined-objects="outlinedObjects" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| --- | --- | --- |
| `outlinedObjects` | The objects to highlight. | `[]` |
| `blur` | Whether the outline should be blurred. | `false` |
| `xRay` | Whether occluded parts of selected objects should be visible. | `true` |
| `kernelSize` | The blur kernel size. Use together with `blur`. | `KernelSize.VERY_SMALL` |
| `pulseSpeed` | The pulse speed. A value of zero disables the pulse effect. | `0.0` |
| `resolutionX` | The horizontal resolution. | `Resolution.AUTO_SIZE` |
| `resolutionY` | The vertical resolution. | `Resolution.AUTO_SIZE` |
| `edgeStrength` | The edge strength. | `1.0` |
| `patternScale` | The pattern scale. | `1.0` |
| `multisampling` | The number of samples used for MSAA. Requires WebGL 2. | `0` |
| `blendFunction` | The blend function. Use `BlendFunction.ALPHA` for dark outlines. | `BlendFunction.SCREEN` |
| `patternTexture` | A pattern texture. | `null` |
| `resolutionScale` | The resolution scale. | `0.5` |
| `hiddenEdgeColor` | The color of hidden edges. | `0x22090a` |
| `visibleEdgeColor` | The color of visible edges. | `0xffffff` |

## Further Reading

For more details, see the [OutlineEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/OutlineEffect.js~OutlineEffect.html).
