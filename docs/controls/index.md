# Controls

## Boolean

For boolean parameters, checkbox field component will be provided.

```ts
const { awiwi } = useControls({
  awiwi: true,
})
```

<BooleanDemo/>

## Text

For string parameters, text field component will be provided by default

```ts
const { message } = useControls({
  message: 'I`m a pretty penguin',
})
```

<TextDemo/>

## Number

For number parameters, number field component will be provided by default

```ts
const { stars } = useControls({
  stars: 100,
})
```

<NumberDemo/>

## Color

For color parameters, color field component will be provided by default

```ts
const { color } = useControls({
  color: '#008080',
})
```

<ColorDemo/>

## Range

You can specify a range of number by `min` and `max`. If you specify both of them, slider control will be created.

```ts
const { planets } = useControls({
  planets: {
    value: 8,
    min: 1,
    max: 9,
    step: 1
  },
})
```

<RangeDemo/>

## Select

You can specify a list of options by `options` property. If you specify it, select control will be created.

```ts
const { videogame } = useControls({
  videogame: {
    value: 'crashbandicoot',
    options: [{
      text: 'Crash Bandicoot',
      value: 'crashbandicoot',
    }, {
      text: 'Metal Gear Solid',
      value: 'metal-gear-solid',
    }, {
      text: 'Legend of Zelda',
      value: 'legend-of-zelda',
    }],
  },
})
```

<SelectDemo/>

## Vector

You can specify a vector by adding a `isVector3`, `isVector2`, `isEuler` properties or by passing an array. If you specify them, vector control will be created.

```ts
import { Vector3 } from 'three'

const { position } = useControls({
  position: new Vector3(0, 1, 2)
})
```

<Vector3Demo/>

## Button

```ts
useControls({
  acceptBtn: {
    label: 'Accept',
    type: 'button',
    onClick: () => {
      console.log('accept')
    },
    size: 'sm',
  },
})
```
<ButtonDemo/>

### Variants

```ts
useControls({
  acceptBtn: {
    label: 'Button Secondary',
    type: 'button',
    variant: 'secondary',
    onClick: () => {
      console.log('accept')
    },
  },
})
```

<ButtonVariantDemo/>

### Sizes

```ts
useControls({
  acceptBtn: {
    label: 'Button Small',
    type: 'button',
    size: 'sm',
    onClick: () => {
      console.log('accept')
    },
  },
})
```

<ButtonSizesDemo/>

## Graph

For visualizing numeric values over time, you can use the graph control type. This will create a real-time graph that updates as the value changes.

```ts
const { wave } = useSineWave()

useControls({
  renderTimes: {
    value: wave,
    type: 'graph'
  }
})
```

<GraphDemo/>
