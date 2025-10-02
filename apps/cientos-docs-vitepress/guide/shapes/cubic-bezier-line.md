# CubicBezierLine

<DocsDemo>
  <CubicBezierLineDemo />
</DocsDemo>

`<CubicBezierLine />` renders a `<Line2 />` between start and end points, with additional 2 control points.

## Usage
<<< @/.vitepress/theme/components/CubicBezierLineDemo.vue

## Props

`<CubicBezierLine />` inherits all props but `points` from `<Line2 />`.

| Prop         | Type      | Description                                                                   | Default        |
| ------------ | --------- | ----------------------------------------------------------------------------- | -------------- |
| `start` | `Vector3 \| [number, number, number]` | Starting point |            |
| `end` | `Vector3 \| [number, number, number]` | Ending point |            |
| `midA` | `Vector3 \| [number, number, number]` | First control point |            |
| `midB` | `Vector3 \| [number, number, number]` | Second control point |            |
| `segments`     | `number`  | Number of segments in the resulting curve (higher = smoother) | 20             |
