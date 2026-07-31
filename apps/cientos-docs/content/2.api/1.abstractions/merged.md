---
title: Merged
description: One instanced batch per mesh, shared across your whole component tree.
---

::SceneControlsWrapper
  ::AbstractionsMerged
  ::
::

`<Merged />` takes a `{ name: mesh }` map and builds one instanced batch per entry. Any descendant,
at any depth and in any component, joins a batch by name with `<Instance name="..." />`.

That is what makes repeating a whole model cheap: a robot made of two meshes drawn 49 times is
**two** drawcalls, not 98.

## Usage

The model becomes its own component, and knows nothing about the batches beyond their names:

```vue [Robot.vue]
<script setup lang="ts">
import { Instance } from '@tresjs/cientos'
</script>

<template>
  <TresGroup>
    <Instance name="Body" :position="[0, 0.6, 0]" />
    <Instance name="Body" :position="[0, 1.6, 0]" :scale="0.6" />
    <Instance name="Eye" :position="[-0.18, 1.7, 0.32]" />
    <Instance name="Eye" :position="[0.18, 1.7, 0.32]" />
  </TresGroup>
</template>
```

The provider hands over the meshes and renders as many copies as it likes:

```vue{12-18}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Merged, useGLTF } from '@tresjs/cientos'
import Robot from './Robot.vue'

const { nodes } = useGLTF('/robot.glb')
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[12, 9, 12]" />
    <Merged :meshes="{ Body: nodes.Body, Eye: nodes.Eye }">
      <Robot :position="[-2, 0, 0]" />
      <Robot :position="[0, 0, 0]" />
      <Robot :position="[2, 0, 0]" />
    </Merged>
  </TresCanvas>
</template>
```

::prose-note
Nothing needs to be threaded through props or slots: the batches are provided, so an `<Instance />`
finds the one it names no matter how deep it sits or how many components stand between them.
::

## Instancing a whole glTF

`useGLTF` gives you `nodes`, so instancing every repeated mesh of a model is a matter of picking the
ones worth batching:

```vue
<Merged :meshes="{ Screw: nodes.Screw, Bolt: nodes.Bolt }">
  <Machine v-for="i in 20" :key="i" :position="layout[i]" />
</Merged>
```

The payoff is across models, not within one: twenty machines sharing two batches is two drawcalls.

## Opting a node out

An `<Instance />` is all-or-nothing per node: it uses the batch's geometry and material. When one
node needs its own material, a different geometry, or its own shader, render a normal `<TresMesh />`
instead of an `<Instance />`. You trade one drawcall for full control over that node, and every
other node stays batched.

## Props

| Prop     | Description                                                          | Default    |
| :------- | :-------------------------------------------------------------------- | ---------- |
| `meshes` | One batch per entry, keyed by the name `<Instance name="..." />` uses. | *required* |
| `limit`  | Initial buffer allocation per batch. One batch per entry in `meshes`, so it defaults lower than `<Instances />`. | `100`     |

Exposes the named batch registry through `instances`.

::read-more{to="/api/abstractions/instances"}
Per-instance colors, pointer events, visibility and the `limit` growth behaviour are documented on `<Instances />`.
::
