# Box <Badge type="warning" text="^1.6.0" />

![](/cientos/box.png)

The `cientos` package provides a `<Box />` component that serves as a short-cut for a `BoxGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```typescript
args: [
  width: number,
  height: number,
  depth: number,
  widthSegments: number,
  heightSegments: number,
  depthSegments: number
]
```

Reference: [BoxGeometry](https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry)

## Usage

```vue
<Box :args="[1, 1, 1]" color="orange" />

// Box with a custom material transformations
<Box ref="boxRef" :args="[1, 1, 1]" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</Box>
```
