# Scaling performance 🚀

> Quick guide with tips to improve performance of your Tres.js application.

We are running WebGL on the browser, which can be quite expensive and it will depend on how powerful the user's device is. To make 3D accessible to everyone, we need to make sure our applications are optimized to run also on low-end devices. This guide will provide some tips to improve the performance of your Tres.js application.

## On-demand rendering

By default, Tres.js will render your scene on every frame. This is great for most applications, but if you are building a game or a complex application, you might want to control when the scene is rendered. 

Otherwise it might drain your device battery 🔋 🔜 🪫 and make your computer sound like an airplane 🛫.

Ideally, you only want to **render the scene when necessary**, for example when the user interacts with the scene and the camera moves, or when objects in the scene are animated.

You can do that by setting the `renderMode` prop to `on-demand` or `manual`:


### Mode `on-demand`

<ClientOnly>
  <div style="position: relative; aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
    <onDemandRendering />
  </div>
</ClientOnly>


```vue
<TresCanvas render-mode="on-demand">
  <!-- Your scene goes here -->
</TresCanvas>
```



