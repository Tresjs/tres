---
title: Rigid body
description: The real-time simulation of rigid-bodies subjected to forces and contacts is the main feature of a physics engine for video-games, robotics, or animation.
---

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

:::field-group
  ::::field{name="type" type="RigidBodyType"}
  Default: `dynamic` - `rigidBody` type.
  ::::

  ::::field{name="collider" type="ColliderShape | false"}
  Default: `cuboid` - automatic collider.
  ::::

  ::::field{name="gravityScale" type="number"}
  Default: `1` - gravity for the `rigidBody`.
  ::::

  ::::field{name="additionalMass" type="number"}
  Default: `0` - add extra mass to the `rigidBody`.
  ::::

  ::::field{name="linearDamping" type="number"}
  Default: `0` - set the linear damping.
  ::::

  ::::field{name="angularDamping" type="number"}
  Default: `0` - set the angular damping.
  ::::

  ::::field{name="dominanceGroup" type="number"}
  Default: `0` - set the dominance group.
  ::::

  ::::field{name="linvel" type="TresVector3 | THREE.Vector3"}
  Default: `x: 0, y: 0, z: 0` - linear velocity.
  ::::

  ::::field{name="angvel" type="TresVector3 | THREE.Vector3"}
  Default: `x: 0, y: 0, z: 0` - angular velocity.
  ::::

  ::::field{name="enabledRotations" type="[x: boolean, y: boolean, z: boolean]"}
  Default: `{x: true, y: true, z: true }` - enable rotations in specific axis.
  ::::

  ::::field{name="enabledTranslations" type="[x: boolean, y: boolean, z: boolean]"}
  Default: `{x: true, y: true, z: true }` - enable translations in specific axis.
  ::::

  ::::field{name="lockTranslations" type="boolean"}
  Default: `false` - Lock all translations.
  ::::

  ::::field{name="lockRotations" type="boolean"}
  Default: `false` - Lock all rotations.
  ::::

  ::::field{name="enableCcd" type="boolean"}
  Default: `false` - Enable continuous collision detection.
  ::::

  ::::field{name="friction" type="number"}
  Default: `0.5` - The friction coefficient of this collider. (automatic-collider).
  ::::

  ::::field{name="mass" type="number"}
  Default: `1` - Mass of the collider. (automatic-collider).
  ::::

  ::::field{name="density" type="number"}
  Default: `0` - Restitution controls how elastic (aka. bouncy) a contact is. (automatic-collider).
  ::::

  ::::field{name="restitution" type="number"}
  Default: `1` - The collider density. If non-zero the collider's mass and angular inertia will be added. (automatic-collider).
  ::::

  ::::field{name="activeCollision" type="boolean"}
  Default: `false` - To set the collider receiver/emitter collision events (automatic-collider).
  ::::

  ::::field{name="activeCollisionTypes" type="ActiveCollisionTypes"}
  Default: `ActiveCollisionTypes.DEFAULT` - Type of the collision event. (automatic-collider).
  ::::

  ::::field{name="collisionGroups" type="number | undefined"}
  Default: `undefined` - To specify collision groups. (automatic-collider).
  ::::
:::

:::info

The `rigidBody` instance has many other functions, please check the
[official docs](https://rapier.rs/docs/api/javascript/JavaScript3D/) for a
complete list, if you need them, you can
use[Template ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs).

:::

## Events

:::field-group
  ::::field{name="collision-enter" type="(payload: { source: SourceTarget, target: SourceTarget }) => void"}
  Triggered when a collider starts colliding with another collider. Requires `activeCollision` prop to be set. See [Collisions](/api/rigid-body/collisions).
  ::::

  ::::field{name="collision-exit" type="(payload: { source: SourceTarget, target: SourceTarget }) => void"}
  Triggered when a collider stops colliding with another collider. Requires `activeCollision` prop to be set. See [Collisions](/api/rigid-body/collisions).
  ::::

  ::::field{name="intersection-enter" type="(payload: { source: SourceTarget, target: SourceTarget }) => void"}
  Triggered when a sensor collider starts intersecting another collider. Requires `activeCollision` and `sensor` props. See [Sensor](/api/rigid-body/sensor).
  ::::

  ::::field{name="intersection-exit" type="(payload: { source: SourceTarget, target: SourceTarget }) => void"}
  Triggered when a sensor collider stops intersecting another collider. Requires `activeCollision` and `sensor` props. See [Sensor](/api/rigid-body/sensor).
  ::::
:::

## Expose object

:::field-group
  ::::field{name="instance" type="RigidBody"}
  The `RigidBody` instance created by Rapier. [See API](https://rapier.rs/javascript3d/classes/RigidBody.html)
  ::::

  ::::field{name="rigidBodyDesc" type="RigidBodyDesc"}
  The Rapier rigid-body descriptor used to initialize the body. [See API](https://rapier.rs/javascript3d/classes/RigidBodyDesc.html)
  ::::

  ::::field{name="context" type="RigidBodyContext"}
  Collider context information (`colliderInfos`) associated with this rigid body.
  ::::

  ::::field{name="group" type="TresObject3D"}
  Parent Three.js object/group (`parentObject`) that contains the bound scene node. [See API](https://threejs.org/docs/#api/en/core/Object3D)
  ::::
:::
