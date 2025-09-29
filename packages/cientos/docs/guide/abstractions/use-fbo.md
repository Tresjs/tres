# useFBO <Badge type="warning" text="^3.5.0" />

An FBO (or Frame Buffer Object) is generally used to render to a texture. This is useful for post-processing effects like blurring, or for rendering to a texture that will be used as a texture in a later draw call.

Cientos provides a `useFBO` composable to make it easy to use FBOs in your application.

::: warning
The `useFBO` composable must be used inside of a child component since it needs the context of TresCanvas.
:::

<DocsDemo>
  <UseFBODemo />
</DocsDemo>

## Usage

`FboCube.vue`

<<< @/.vitepress/theme/components/FboCube.vue{2,4-11,20}

`Experience.vue`

<<< @/.vitepress/theme/components/UseFBODemo.vue{40}

## Props

| Prop           | Description                                                                                                                                                            | Default              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`width`**    | `number` - The width of the FBO.                                                                                                                                       | Width of the canvas  |
| **`height`**   | `number` - the height of the FBO                                                                                                                                       | Height of the canvas |
| **`depth`**    | `boolean` - Whether or not the FBO should render the depth to a [`depthTexture`](https://threejs.org/docs/?q=webglre#api/en/renderers/WebGLRenderTarget.depthTexture). | `false`              |
| **`settings`** | `WebGLRenderTargetOptions` - Every other configuration property for the [`WebGLRenderTarget` class](https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget)      | `{}`                 |
