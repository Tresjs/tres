# Smoke

`<Smoke />` is a component that renders a smoke in your scene. It is an abstraction that use a combination of textures, transparency and some calculation, to create a beautiful  smoke - cloud - fog effect

<DocsDemo>
  <SmokeDemo />
</DocsDemo>

## Usage

::: warning
Smoke componente comes with a default texture abstraction it needs to be wrapped by a Suspense component
:::

You can use `<Smoke />` component without passing any props, but still if you want you can tweak the props to find the best setup for you

```vue
<template>
  <TresCanvas>
    ...
    <Suspense>
      <Smoke />
    </Suspense>
    ...
  </TresCanvas>
</template>
```

Notice that you can pass a texture in combination with props,  to personalize your effect

```vue
<template>
  <TresCanvas>
    ...
    <Suspense>
      <Smoke
        :speed="0.8"
        :segments="12"
        texture="my_texture_path"
        :color="#f7f"
      />
    </Suspense>
    ...
  </TresCanvas>
</template>
```
## Props

<table><thead><tr class="row-header"><th class="col-name">Name</th><th class="col-type">Type</th><th class="col-description">Description</th><th class="col-default">Default</th><th class="col-required">Required</th></tr></thead><tbody><tr class="row-color"><td class="col-name"><strong><nobr>color</nobr></strong></td><td class="col-type"><code>TresColor</code></td><td class="col-description">The color of the smoke.<br>
</td><td class="col-default"><code>'#ffffff'</code></td><td class="col-required">No</td></tr><tr class="row-opacity"><td class="col-name"><strong><nobr>opacity</nobr></strong></td><td class="col-type"><code>number</code></td><td class="col-description">The strength of the opacity.<br>
</td><td class="col-default"><code>0.5</code></td><td class="col-required">No</td></tr><tr class="row-speed"><td class="col-name"><strong><nobr>speed</nobr></strong></td><td class="col-type"><code>number</code></td><td class="col-description">The rotation speed of the smoke.<br>
</td><td class="col-default"><code>0.4</code></td><td class="col-required">No</td></tr><tr class="row-width"><td class="col-name"><strong><nobr>width</nobr></strong></td><td class="col-type"><code>number</code></td><td class="col-description">The base width.<br>
</td><td class="col-default"><code>10</code></td><td class="col-required">No</td></tr><tr class="row-depth"><td class="col-name"><strong><nobr>depth</nobr></strong></td><td class="col-type"><code>number</code></td><td class="col-description">The base depth.<br>
</td><td class="col-default"><code>1.5</code></td><td class="col-required">No</td></tr><tr class="row-segments"><td class="col-name"><strong><nobr>segments</nobr></strong></td><td class="col-type"><code>number</code></td><td class="col-description">The number of smoke to render.<br>
</td><td class="col-default"><code>20</code></td><td class="col-required">No</td></tr><tr class="row-texture"><td class="col-name"><strong><nobr>texture</nobr></strong></td><td class="col-type"><code>string</code></td><td class="col-description">The texture of the smoke.<br>
</td><td class="col-default">default component texture</td><td class="col-required">No</td></tr><tr class="row-depth-test"><td class="col-name"><strong><nobr>depthTest</nobr></strong></td><td class="col-type"><code>boolean</code></td><td class="col-description">The depthTest.<br>
</td><td class="col-default"><code>true</code></td><td class="col-required">No</td></tr></tbody></table>
