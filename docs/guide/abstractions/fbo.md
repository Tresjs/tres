# Fbo <Badge type="warning" text="^3.5.0" />

An FBO (or Frame Buffer Object) is generally used to render to a texture. This is useful for post-processing effects like blurring, or for rendering to a texture that will be used as a texture in a later draw call.

Cientos provides an `<Fbo />` component make it easy to use FBOs in your application.

<DocsDemo>
  <FboDemo />
</DocsDemo>

## Usage

<<< @/.vitepress/theme/components/FboDemo.vue{3,15,48-51,58}

## Props

| Prop           | Description                                                                                                                                                            | Default              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`width`**    | `number` - The width of the FBO.                                                                                                                                       | Width of the canvas  |
| **`height`**   | `number` - the height of the FBO                                                                                                                                       | Height of the canvas |
| **`depth`**    | `boolean` - Whether or not the FBO should render the depth to a [`depthTexture`](https://threejs.org/docs/?q=webglre#api/en/renderers/WebGLRenderTarget.depthTexture). | `false`              |
| **`settings`** | `WebGLRenderTargetOptions` - Every other configuration property for the [`WebGLRenderTarget` class](https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget)      | `{}`                 |
