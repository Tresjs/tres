# Align

<DocsDemo>
  <AlignDemo />
</DocsDemo>

Calculates a bounding box around its children and aligns them as a group within their parent. The component measures its contents and realigns on every frame unless `cacheKey` is set.

## Usage

<<< @/.vitepress/theme/components/AlignDemo.vue

## Props

All props are optional.

| Prop         | Description                         |
| ------------ | ----------------------------------- |
| `top`        | If `true`, aligns bounding box bottom to `0` on the y-axis |
| `bottom`     | If `true`, aligns bounding box top to `0` on the y-axis. |
| `left`       | If `true`, aligns bounding box right to `0` on the x-axis. |
| `right`      | If `true`, aligns bounding box left to `0` on the x-axis. |
| `front`      | If `true`, aligns bounding box back to `0` on the z-axis. |
| `back`       | If `true`, aligns bounding box front to `0` on the z-axis. |
| `disable`    | If `true`, disables alignment on all axes. |
| `disableX`   | If `true`, disables alignment on the x-axis. |
| `disableY`   | If `true`, disables alignment on the y-axis. |
| `disableZ`   | If `true`, disables alignment on the z-axis. |
| `precise`    | See [Box3.setFromObject](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject). |
| `onAlign`    | Callback that fires when updating, after measurement. |
| `cacheKey`   | If set, component will only update when `cacheKey`'s value changes. If unset, component will update every frame. |

## `AlignCallbackOptions`

```ts
export interface AlignCallbackOptions {
  /** The next parent above <Align /> */
  parent: Object3D
  /** The outmost container group of the <Align/> component */
  container: Object3D
  width: number
  height: number
  depth: number
  boundingBox: Box3
  boundingSphere: Sphere
  center: Vector3
  verticalAlignment: number
  horizontalAlignment: number
  depthAlignment: number
}
```
