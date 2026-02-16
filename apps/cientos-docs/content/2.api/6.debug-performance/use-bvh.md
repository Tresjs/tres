---
title: useBVH
description: Speed up raycasting with Bounding Volume Hierarchy (BVH) optimization.
---

::SceneControlsWrapper
  ::DebugPerformanceUseBVH
  ::
::

A composable that dramatically improves raycasting performance by building a Bounding Volume Hierarchy (BVH) for your meshes. This can speed up raycasting by **orders of magnitude**, especially for complex models with many triangles.

Built on top of [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) by [Garrett Johnson](https://github.com/gkjohnson).

## What is BVH?

BVH (Bounding Volume Hierarchy) is a spatial data structure that organizes geometry into a tree of bounding boxes. Instead of testing every triangle during raycasting, the algorithm tests bounding boxes first and only checks triangles in boxes that intersect the ray. This reduces raycasting complexity from O(n) to O(log n).

**Use cases:**
- Interactive 3D applications with raycasting (mouse picking, selection)
- Complex models with thousands of triangles
- Scenes with multiple raycasting operations per frame

## Usage

### Basic Usage

```vue{2,5-8,10}
<script setup lang="ts">
import { useGLTF, useBVH } from '@tresjs/cientos'

const { state: model } = useGLTF('/models/complex-model.glb')
useBVH(() => model.value?.scene)
</script>

<template>
  <primitive v-if="model" :object="model.scene" />
</template>
```

### With Debug Visualization

Enable debug mode to visualize the BVH bounding boxes:

```vue{4-7}
<script setup lang="ts">
import { useGLTF, useBVH } from '@tresjs/cientos'

const { state: model } = useGLTF('/models/model.glb')

useBVH(
  () => model.value?.scene,
  {
    debug: true, // Show BVH bounding boxes
  }
)
</script>
```

### Reactive Enabled State

Control BVH optimization dynamically:

```vue{4,6-9}
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGLTF, useBVH } from '@tresjs/cientos'

const bvhEnabled = ref(true)

const { state: model } = useGLTF('/models/model.glb')

useBVH(
  () => model.value?.scene,
  {
    enabled: bvhEnabled,
  }
)

</script>

<template>
  <div>
    <button @click="bvhEnabled = !bvhEnabled">
      Toggle BVH
    </button>
    <primitive v-if="model" :object="model.scene" />
  </div>
</template>
```

## Options

Options are divided into **reactive** (can change at runtime) and **static** (set once at creation - changing requires toggling `enabled` off/on to rebuild).

### Reactive Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **enabled** | `MaybeRefOrGetter<boolean>` | `true` | Enable/disable BVH optimization. Toggling rebuilds BVH structures. |
| **debug** | `MaybeRefOrGetter<boolean>` | `false` | Show debug visualization of BVH bounding boxes. |

### Static Options (BVH Construction)

These options configure how the BVH is built. Changing them after creation has no effect - toggle `enabled` off/on to rebuild with new values.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **firstHitOnly** | `boolean` | `false` | Use `raycastFirst` for better performance when only the first hit is needed. |
| **splitStrategy** | `'CENTER' \| 'AVERAGE' \| 'SAH'` | `'SAH'` | BVH build strategy. See section below.   |
| **maxDepth** | `number` | `40` | Maximum tree depth for the BVH structure. |
| **maxLeafSize** | `number` | `10` | Target number of triangles per leaf node. |
| **verbose** | `boolean` | `false` | Print construction warnings and progress to console. |
| **setBoundingBox** | `boolean` | `true` | Automatically set geometry bounding box after BVH construction. |
| **indirect** | `boolean` | `false` | If false, creates and rearranges index buffer for better performance. |

### Split Strategies

- **SAH (Surface Area Heuristic)** - Slowest to build, fastest at runtime, uses least memory. Best for production.
- **AVERAGE** - Balanced build time and runtime performance.
- **CENTER** - Fastest to build, slower at runtime.

## Advanced Usage

### Fine-tuning Performance

Adjust BVH construction parameters for your use case:

```ts
useBVH(
  target,
  {
    splitStrategy: 'SAH', // Best runtime performance
    maxDepth: 30, // Shallower tree (faster build)
    maxLeafSize: 5, // Smaller leaves (better culling)
    verbose: true, // Debug construction
  }
)
```

### First Hit Only Mode

When you only need the closest intersection (e.g., mouse picking):

```ts
useBVH(
  target,
  {
    firstHitOnly: true, // Uses raycastFirst internally
  }
)
```

This is significantly faster than computing all intersections when you only need one.

## Important Notes

- **Side-effect free**: BVH is automatically removed on unmount and when disabled.
- **Reactive options**: Only `enabled` and `debug` are reactive. Construction options (`splitStrategy`, `maxDepth`, etc.) are static - to apply new values, toggle `enabled` off/on.
- **Memory efficient**: BVH structures are properly disposed when removed.
- **Automatic mesh detection**: Works with `Mesh` and `SkinnedMesh` instances.
- **Draco models**: Works seamlessly with Draco-compressed GLTF models.

## Performance Tips

1. **Use firstHitOnly** when you only need the closest intersection
2. **SAH strategy** gives best runtime performance for production
3. **Adjust maxLeafSize** based on triangle density (smaller for dense meshes)
4. **Enable debug mode** during development to verify BVH coverage

## Integration with useGLTF

Perfect pairing with `useGLTF` for optimized model loading:

```vue
<script setup lang="ts">
import { useBVH, useGLTF } from '@tresjs/cientos'

const { state: model } = useGLTF('/models/high-poly-model.glb', {
  draco: true
})

useBVH(
  () => model.value?.scene,
  { splitStrategy: 'SAH' }
)
</script>
```

## Troubleshooting

### BVH not applying to some meshes

- Ensure meshes have valid geometry with position attributes
- Check console with `verbose: true` to see which meshes are skipped
- Verify the object is an `Object3D` (use `primitive` in templates)

### Performance not improving

- Enable `firstHitOnly` if you only need one intersection
- Try different split strategies (`SAH` is usually best)
- Verify raycasting is the bottleneck (use Stats/StatsGl)
- Consider LOD for very distant objects
