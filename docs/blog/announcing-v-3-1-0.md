---
sidebar: false
---

# Vue Devtools are back on v3.1.0 🎉

We are excited to announce the release of **TresJS v3.1.0**. This release brings back the support for Vue Devtools, which was broken since v2 🤯 thanks to [@enpitsuLin](https://github.com/enpitsuLin)

<video controls>
    <source src="https://res.cloudinary.com/alvarosaburido/video/upload/v1692768893/Tres/devtools-are-back_cuynao.mp4" type="video/mp4">
</video>

This is huge for DX since you can now inspect the internal state of the library and the components that are using it. Although, we are still working on improving the experience, so expect more improvements in the future.

## What's hot 🔥?

### Guess who is back? Back again? Vue Devtools are back 🎶

![Vue Devtools](https://media.tenor.com/idcVQVMSDvMAAAAC/again-guess-whos-back-again.gif)

So since v2, the Vue Devtools were broken whenever `<TresCanvas />` was mounted. This is because we were using the custom Renderer API `createApp` to mount a second App inside the `<TresCanvas />` component. This was causing the Vue Devtools to break since it only works with DOM based vue apps (See [issue](https://github.com/vuejs/devtools/issues/2078)).

Now, we are using the `render` function from the custom Renderer API to render the `<TresCanvas />` component, which means that the Vue Devtools are working again 🎉

```ts
const { render } = createRenderer(nodeOps)

const createInternalComponent = (context: TresContext) => {
    return defineComponent({
        setup() {
            provide('useTres', context)
            provide('extend', extend)
            return () => h(Fragment, null, slots?.default ? slots.default() : [])
        }
    })
}

const mountCustomRenderer = (context: TresContext) => {
    const InternalComponent = createInternalComponent(context)
    render(h(InternalComponent), scene.value as unknown as TresObject)
}

mountCustomRenderer(context)
```

Thanks again to [@enpitsuLin](https://github.com/enpitsuLin) for solving this issue 🙏🥹.

## Re-instancing of THREE Objects

Another important caveheat of Tres was that it was not possible to reactively change the constructor params of a THREE Object via the props `args`. 

### Before 😠

```html
<script lang="ts" setup>
const color = ref('#ffffff')
const intensity = ref(1)

const lightRef = ref<THREE.DirectionalLight>()

watch([color, intensity], ([color, intensity]) => {
    // this will not work
    lightRef.value = new THREE.DirectionalLight(color, intensity)
})
</script>

<template>
    <TresDirectionalLight ref="lightRef" :args=[color, intensity] />
</template>
```

As you can see, we are trying to re-instance the `THREE.DirectionalLight` object whenever the `color` or `intensity` refs change. So we needed to do it manually by using the `watch` function and re-assigning the template ref `lightRef` value.

### After 😎

```html
<script lang="ts" setup>
const color = ref('#ffffff')
const intensity = ref(1)
</script>

<template>
    <TresDirectionalLight :args=[color, intensity] />
</template>
```

Now, we can just pass the `color` and `intensity` refs to the `args` prop and Tres will take care of re-instancing the `THREE.DirectionalLight` object whenever the refs change 🤭😉.

## No more `useLegacyLights` warning

Since [threejs v155](https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733) update there was pretty annoying warning on the console.

![annoying useLegacyLights warning](/blog/annoying-warning.png)

And it's GONEEEEEEE! 🎉🎉🎉

## Share your work 🎨

We want to see what you are creating with TresJS, so please share your work with us in our [Discord server](https://discord.gg/UCr96AQmWn) where we have a `#Showcase` area or in our [Twitter](https://twitter.com/tresjs_dev) 😊.

Happy coding! 🚀