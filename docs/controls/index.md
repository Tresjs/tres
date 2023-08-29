# Controls

## Boolean

For boolean parameters, checkbox field component will be provided.


```ts
const { value } = useControls({
  awiwi: true,
})
```

<BooleanDemo/>

## Text

For string parameters, text field component will be provided by default

```ts
const { value } = useControls({
  message: 'I`m a pretty penguin',
}
```

<TextDemo/>