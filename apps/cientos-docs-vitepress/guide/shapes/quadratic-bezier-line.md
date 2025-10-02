# QuadraticBezierLine

<DocsDemo>
  <QuadraticBezierLineDemo />
</DocsDemo>

`<QuadraticBezierLine />` renders a `<Line2 />` between start and end points, with an optional control point.

## Usage
<<< @/.vitepress/theme/components/QuadraticBezierLineDemo.vue

## Props

`<QuadraticBezierLine />` inherits all props but `points` from `<Line2 />`.

| Prop         | Type      | Description                                                                   | Default        | Required |
| ------------ | --------- | ----------------------------------------------------------------------------- | -------------- | ---- |
| `start` | `Vector3 \| [number, number, number]` | Starting point |        | yes |
| `end` | `Vector3 \| [number, number, number]` | Ending point |            | yes |
| `mid` | `Vector3 \| [number, number, number]` | Control point |           | no |
| `segments`     | `number`  | Number of segments in the resulting curve (higher = smoother) | 20 | no |
