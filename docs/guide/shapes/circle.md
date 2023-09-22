# Circle <Badge type="warning" text="^1.6.0" />

![](/cientos/circle.png)

The `cientos` package provides a `<Circle />` component that serves as a short-cut for a `CircleGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```typescript
args: [radius: number, segments: number, thetaStart: number, thetaLength: number]
```

Reference: [CircleGeometry](https://threejs.org/docs/?q=circle#api/en/geometries/CircleGeometry)

## Usage

```vue
<Circle :args="[1, 32]" color="lightsalmon" />

// Circle with a custom material transformations
<Circle ref="circleRef" :args="[1, 32]" :position="[0, 0, 0]">
  <TresMeshToonMaterial color="lightsalmon" />
</Circle>
```
