# RigidBody

:::info
The information in this page is a summary of the RigidBody instance, please check the [complete documentation](https://rapier.rs/docs/user_guides/javascript/rigid_bodies) for more info
:::

The real-time simulation of rigid-bodies subjected to forces and contacts is the main feature of a physics engine for video-games, robotics, or animation.

`@tresjs/rapier` provides a `RigidBody` component compatible with the `Tresjs` ecosystem, with the advantage of making the "bound" between the two worlds (physic world and our 3D scene).

## Basic usage

To use a `RigidBody` component, the best case is to import it from `@tresjs/rapier` and then pass as [slot](https://vuejs.org/guide/components/slots.html#scoped-slots) the element that you want to attach.

```html
<RigidBody>
  <TresMesh :position="[0, 8, 0]">
    <TresTorusGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
</RigidBody>
```

## Types

We can specify what kind of `RigidBody` [type](https://rapier.rs/docs/user_guides/javascript/rigid_bodies#rigid-body-type). `Dynamic` is the default.

A basic floor example with type fixed:
```html
<RigidBody type="fixed">
  <TresMesh :position="[0, 0, 0]">
    <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
    <TresMeshBasicMaterial color="#f4f4f4" />
  </TresMesh>
</RigidBody>
```

## Inner Colliders

In addition to the [Colliders components](/components/collider), you can specify a set of pre-defined colliders in order to fit the mesh with the best shape possible.

A basic example, a ball falling down:
```html
<RigidBody collider="ball">
  <TresMesh :position="[0,7, 0]">
    <TresSphereGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
</RigidBody>
```

## InstanceMesh

You can use `RigidBody` with `TresInstancedMesh` too.

A basic example, with TresInstancedMesh:
```html
<RigidBody instanced collider="hull">
  <TresInstancedMesh ref="torusInstancedMesh" :args="[torusKnots, torusKnotsMaterial, 3]" />
</RigidBody>
```

## Applying forces

SOON

## Collisions

SOON

## Events

SOON
