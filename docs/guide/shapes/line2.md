# Line2

<DocsDemo>
  <Line2Demo />
</DocsDemo>

The `cientos` package provides a `<Line2 />` component for creating 3-D lines. It wraps [Three.js's `Line2`](https://github.com/mrdoob/three.js/blob/e2bcdfff6427c2f106cb819b18d88d1e13aa508a/examples/jsm/lines/Line2.js).

## Usage
<<< @/.vitepress/theme/components/Line2Demo.vue{3,8-12}

## Props

| Prop            | Type                     | Description                                                                | Default        |
| --------------- | -------------------------|--------------------------------------------------------------------------- | -------------- |
| points          | [See below](#points)     | Points representing the line                                               |                |
| vertexColors    | `TresColor[]`            | Vertex colors, if using                                                    | null           |
| color           | `TresColor`              | Color for the line – multiplies vertex colors                              | 'white'        |
| lineWidth       | `number`                 | Width of the line – in world units with size attenuation, pixels otherwise | 1              |
| worldUnits      | `boolean`                | Whether the line width is in world units or pixels                         | false          |
| alphaToCoverage | `boolean`                | Enables alpha to coverage. Can only be used with MSAA-enabled contexts (meaning when the renderer was created with antialias parameter set to true).                                                               | false          |
| dashed          | `boolean`                | Whether the line is dashed                                                 | false          |
| dashSize        | `number`                 | Dash size                                                                  | 1              |
| gapSize         | `number`                 | Gap size in dashed line                                                    | 1              |
| dashScale       | `number`                 | Scale of the dashes/gaps                                                   | 1              |
| dashOffset      | `number`                 | Dash offset                                                                | 0              |

### Points

The points prop has the following type:

`Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>`

The passed array is converted to `Array<number>` – i.e., a series of x, y, z vertex coordinates. This is done array entry by array entry, as follows:

| Entry type                   | Interpretation                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `Vector3`                    | Insert the vector's x, y, z into the result array                                |
| <nobr>`[number, number, number]`</nobr> | Insert the array values into the result array                         |
| `Vector2`                    | Insert the vector's x, y, then 0 into the result array                           |
| `[number, number]`           | Insert the array values, then 0 into the result array                            |
| `number`                     | Insert the number into the result array                                          |

:::warning
If you pass "bare" numbers in the points array, ensure that you pass "triplets" – groups of three numbers. Otherwise, you'll corrupt the coordinates that follow.

::: code-group
```vue [Wrong]
//        ✅     ❌     ✅
:points="[[1,1], 2, 2, [3,3]]"
// result: (1,1,0) (2,2,3) (3,0,❌)
```

```vue [Right]
//        ✅     ✅        ✅
:points="[[1,1], 2, 2, 0, [3,3]]"
// result: (1,1,0) (2,2,0) (3,3,0)
```
The component, like Three.js, will not keep you from shooting yourself in the foot.
:::