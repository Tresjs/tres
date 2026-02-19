---
title: Rigid body
description: The real-time simulation of rigid-bodies subjected to forces and contacts is the main feature of a physics engine for video-games, robotics, or animation.
---

The real-time simulation of rigid-bodies subjected to forces and contacts is the
main feature of a physics engine for video-games, robotics, or animation.

`@tresjs/rapier` provides a `RigidBody` component compatible with the `Tresjs`
ecosystem, with the advantage of making the "bound" between the two worlds
(physic world and our 3D scene).

::prose-note
The information on this page is a summary of the **RigidBody** instance, please check the [original Rapier documentation](https://rapier.rs/docs/user_guides/javascript/rigid_bodies)
::

::SceneWrapper
  ::DemosRigidBody
  ::
::



## Basic usage

To use a `RigidBody` component, import it from
`@tresjs/rapier` and then pass the element you want to attach via
[slot](https://vuejs.org/guide/components/slots.html#scoped-slots).

```vue
<template>
  <RigidBody>
    <TresMesh :position="[0, 8, 0]">
      <TresTorusGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </RigidBody>
</template>
```

## Types

We can specify which kind of `RigidBody` type we want. By default is set to `Dynamic`(see below).

A basic floor example with type fixed:

```vue
<template>
  <RigidBody type="fixed">
    <TresMesh :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
      <TresMeshBasicMaterial color="#f4f4f4" />
    </TresMesh>
  </RigidBody>
</template>
```

### Available types

| types                     | Description                                                                                                  |
| :----------------------- | :----------------------------------------------------------------------------------------------------------- |
| `Dynamic`                | Indicates that the body is affected by external forces and contacts.                                         |
| `Fixed`                  | Indicates the body cannot move. It acts as if it has an infinite mass and will not be affected by any force. |
| `KinematicPositionBased` | Indicates that the body position must not be altered by the physics engine.                                  |
| `KinematicVelocityBased` | Indicates that the body velocity must not be altered by the physics engine.                                  |

:::info

Both position-based and velocity-based kinematic bodies are mostly the
same. Choosing between both is mostly a matter of preference between
position-based control and velocity-based control.
More info at [Rigid-body type](https://rapier.rs/docs/user_guides/javascript/rigid_bodies#rigid-body-type)

:::



## Props

| Prop                     | Description                                                                                                   | Default                        |
| :----------------------- | :------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| **type**                 | `rigidBody` type                                                                                              | `dynamic`                      |
| **collider**             | automatic collider                                                                                            | `cuboid`                       |
| **gravityScale**         | gravity for the `rigidBody`                                                                                   | `1`                            |
| **additionalMass**       | add extra mass to the `rigidBody`                                                                             | `0`                            |
| **linearDamping**        | set the linear damping                                                                                        | `0`                            |
| **angularDamping**       | set the angular damping                                                                                       | `0`                            |
| **dominanceGroup**       | set the dominance group                                                                                       | `0`                            |
| **linvel**               | linear velocity                                                                                               | `x: 0, y: 0, z: 0`             |
| **angvel**               | angular velocity                                                                                              | `x: 0, y: 0, z: 0`             |
| **enabledRotations**     | enable rotations in specific axis                                                                             | `{x: true, y: true, z: true }` |
| **enabledTranslations**  | enable translations in specific axis                                                                          | `{x: true, y: true, z: true }` |
| **lockTranslations**     | Lock all translations                                                                                         | `false`                        |
| **lockRotations**        | Lock all rotations                                                                                            | `false`                        |
| **enableCcd**            | Enable continuous collision detection                                                                         | `false`                        |
| **friction**             | The friction coefficient of this collider. (automatic-collider)                                               | `0.5`                          |
| **mass**                 | Mass of the collider. (automatic-collider)                                                                    | `1`                            |
| **density**              | Restitution controls how elastic (aka. bouncy) a contact is. (automatic-collider)                             | `0`                            |
| **restitution**          | The collider density. If non-zero the collider's mass and angular inertia will be added. (automatic-collider) | `1`                            |
| **activeCollision**      | To set the collider receiver/emitter collision events (automatic-collider)                                    | `false`                        |
| **activeCollisionTypes** | Type of the collision event. (automatic-collider)                                                             | `ActiveCollisionTypes.DEFAULT` |
| **collisionGroups**      | To specify collision groups. (automatic-collider)                                                             | `undefined`                    |

:::info

The `rigidBody` instance has many other functions, please check the
[official docs](https://rapier.rs/docs/api/javascript/JavaScript3D/) for a
complete list, if you need them, you can
use[Template ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs).

:::

## Expose object

```
{
  instance: rigidBodyInstance,
  rigidBodyDesc,
  context: colliderInfos,
  group: parentObject,
}
```