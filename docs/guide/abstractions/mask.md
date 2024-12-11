# Mask

<DocsDemo>
  <MaskDemo />
</DocsDemo>

`<Mask/>` uses the stencil buffer to cut out areas of the screen.

::: warning
To use `<Mask />` you *must* add `:stencil="true"` to your `<TresCanvas />`.

`<Mask />` relies on the [stencil buffer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer). In recent versions of THREE.js, by default, the stencil buffer is not created.
:::

## Usage

<<< @/.vitepress/theme/components/MaskDemo.vue

## Props

| Prop           | Description                                                                                                                                                            | Default              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`id`**    | Id of the stencil buffer to use. Each mask must have a `number` id. Multiple masks can refer to the same id. | |
| **`colorWrite`** | Whether the colors of the mask's own material will leak through. | `false` |
| **`depthWrite`** | Whether the depth of the mask's own material will leak through. | `false` |
