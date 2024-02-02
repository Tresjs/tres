# Devtools



One of the most difficult things a developer faces when creating 3D experiences on the browser is debugging. The browser `canvas` is a black box, and it's hard to know what's going on inside. The imperative nature of [ThreeJS](https://threejs.org/) makes it incredibly difficult to debug, having to depend on `console.log` to see what's going on, or third party to fine-tune and inspect the scene.

Don't make me get started with checking the performance of your scene. 😱

![developer debugging 3D](/debug-3D.png)

One of our goals with TresJS is to offer **the best DX (Developer Experience)** when dealing with 3D scenes on the browser. Thanks to the declarative nature of the ecosystem plus the variety of solutions the Vue ecosystem offers such as the Vue Devtools, Nuxt and Vite, we can offer a better tooling for devs to debug their scenes.

## Introducing the Devtools

From <Badge text="^3.7.0" /> we are introducing the TresJS Devtools, a customized inspector tab for the [Official Vue Chrome Devtools](https://devtools.vuejs.org/guide/installation.html) that allows you to inspect your TresJS scenes and components.

![TresJS Devtools](/vue-chrome-devtools.png)

### Features

- **Scene Inspector**: Inspect the current scene and its components using a tree view similar to the Vue Devtools component inspector.
- **Memory Allocation**: See how much memory is being by the components.
- **Object Inspector**: Inspect the properties of the selected object in the scene, including its children.
- **Editable Properties**: And yes, you can edit the properties of the selected object and see the changes in real-time.

![](/devtools-scene-inspector.png)

Enjoy the new Devtools and let us know what you think! 🎉
