# Collider

## Props

| Prop            | Description                                                                                                   | Default   |
| :-------------- | :------------------------------------------------------------------------------------------------------------ | --------- |
| **shape**       | shape of the collider                                                                                         | `cuboid`  |
| **args**        | The half-sizes of the collider shapes                                                                         | `[1,1,1]` |
| **object**      | Required for certain shapes like `trimesh`, `hull`, `heightfield`.                                            |           |
| **friction**    | The friction coefficient of this collider. (automatic-collider)                                               | `0.5`     |
| **mass**        | Mass of the collider. (automatic-collider)                                                                    | `1`       |
| **density**     | Restitution controls how elastic (aka. bouncy) a contact is. (automatic-collider)                             | `0`       |
| **restitution** | The collider density. If non-zero the collider's mass and angular inertia will be added. (automatic-collider) | `1`       |

:::info
You can access the [Collider](https://rapier.rs/docs/user_guides/javascript/colliders) instance
which offers full control over all the properties & methods available
by using [Template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs).
:::

## Expose object

```
{
  instance,
  colliderDesc,
}
```
