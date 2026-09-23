# Rapier

The physics layer for Tres scenes, built on the Rapier WASM engine. It gives Three.js objects simulated bodies and writes their transforms back every frame.

## Language

### World

**Physics**:
The single provider component that boots the Rapier world, owns gravity, stepping, pause and debug, and simulates everything in its slot.
_Avoid_: physics world wrapper, physics layer, provider

**Rapier context**:
The injected bundle any component inside `Physics` reads through `useRapier`: the world, pause and debug flags, timestep controls and the step hook.
_Avoid_: physics store, state, injection

**World**:
The one Rapier `World` instance holding bodies, colliders and joints; owned by the context and swappable.
_Avoid_: scene (reserved by Core), simulation

**Step**:
One advance of the world by a fixed timestep. A rendered frame may run zero or many steps through the accumulator.
_Avoid_: tick, update, frame

**Variable stepping**:
The mode selected with `timeStep="vary"` where each frame runs one step of the frame's own delta instead of fixed substeps.
_Avoid_: dynamic timestep, delta mode

**Before-step hook**:
The `onBeforeStep` registration for callbacks that must run once per step in lockstep with the solver, as the physics-safe alternative to the render loop.
_Avoid_: physics tick, pre-step, onBeforeRender (reserved by Core)

**Debug**:
The wireframe rendering of the world's debug buffers, switched on with the `debug` prop.
_Avoid_: debug renderer, wireframe mode, gizmos

### Bodies

**RigidBody**:
A group wrapper whose children become one simulated body of type `dynamic`, `kinematic`, `kinematicVelocity` or `fixed`.
_Avoid_: body wrapper, physics object, entity

**Body context**:
The per-body state a `RigidBody` provides to its collider children: descriptor, live body, group and colliders.
_Avoid_: rigid body state, body state

**InstancedRigidBody**:
The `RigidBody` variant that wraps one instanced mesh and creates one body per instance matrix.
_Avoid_: instance rigid body, batched bodies

**Joint**:
A constraint connecting exactly two rigid bodies, configured by a type and a positional params array.
_Avoid_: constraint, link, connection

### Colliders

**Collider**:
A shape attached to the parent body. `Collider` is the shape-agnostic component; every named `*Collider` is a preset of it.
_Avoid_: hitbox, shape component, collision mesh

**Automatic collider**:
A collider derived from a child mesh's geometry when a `RigidBody` mounts, chosen by the `collider` prop and disabled with `collider="false"`.
_Avoid_: auto collider, pre-defined collider, inferred shape

**Sensor**:
A collider that detects overlap without producing contacts and emits intersection events instead of collision events.
_Avoid_: trigger, trigger volume, zone

**Collision groups**:
The bitmask props that filter which collider pairs may generate contacts or forces: `collisionGroups`, `solverGroups` and `dominanceGroup`.
_Avoid_: layers, masks, filters

### Events

**Collision event**:
The `collision-enter` and `collision-exit` emits fired on both the body group and the collider object when two colliders start or stop touching, opted in with `activeCollision`.
_Avoid_: contact event, hit, overlap (reserved for sensors)

**Intersection event**:
The `intersection-enter` and `intersection-exit` emits a sensor fires on overlap.
_Avoid_: trigger event, sensor collision

**Contact force event**:
The per-step `contact-force` emit carrying solver forces between two colliders once they pass a threshold, opted in with `activeContactForce`.
_Avoid_: impact event, force callback
