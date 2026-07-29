---
title: Instances
description: Draw thousands of copies of one mesh in a single drawcall, declaratively.
---

::SceneControlsWrapper
  ::AbstractionsInstances
  ::
::

Rendering the same mesh many times is one drawcall per copy, and drawcalls are what a scene runs
out of first. `<Instances />` owns a single `THREE.InstancedMesh` and `<Instance />` is a
placeholder that registers itself with it, so a `v-for` of a thousand nodes costs **one** drawcall.

An `<Instance />` behaves like any other node in the graph: give it `position`, nest it under a
group, animate that group, toggle it with `v-if`, listen for `@click` on one of them.

## Usage

```vue{3,14,16-21}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Instance, Instances } from '@tresjs/cientos'
import { BoxGeometry, MeshStandardMaterial } from 'three'

const geometry = new BoxGeometry(0.35, 0.35, 0.35)
const material = new MeshStandardMaterial()

const cubes = Array.from({ length: 900 }, (_, i) => [i % 30 - 15, 0, Math.floor(i / 30) - 15])
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[14, 10, 14]" />
    <Instances :geometry="geometry" :material="material">
      <Instance
        v-for="(position, i) in cubes"
        :key="i"
        :position="position"
        color="#38bdf8"
      />
    </Instances>
  </TresCanvas>
</template>
```

::prose-note
The `geometry` and `material` are yours: `<Instances />` never disposes them.
::

## Per-instance color

`<Instance />` takes a `color` prop, written into the batch's `instanceColor` buffer. The buffer is
only allocated once at least one instance asks for a color, so an uncolored batch pays nothing.

```vue
<Instance :position="[0, 0, 0]" :color="isSelected ? '#f97316' : '#38bdf8'" />
```

## Pointer events

Each placeholder raycasts against the batch's geometry at its own transform, so pointer events land
on the single instance you clicked, not on the whole batch.

```vue
<Instance :position="position" @click="select(id)" @pointer-enter="hover(id)" />
```

## Hiding instances

Two ways, and they differ in what they cost:

- `:visible="false"` keeps the instance registered but drops it from the batch for that frame.
  Use it for something that toggles often.
- `v-if` unmounts the placeholder and unregisters it. Use it when the node is really gone.

Either way the remaining instances are packed densely, so hidden ones cost nothing on the GPU.

## Nesting and transforms

Instances read their world matrix, so parent transforms work exactly as you would expect:

```vue
<Instances :geometry="geometry" :material="material">
  <Levioso>
    <TresGroup :position="[0, 3, 0]">
      <!-- floats with the group, still the same drawcall -->
      <Instance v-for="i in 12" :key="i" :position="ringPosition(i)" />
    </TresGroup>
  </Levioso>
</Instances>
```

## Limit and growth

`limit` is the initial buffer allocation, not a cap. If more instances register than it allows, the
batch reallocates its buffers (doubling), keeps every instance, and warns once in dev telling you
which `limit` would have avoided the reallocation.

```vue
<Instances :geometry="geometry" :material="material" :limit="5000">
```

Set it close to your real maximum when you know it: reallocating mid-scene is avoidable work.

## Why every instance shows up in the scene graph

Open the devtools on a batch of 500 and you will see 500 nodes. That is expected, not a leak.

Each `<Instance />` is a real `Object3D` in the graph. That is precisely what buys you the ergonomics:
`position` is just a transform, nesting under a group works because the group is its parent, `v-if`
works because unmounting a node unregisters it, and `@click` works because there is a node to hit.
The batch reads each node's world matrix every frame and packs it into the instance buffer.

What those nodes do **not** do is render. They carry no geometry and never enter the render list, so
500 of them still cost one drawcall. What you are seeing in the graph is bookkeeping, not draw work.

The costs that are real:

| | Cost |
| :-- | :-- |
| Per frame | One world-matrix update and one matrix multiply per instance. |
| On pointer move | A raycast per instance, but only for instances that have a pointer handler (or inherit one from an ancestor). A scatter with no handlers costs nothing. |
| Memory | One bare `Object3D` per instance. |

::prose-note
If you have tens of thousands of instances that never move, never toggle and never need picking, a
`TresInstancedMesh` whose `instanceMatrix` you fill yourself will always be cheaper. `<Instances />`
trades that per-node overhead for being able to write instances as ordinary Vue nodes.
::

## Props

### Instances

| Prop       | Description                                                                | Default    |
| :--------- | :------------------------------------------------------------------------- | ---------- |
| `geometry` | Geometry shared by every instance. Not disposed by the component.           | *required* |
| `material` | Material shared by every instance. Not disposed by the component.           | *required* |
| `limit`    | Initial buffer allocation. Grows automatically when exceeded.               | `1000`     |
| `name`     | Key this batch registers under with an ancestor `<Merged />`.               | `undefined` |

Exposes the underlying `THREE.InstancedMesh` through `instance`.

### Instance

| Prop      | Description                                                                     | Default     |
| :-------- | :------------------------------------------------------------------------------ | ----------- |
| `name`    | Batch to join, by its key in `<Merged :meshes />`. Omit for the nearest `<Instances />`. | `undefined` |
| `color`   | Per-instance color, written into `instanceColor`.                                | `undefined` |
| `visible` | `false` drops the instance from the batch without unregistering it.               | `true`      |

Transform props (`position`, `rotation`, `scale`, …) and pointer events behave like any other node.

::read-more{to="/api/abstractions/merged"}
Instancing several meshes at once, for example every node of a glTF model, is what `<Merged />` is for.
::
