# Custom Colliders

## Collisions

Similar to [how collisions work in rigid-bodies](./rigid-body.md#collisions) you can set a custom collider to receive collisions events.

Be aware that the event will be emitted by the `RigidBody` parent

```vue { 2,3}
<RigidBody
  @collision-enter="onCollisionEnter"
  @collision-exit="onCollisionExit"
>
  <BallCollider activeCollision />
</RigidBody>
```

## Props

| Prop                     | Description                  | Default |
| :----------------------- | :--------------------------- | :------- |
| **shape**                | shape of the collider | `cuboid` |
| **args**                 | The half-sizes of the collider shapes | `[1,1,1]` |
| **object**               | Required for certain shapes like `trimesh`, `hull`, `heightfield`. | |
| **friction**             | The friction coefficient of this collider. (automatic-collider) | `0.5` |
| **mass**                 | Mass of the collider. (automatic-collider) | `1` |
| **density**              | Restitution controls how elastic (aka. bouncy) a contact is. (automatic-collider) | `0` |
| **restitution**          | The collider density. If non-zero the collider's mass and angular inertia will be added. (automatic-collider). | `1` |
| **activeCollision**      | To set the collider receiver/emitter collision events | `false` |
| **activeCollisionTypes** | Type of the collision event. | `ActiveCollisionTypes.DEFAULT` |
| **collisionGroups**      | To specify collision groups. | `undefined` |
| **sensor**      | Set the collider as senor. More details [here](#sensor). | `undefined` |

## Events

The `Collider` component comes with a set of useful events allowing actions based on collisions or intersections (aka sensor).

### Sensor

The **Sensor** feature allows events to be triggered when there's an intersection or in other words, when the collider is traversed by another collider.

The traversed `Collider` (or the collider that will trigger events), is the sensor and should set the `activeCollision` and `sensor` properties to `true`.
By passing the above properties, the collider will no longer be affected by the physics law and will now start triggering the intersection events:

- **@intersection-enter**: When another collider starts to traverse the *sensor*
- **@intersection-exit**: When another collider leave the *sensor*

::: info
Note that you can directly pass the events to the **`RigidBody`** for **auto-colliders**.
:::

```vue
<RigidBody
  type="fixed"
  activeCollision
  sensor
  @intersection-enter="onIntersection2Enter"
  @intersection-exit="onIntersectionExit"
>
  <TresMesh :position="[0, 5, 0]">
    <TresBoxGeometry :args="[10, 10, 0.5]" />
    <TresMeshBasicMaterial color="#f4f4f4" />
  </TresMesh>

  <CuboidCollider
    :args="[10, 3, 0.5]"
    :position="[0, 3, 3]"
    activeCollision
    sensor
    @intersection-enter="onIntersection1Enter"
    @intersection-exit="onIntersectionExit"
  />

  <CuboidCollider
    :args="[10, 3, 0.5]"
    :position="[0, 3, -3]"
    activeCollision
    sensor
    @intersection-enter="onIntersection3Enter"
    @intersection-exit="onIntersectionExit"
  />
</RigidBody>
```

<!-- TODO: Add the demo link -->

::: info
You can access the [Collider](https://rapier.rs/docs/user_guides/javascript/colliders) instance
which offers full control over all the properties & methods available
by using [Template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs).
:::

## Expose object

```md
{
  instance,
  colliderDesc,
}
```
