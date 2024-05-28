---
title: Shared State
description: How to use a reactive composable to share your objects across component files.
author: /
thumbnail: /recipes/animations.png
difficulty: 0
---

# Shared State in TresJS

This guide will help you get started with shared state in TresJS by building a simple scene with a cube that can be shared across component files.

<SandboxDemo url="https://stackblitz.com/~/edit/tresjs-minimal-reproduction-qsdhpt?file=src/components/SubComponent.vue" />

## Creating a State Composable

First, we'll create a composable to store the objects.

```ts
//composables/state.ts
import { reactive, toRefs } from "vue";

const state = reactive({
    mesh: null,
    //you can add more objects here
})

export function useState() {
    return {
        ...toRefs(state)
    }
}
```

## Setting the object to the state

Next, we'll assign an object to the state and include it in a subcomponent where we can access and use it.

```vue
//Parent component
<script setup lang="ts">
import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three';

import SubComponent from './SubComponent.vue';
import { useState } from '../composables/state';

const { mesh } = useState();

//assinging the object to the state
mesh.value = new Mesh(new BoxGeometry(), new MeshNormalMaterial());
</script>

<template>
  <TresPerspectiveCamera />

  <SubComponent />
</template>
```

## Using the object in other components

With the mesh assigned to the reactive state, it's available throughout your project.

```vue
//Subcomponent.vue
<script setup lang="ts">
import { useState } from '../composables/state';
const { mesh, ground } = useState();

console.log('ground:', ground);
</script>

<template>
  <primitive v-if="mesh" :object="mesh" />
</template>
```

## Using TresMesh components

You can also add TresMesh components to the reactive state. Here, we'll use a reference and assign it to the state when mounted.

```vue
//Parent component
<script setup lang="ts">
import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three';

import SubComponent from './SubComponent.vue';
import { useState } from '../composables/state';

const { mesh } = useState();

//reference the object
const exampleRef = ref(null);

//assinging the object to the state when mounted
onMounted(() => {
  mesh.value = exampleRef.value;
});
</script>

<template>
  <TresPerspectiveCamera />

  <TresMesh ref="exampleRef" :position="[0, 0, 0]" cast-shadow>
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
  </TresMesh>

  <SubComponent />
</template>
```

With these steps, you can easily manage and share objects across different components in your Vue 3 project using a reactive composable.
