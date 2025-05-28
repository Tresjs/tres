# `attach` 🖇

Using the `attach` prop, you can tell Tres exactly where you want to insert a child into its parent.

:::info

The `attach` prop is not required for many common cases. For instance:

* adding a single `<Material>` to a `<Mesh>`
* adding a `<Geometry>` to a `<Mesh>`
* adding one or more `<Mesh>`s to a parent `<Mesh>`

:::

## Background

Tres tries to automatically determine where to insert a child tag into its parent. For example, in this code, Tres will:

* automatically insert the geometry into `parent.geometry`
* automatically insert the material into `parent.material`

```vue
<template>
  <TresMesh name="parent">
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
</template>
```

## Problem

Tres covers common cases, like above. But it doesn't cover every possible case.

When Tres doesn't automatically choose the proper insertion location for a child, one solution is to fall back to procedural code in `<script>`.

Here's how you might add multiple materials to a mesh using `<script>`:

```vue
<script setup lang="ts">
import { MeshBasicMaterial } from 'three'
import { onMounted, shallowRef } from 'vue'

const meshRef = shallowRef()
onMounted(() => {
  meshRef.value.material = [
    new MeshBasicMaterial({ color: 'red' }),
    new MeshBasicMaterial({ color: 'orange' }),
    new MeshBasicMaterial({ color: 'yellow' }),
    new MeshBasicMaterial({ color: 'green' }),
    new MeshBasicMaterial({ color: 'blue' }),
    new MeshBasicMaterial({ color: 'purple' }),
  ]
})
</script>

<template>
  <TresMesh ref="meshRef">
    <TresBoxGeometry />
  </TresMesh>
</template>
```

But this workaround means:

* your materials aren't managed by Tres
* your code is imperative, not declarative
* your code is non-reactive by default

## Solution

The `attach` prop lets you specify where an object will be added to the parent object using declarative code.

## Usage

Here's the example above, rewritten declaratively using `attach`:

```vue
<template>
  <TresMesh>
    <TresBoxGeometry />
    <TresMeshBasicMaterial color="red" attach="material-0" />
    <TresMeshBasicMaterial color="orange" attach="material-1" />
    <TresMeshBasicMaterial color="yellow" attach="material-2" />
    <TresMeshBasicMaterial color="green" attach="material-3" />
    <TresMeshBasicMaterial color="blue" attach="material-4" />
    <TresMeshBasicMaterial color="purple" attach="material-5" />
  </TresMesh>
</template>
```

## "Pierced" `attach`

You can deeply attach a child to a parent by "piercing" – i.e., using a kebab-case string.

### Pseudocode

First, here are a few simple pseudocode examples. This will attach `bar` at `foo.ab.cd`:

```vue
<foo>
  <bar attach="ab-cd" />
</foo>
```

This will attach `bar` at `foo.ab.cd.ef`:

```vue
<foo>
  <bar attach="ab-cd-ef" />
</foo>
```

### Usage

As a concrete example, you can use "pierced" `attach` to add custom `BufferAttribute`s:

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const positions = new Float32Array([-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0])
</script>

<template>
  <TresCanvas clear-color="gray">
    <TresMesh :scale="0.3333">
      <TresBufferGeometry>
        <TresBufferAttribute
          attach="attributes-position"
          :count="positions.length / 3"
          :array="positions"
          :itemSize="3"
        />
      </TresBufferGeometry>
      <TresMeshBasicMaterial color="red" />
    </TresMesh>
  </TresCanvas>
</template>
```

## Arrays

You can attach within arrays by using array indices in the `attach` string.

### Usage

For example, you can use array indices to attach `THREE` post-processing passes to the `THREE.EffectComposer.passes` array:

```vue
<script lang="ts" setup>
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { UnrealBloomPass } from 'three-stdlib'
import { extend, useLoop, useTres } from '@tresjs/core'
import { shallowRef } from 'vue'

extend({ EffectComposer, OutputPass, UnrealBloomPass, RenderPass })
const { renderer, scene, camera, sizes } = useTres()
const composer = shallowRef<EffectComposer>()

useLoop().render(() => {
  if (composer.value) {
    composer.value!.render()
  }
})
</script>

<template>
  <TresEffectComposer
    ref="composer"
    :args="[renderer.instance]"
    :set-size="[sizes.width.value, sizes.height.value]"
  >
    <TresRenderPass
      :args="[scene, camera]"
      attach="passes-0"
    />
    <TresUnrealBloomPass
      :args="[undefined, 0.5, 0.1, 0]"
      attach="passes-1"
    />
    <TresOutputPass
      attach="passes-2"
      :set-size="[sizes.width.value, sizes.height.value]"
    />
  </TresEffectComposer>
</template>
```
