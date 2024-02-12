# RoundedBox

<DocsDemo>
  <RoundedBoxDemo />
</DocsDemo>

The `cientos` package provides a `<RoundedBox />` component that serves as a short-cut for a `RoundedBoxGeometry` and a `MeshBasicMaterial` with a `Mesh` object.

```typescript
args: [
  width: number, // default 1
  height: number, // default 1
  depth: number, // default 1
  segments: number, // default 2
  radius: number, // default 0.1
]
```

Reference: [RoundedBoxGeometry](https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/RoundedBoxGeometry.js)

## Usage

```vue
<RoundedBox :args="[1, 1, 1, 2, 0.1]" color="orange" />

// RoundedBox with a custom material transformations
<RoundedBox ref="boxRef" :position="[0, 4, 0]">
  <TresMeshToonMaterial color="orange" />
</RoundedBox>
```
