# Bounds

<DocsDemo>
    <BoundsDemo />
</DocsDemo>

Calculates a boundary box and centers the camera accordingly. Its `lookAt` method accepts a target to look at imperatively e.g., after a click.

::: info
If you are using other camera controls, be sure to make them the 'default'.
```vue
<OrbitControls make-default />
```
:::

## Usage

<<< @/.vitepress/theme/components/BoundsDemo.vue

## Props

| Name | Description | Default |
| :--- | :--- | ---- |
| `duration` | Duration of the `lookAt` animation in seconds | `1.0` |
| `offset` | Additional distance from the target when using `lookAt` with a `Box3` or `Object3D` | `0.2` |
| `useResize` | Whether to re`lookAt` the last target when the screen is resized | `false` |
| `useMounted` | Whether to `lookAt` the `Bounds` object when the component is mounts | `false` |
| `clip` | Whether to adjust the camera's `near` and `far` settings when using `lookAt` | `false` |
| `easing` | Animation's easing function. `t` and the returned value should be in the interval `[0, 1]` | Cubic ease out |

## `lookAt`

`<Bounds />` `lookAt` points the camera at its first argument: an `Object3D`, `Box3` or `Vector3`.

```
  /**
   * Calculates a boundary box around an `Object3D` and centers the camera accordingly.
   */
  lookAt(object: Object3D): void
  /**
   * Calculates a boundary box around an `Object3D` and centers the camera accordingly and animates the camera's `up` vector.
   */
  lookAt(object: Object3D, up: VectorFlexibleParams): void
  /**
   * Centers the camera's viewport on a `Box3`.
   */
  lookAt(box3: Box3): void
  /**
   * Centers the camera's viewport on a `Box3` and animates the camera's `up` vector.
   */
  lookAt(box3: Box3, up: VectorFlexibleParams): void
  /**
   * Look at a `Vector3`.
   */
  lookAt(target: VectorFlexibleParams): void
  /**
   * Look at a `Vector3`, if provided. Move the camera to `position`.
   */
  lookAt(target: VectorFlexibleParams | undefined | null, position: VectorFlexibleParams): void
  /**
   * Look at a `Vector3`, if provided. Move the camera to `position` and animate the camera's `up` vector.
   */
  lookAt(target: VectorFlexibleParams | undefined | null, position: VectorFlexibleParams, up: VectorFlexibleParams): void
  /**
   * Rerun `lookAt` using the prior arguments. If `lookAt` has never been called, uses the `Bounds` object.
   */
  lookAt(): void
```
