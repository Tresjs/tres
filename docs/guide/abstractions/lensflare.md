# Lensflare

![Lensflare](/cientos/lensflare.png)

`<Lensflare />` wraps the [three.js Lensflare](https://threejs.org/docs/#examples/en/objects/Lensflare).

## Basic Usage

```ts
import { Lensflare } from '@tresjs/cientos'
```

```vue{4}
<template>
  <TresCanvas>
    <TresPointLight>
      <Lensflare />
    </TresPointLight>
  </TresCanvas>
</template>
```

## Props

| Prop                         | Description                                                                     | Default     |
| ---------------------------- | ------------------------------------------------------------------------------- | ----------- |
| **scale**                    | `number` - scale of the lensflare                                               | 1.0         |
| [**elements**](#elements)    | `Partial<LensflareElementProps>[]` - array of lensflare element properties      | `undefined` |
| [**seed**](#seed)            | `number` - random seed for generating random seeded elements                    | `undefined` |
| [**seedProps**](#seedprops)  | `SeedProps[]` - specifications for generating random seeded elements            | `undefined` |
| **color**                    | `TresColor` - default color of lensflare elements                               | `undefined` |
| **distance**                 | `number` - default distance of lensflare elements from flare center             | `undefined` |
| **size**                     | `number` - default size of lensflare elements                                   | `undefined` |
| **texture**                  | `Texture \| string` - default texture of lensflare elements                     | `undefined` |

## `elements`

You can specify individual lensflare element properties directly using the component's `elements` prop.

The `elements` prop expects an instance of `(Partial<LensflareElementProps>)[]`.

Every object in `elements` may have any (or none) of the following properties.

| Name                | Description                                                                     |
| :------------------ | :-------------------------------------------------------------------------------|
| **texture**         | `string \| Texture` - an image URL or texture to use on the lensflare element   |
| **color**           | `TresColor` - color of the lensflare element                                    |
| **distance**        | `number` - distance of the lensflare element from the lensflare center          |
| **size**            | `number` - size of the lensflare element                                        |

## `seed`

Adding a `seed` prop to a component enables seeded random element generation.

The `seed` prop is used as the "seed" in a [pseudorandom number generator (PRNG)](https://en.wikipedia.org/wiki/Pseudorandom_number_generator). The PRNG is in turn used to build lensflare elements, by selecting values from an array of `SeedProps`. 

::: info
If you set a `seed` but not `seedProps`, the component will fall back to the default, built-in `SeedProps[]`.
:::

### Example

```
<Lensflare :seed="seedRef" />
```

Below, the results of setting `seedRef.value` to `0`, `1`, `2`, `3`, `4`, respectively.

![Lensflare seeds 0-4](/cientos/lensflare_seeds.png)

## `seedProps`

Adding a `seedProps` prop to the component enables seeded random element generation. 

The `seedProps` prop expects an instance of `SeedProps[]`. It specifies rules and acceptable values for creating random lensflare elements.

Every element in `seedProps` has this shape.

| Name                | Description                                                                                                                               | Required |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **texture**         | `string[]` - array of 1 or more image URLs; a single texture will be selected per generated element                                       | yes      |
| **color**           | `TresColor[]` - array of 1 or more colors; a single color will be selected per generated element                                          | yes      |
| **distance**        | `[number, number]` - minimum and maximum allowable distance from the flare center                                                         | yes      |
| **size**            | `[number, number]` - minimum and maximum allowable size                                                                                   | yes      |
| **length**          | `[number, number]` - minimum and maximum allowable number of elements to generate                                                         | yes      |
| **seed**            | `number` - if set, when this entry is processed, the random number generator with a combination of the incoming seed and this seed        | no       |

::: info
If you set `seedProps` but not `seed`, the component will fall back to a default `seed` of `0`.
:::

## Random elements and non-random properties

`<Lensflare />` was designed to make it easy to get a lensflare on screen. You can simply add the component with no props and the component will generate seeded random lensflare elements.

```vue
<Lensflare />
```

### Non-random properties

You can provide a list of lensflare element properties using the [`elements`](#elements) prop. 

```vue
<Lensflare :elements="[{color:'red'}, {color:'yellow'}]" />
```

This will produce a lensflare with 2 elements. The first element will be red. The second will be yellow. The unspecified properties – `distance`, `size`, `texture` – will be filled in by the built-in defaults in this case. 

You can also provide default props which will overwrite random generated props.

```vue
<Lensflare color:"red" />
```

Since `elements` is not defined here, the component will generate random lensflare elements. The specified `color` prop – "red" – will overwrite the color property of the generated lensflare elements.

See [precedence](#precedence) for details about how properties are filled in.

### Random elements

You can let the component generate random elements ...

... by not adding an [`elements` prop](#elements)

```vue
<Lensflare />
```

... by adding a [`seed` prop](#seed) 

```vue
<Lensflare :seed="7127" />
```

... by adding a [`seedProps` prop](#seedprops)

```vue
<Lensflare :seedProps="[{...}, {...}]" />
```

### Mixing random elements and non-random properties

You can mix your own properties and random elements.

```vue
<Lensflare :elements="[{...}, {...}]" :seed="8193" />
```

Here, both `elements` and `seed` are defined. The component will generate random elements and overwrite their properties with the contents of `elements`, according to the [order of precedence](#precedence).

:::info
When mixing random elements with `elements`, the final number of lensflare elements equals whichever is **larger**, the length of the array of generated random elements or the length of `elements`.
:::

### Precedence

If more than one source sets the same property on a given element, the following order of precendence is used. Higher in the list (lower number) equals higher precendence.

1. `elements`
2. `color`, `distance`, `size`, `texture` – default element properties
3. `seed`, `seedProps` – generated random elements
4. built-in default element properties

::: info
If `elements`, `seed`, and `seedProps` are all undefined, a `seed` of `0` and built-in default `seedProps` will be used to generate the lensflare elements.
:::

:::details Precedence example

Here's an example of precedence. Assume this is in our vue template.

```vue
<Lensflare 
  :elements="[
    {size:512, texture='http://example.net/circle.png'}, 
    {color:'yellow', distance:0.5}
  ]"
  :texture="http://example.net/ring.png"
  color="red"
  :size="256"
  :seed="1" />
```

`seed` is defined, so the component will produce random elements.

Assume the random element generator produces this, based on `seed`:

```js
[
  {color:'white', distance:0, size:1024, texture:'http://example.net/rays.png'},
  {color:'white', distance:1, size:512, texture:'http://example.net/circle.png'},
  {color:'white', distance:2, size:512, texture:'http://example.net/circle.png'},
]
```

When random elements are mixed with `elements`, the final number of elements in the lensflare is determined by whichever is longer.

Here, `elements` contains 2 entries. The random element generator produced 3. So the resulting lensflare will have 3 elements.

Therefore, resulting lensflare will have 3 elements. 

The resulting 3 lensflare elements will have the following properties, from the following sources:

```js
[
  {
    color: 'yellow', // from `elements`
    distance: 0, // from random element generator
    size: 512, // from `elements`
    texture: 'http://example.net/circle.png' // from `elements`
  },
  {
    color: 'red', // from component prop `color`
    distance: 0.5, // from `elements`
    size: 256, // from component prop `size`
    texture: 'http://example.net/ring.png' // from component prop `texture`
  },
  {
    color: 'red', // from component prop `color`
    distance: 2, // from random element generator
    size: 256, // from component prop `size`
    texture: 'http://example.net/ring.png' // from component prop `texture`
  }
]
```
:::
