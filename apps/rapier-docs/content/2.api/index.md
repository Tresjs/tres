---
title: Physics
description: The main component for render.
---

The `<Physics />` component is the main component, provider and source of all physics calculations.

::prose-note
 This component is required to use on this library, all other components on this library depend on it
::

::SceneWrapper
  ::DemosPhysic
  ::
::

::prose-warning
 Note that in order to work the `<Physics />` needs to be wrapped in a
[`<Suspense >`](https://vuejs.org/guide/built-ins/suspense.html#suspense) component
::

```vue{4,10-14}
<script setup lang="ts" >
import { TresCanvas } from '@tresjs/core'
import { Physics } from '@tresjs/rapier'
</script>
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <Suspense>
      <Physics>
        // your scene with physics goes here
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

:::field-group
  ::::field{name="gravity" type="TresVector3 | THREE.Vector3"}
  Default: `[0, -9.8, 0]` - Sets the gravity of the world.
  ::::

  ::::field{name="debug" type="boolean"}
  Default: `false` - Enables debug mode.
  ::::

  ::::field{name="pause" type="boolean"}
  Default: `false` - Pauses the physics simulation when `true`.
  ::::

  ::::field{name="timeStep" type="number | 'vary'"}
  Default: `1/60` - Fixed simulation timestep in seconds. Uses an accumulator so physics speed stays consistent across refresh rates. Pass `'vary'` to step once per frame using the render delta instead.
  ::::

  ::::field{name="timeScale" type="number"}
  Default: `1` - Scales simulation speed relative to real time (`2` is double speed, `0.5` is half). Values `<= 0` skip stepping; prefer pausing the world to freeze it.
  ::::
:::

## Expose properties

:::field-group
  ::::field{name="init" type="() => Promise<void>"}
  Initializes the Rapier module and creates the physics world with gravity.
  ::::

  ::::field{name="isDebug" type="Ref<boolean>"}
  Reactive flag for debug mode state.
  ::::

  ::::field{name="isPaused" type="Ref<boolean>"}
  Reactive flag to pause the physics simulation.
  ::::

  ::::field{name="timeStep" type="Ref<number | 'vary'>"}
  Reactive simulation timestep. Synced from the `timeStep` prop; mutate at runtime via `useRapier`.
  ::::

  ::::field{name="timeScale" type="Ref<number>"}
  Reactive simulation speed scale.
  ::::

  ::::field{name="rapier" type="ShallowRef<RAPIER>"}
  Shallow ref with the loaded Rapier module.
  ::::

  ::::field{name="setWorld" type="(world: World) => void"}
  Replaces the current Rapier world.
  ::::

  ::::field{name="world" type="ShallowRef<World>"}
  Shallow ref with the current Rapier world.
  ::::
:::
