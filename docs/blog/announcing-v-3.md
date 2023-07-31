---
sidebar: false
---

# Announcing v3.0.0 🎉

Already? Yes! We are excited to announce the release of:

- **TresJS v3.0.0** 
- **Cientos v3.0.0** 

But you might be wondering, why a major release so soon if we just released 2.x.x not so while ago 🤔? Does it means more breaking changes? 🤯

<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/ck5JRWob7folZ7d97I" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/nickelodeon-throwback-all-that-kel-ck5JRWob7folZ7d97I">via GIPHY</a></p>

**Short answer no**, don't expect changes so big like the one from `1.x.x` to `2.x.x`, specially for you, the end user.

Then why `3.x`? We have a good reason. The team has been working hard to bring you the best possible experience when using TresJS and authoring new packages that extend the core functionality, so we decided to **re-think the whole internal state management from a new perspective**.

## Bye bye Store, hello Context Provider 🤓

Until now, we were using a `Store` to manage the internal state of the library

```ts
const state: TresState = shallowReactive({
    uuid: generateUUID(),
    camera: undefined,
    cameras: [],
    canvas: undefined,
    scene: undefined,
    renderer: undefined,
    aspectRatio: undefined,
    pointerEventHandler: undefined,
  })
```

Important things for the abstractions like `camera`, `scene`, `renderer`, etc. were stored in the `Store` and we were using `reactive` and `shallowReactive` to make sure that the changes were propagated to the components that were using them.

And we had some kind of "getters" and "setters" to access/edit the state from the outside, for example, on the Cientos package.

```ts
function getState(key: string) {
    return state[key]
}

function setState(key: string, value: any) {
    state[key] = value
} 
```

If a plugin author or a user wanted to create an abstraction around the `core`. They would have to use something like this:

```ts
const { state } = useTres()

watch(
  () => state.camera,
  (camera) => {
    // do something with the camera
  }
)
```

But this was far from ideal, authors could potentially mutate the state in a way that could break the library, and we were not able to control that.

Also we experience lot of bugs related to the reactivity system, specially when using `shallowReactive` and `shallowRef` to avoid unnecessary re-renders.

So we decided to **move away from the `Store` and use a `Context Provider` instead** where the state is a plain object with .


```ts
const toProvide: TresContext = {
    sizes,
    scene:  shallowRef<Scene>(scene),
    camera,
    cameras: readonly(cameras),
    renderer,
    raycaster: shallowRef(new Raycaster()),
    controls: ref(null),
    extend,
    addCamera,
    removeCamera,
    setCameraActive,
  }

  provide('useTres', toProvide);
```

So now you can use any property of the state individually, like this:

```html

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'

const { camera, scene, renderer} = useTresContext()
</script>
```

::: warning

`useTresContext` can be only be used inside of a `TresCanvas` since it acts as the provider for the context data.

:::

See more here [useTresContext](/api/composables.html#usetrescontext-former-usetres).

---

Hope you like this new release, we are working hard to bring you the best possible experience when using TresJS.

- Releases https://github.com/Tresjs/tres/releases
- Cientos https://github.com/Tresjs/cientos/releases


