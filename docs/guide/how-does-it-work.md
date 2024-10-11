# How does it work?

To give you a better understanding of what is happening and how all this is possible, you can think in two worlds, our normal `Tres` scene (our 3D world) and the physics world (the Rapier world).

Let's try to make a simple ball falling down

First we create a sphere and a floor, the idea is that sphere will fall into the floor
```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />

    <TresMesh :position="[0, 8, 0]">
      <TresSphereGeometry :args="[1, 16]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[20, 20, 20]" />
      <TresMeshBasicMaterial color="#f4f4f4" />
    </TresMesh>
  </TresCanvas>
</template>
```

![](/img/initial-scene.jpg)

To enable `Rapier` and create our 3D world we use the `<Physics >` component, our scene with physics will live inside, Note it needs to be wrapped in a `<Suspense />` component

```vue{3,10,11,21,22}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Physics } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />

    <Suspense>
      <Physics>
        <TresMesh :position="[0, 8, 0]">
          <TresSphereGeometry :args="[1,16]" />
          <TresMeshNormalMaterial />
        </TresMesh>

        <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
          <TresPlaneGeometry :args="[20, 20, 20]" />
          <TresMeshBasicMaterial color="#f4f4f4" />
        </TresMesh>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

In order to add forces (like gravity) to our sphere , we create a [RigidBody](https://rapier.rs/docs/user_guides/javascript/rigid_bodies#creation-and-insertion), each `RigidBody` contain one or many [Colliders](https://rapier.rs/docs/user_guides/javascript/colliders), internally all the math calculation happens in these objects.

Our RigidBody is `Dynamic` type by default, and this is what we want for our sphere.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />

    <Suspense>
      <Physics>
        <RigidBody>
          <TresMesh :position="[0, 8, 0]">
            <TresSphereGeometry :args="[1, 16]" />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
          <TresPlaneGeometry :args="[20, 20, 20]" />
          <TresMeshBasicMaterial color="#f4f4f4" />
        </TresMesh>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```
Let's repeat the same process to our floor, the process is the same except that we use a type `Fixed` in the RigidBody.

```vue
<template>
  <RigidBody type="fixed">
    <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[20, 20, 20]" />
      <TresMeshBasicMaterial color="#f4f4f4" />
    </TresMesh>
  </RigidBody>
</template>
```

Then we need to make the bound between, the two worlds so when our RigidBody gets update, our 3D Sphere will replicate it.

Fortunately `@tresjs/rapier` abstract most of the logic for you with a nice syntax, so you don't have to worry at all
about making bounds or difficult configuration, even the colliders are automatic.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />

    <Suspense>
      <Physics>
        <RigidBody>
          <TresMesh :position="[0, 8, 0]">
            <TresSphereGeometry :args="[1, 16]" />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
            <TresPlaneGeometry :args="[20, 20, 20]" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

<DocsDemo>
  <IntroDemo />
</DocsDemo>

These physics are working, but the sphere is not behavior like an sphere, is not rolling, why is that?

You can inspect your physic scene using the `debug` prop in the `<Physics>` component you should see something like this:

![](/img/cuboid.jpg)

You'll quickly realize that our 3D sphere is round by a cube not a sphere, let's introduce the Colliders.

Colliders are physic object with shape, properties and methods, they are child of the RigidBody component, a RigidBody can have one or many colliders. But we haven't create any, why that collider appears there?

Well `@tresjs/rapier` will create an automatic collider for you, for each Mesh that you add! This normally is really good DX, but in cases like this need to tell our collider to have a sphere or `ball` shape.

```vue
<template>
  <RigidBody collider="ball">
    <TresMesh :position="[0, 8, 0]">
      <TresSphereGeometry :args="[1, 16]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </RigidBody>
</template>
```

Now our sphere act like one!

## Caveats

- In order to save resources rapier set object to sleep. when they are not moving or are too slow
- HMR sometimes work unexpected prefer reload page (unless reactive property is set)
- Modifying the position/rotation property in a `RigidBody instance` in realtime make teleport or "jump" making weird behaviors, and is discourage.
