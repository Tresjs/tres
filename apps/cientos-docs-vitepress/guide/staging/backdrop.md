# Backdrop

<DocsDemo>
    <BackdropDemo class="demo-scene" />
</DocsDemo>

The `cientos` package provides a `<Backdrop />` component. It's just a curved plane, like a studio backdrop. Meant is for presentational purposes, to break up light and shadows more interestingly.

## Usage

```vue
<Backdrop />

// Backdrop with a custom material
<Backdrop
  :floor="1.5"
  :segments="20"
  receive-shadow
>
    <TresMeshPhysicalMaterial color="orange" :roughness="1" />
</Backdrop>
```

## Props

| Name | Type | Default | Required |
| :--- | :--- | ------- | -------- |
| floor | number | `0.25` | No |
| segments | number | `20` | No |
| receiveShadow | boolean | `false` | No |
