---
title: TSL composables
description: Manage TSL uniforms, shared nodes and the WebGPU render pipeline with Vue composables.
---

::warning
**Experimental**: these composables are in `@tresjs/core/webgpu` since v5.11. Their API can change in a minor release.
::

`@tresjs/core/webgpu` has four composables for [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language) work:

| Composable | Use it for |
| -- | -- |
| `useUniforms` / `useUniform` | Values. Bind refs, getters or Leches controls to uniforms. |
| `useNodes` | Shared graphs that many components read (noise, functions, varyings). Built once. |
| `useLocalNodes` | The graph of one component, built from shared uniforms and nodes. |
| `useRenderPipeline` | Post-processing with three's `RenderPipeline`. |

They work only in components inside a `TresCanvas` from `@tresjs/core/webgpu`.

## Values and structure

Keep this rule in mind:

- **A value goes in a uniform.** A uniform change writes `uniform.value`. Three sends it to the GPU, with no graph rebuild and no shader recompile.
- **A structure change goes through a rebuild.** A new graph recompiles every material that uses it.

If a prop changes the color, the strength or the speed, put it in a uniform. Rebuild the graph only when a prop changes its shape: which node to use, or how many times a JavaScript loop runs.

## The canvas store

Each canvas has one store with three collections: `uniforms`, `nodes` and `passes`. The store is created when a component first uses a TSL composable.

- **First registration wins.** When two components register the same name, the second one gets the entry of the first.
- **Entries live as long as the canvas.** They stay when the component that registered them unmounts. Remove them with `remove*` or `clear*`. Everything is freed when the canvas unmounts.
- **Scopes.** Pass a scope name to keep entries apart (`useUniforms({ uHealth: 100 }, 'player')`). Read a scoped entry with `uniforms.player.uHealth`.
- **Raw nodes.** The store never wraps a node in a Vue proxy.

## useUniforms

```ts
import { useUniforms } from '@tresjs/core/webgpu'

const props = defineProps<{ density: number }>()
const color = ref('#82dbc5')

const { uColor, uDensity } = useUniforms({ uColor: color, uDensity: () => props.density }, 'fog')
```

Each value can be a plain value, a ref or a getter. When a ref or getter changes, the uniform value changes. The uniform node stays the same object.

If the uniform already exists, the call reuses it and does not change its value. A ref or getter you pass still writes its later changes.

The input is converted to a uniform value:

| Input | Uniform value |
| -- | -- |
| `number`, `boolean` | the same |
| color string (`'#ff0000'`, `'red'`), `Color` | `Color` |
| `{ x, y }`, `{ x, y, z }`, `{ x, y, z, w }` | `Vector2`, `Vector3`, `Vector4` |
| `Vector2/3/4`, `Matrix3/4` | the same |
| TSL node (`color('#f00')`, `vec3(0, 1, 0)`) | a typed uniform with the node's value |

Leches controls are refs, so they work directly:

```ts
const { color, amplitude } = useControls({ color: '#82dbc5', amplitude: { value: 0.2, min: 0, max: 1 } })
useUniforms({ uColor: color, uAmplitude: amplitude })
```

::tip
For a value that changes every frame, write it in `onBeforeRender`, not through a ref. This needs no watcher:

```ts
const { uTime } = useUniforms({ uTime: 0 })
const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => { uTime.value = elapsed })
```
::

Destructure the uniforms you use every frame. A read through the returned object goes through two proxies and costs about 200 times more than a read from a variable (about 65 ns).

In `on-demand` [render mode](/api/components/tres-canvas), a change from a ref or getter requests a new frame.

### Read uniforms

```ts
const fog = useUniforms('fog') // one scope
const all = useUniforms() // the root entries and every scope
```

The result is live: it reads the store each time. It is also reactive to entries that are added, replaced or removed, so you can use it in templates and `computed`.

### useUniform

```ts
const uTime = useUniform('uTime', 0) // create or reuse a root uniform
const same = useUniform('uTime') // read it. Throws if it does not exist
```

### Utils

`useUniforms` also returns `removeUniforms(names, scope?)`, `clearUniforms(scope?)` and `rebuildUniforms(scope?)`. `clearUniforms('root')` clears only the root entries. With no argument, it clears everything.

## useNodes

```ts
import { useNodes } from '@tresjs/core/webgpu'
import { Fn, normalLocal, positionLocal, sin } from 'three/tsl'

useNodes(({ uniforms }) => {
  const { uAmplitude, uFrequency } = uniforms.wave
  return {
    wave: positionLocal.add(normalLocal.mul(sin(positionLocal.y.mul(uFrequency)).mul(uAmplitude))),
  }
})
```

Other components read the same node object:

```ts
const { wave } = useNodes()
const fx = useNodes('player') // a scope
```

The creator gets the store (`uniforms`, `nodes`, `passes`) and the canvas objects (`scene`, `camera`, `renderer`, `sizes`).

### When the creator runs

Once per generation. It does **not** run again when a value it read from a prop changes. A new node would not reach the components that already built their graphs from the old one, and every material that uses it would recompile. So:

- A value that changes goes in a uniform, and the node reads the uniform.
- A structure change goes through `rebuildNodes(scope?)`. All creators run again, and `useLocalNodes` consumers that read a replaced node rebuild.

A creator that reads an entry before it exists gets `undefined` until the next rebuild. A warning in development names the entry. Register entries higher in the tree, or earlier in the same component.

`useNodes` also returns `removeNodes`, `clearNodes` and `rebuildNodes`.

Good candidates: complex functions, multi-octave noise, reusable effects, shared varyings. Poor candidates: short expressions and math for one component (use `useLocalNodes`).

## useLocalNodes

```ts
import { useLocalNodes } from '@tresjs/core/webgpu'

const { colorNode } = useLocalNodes(({ uniforms, nodes }) => ({
  colorNode: nodes.wave.mul(uniforms.uStrength),
}))
```

```vue
<TresMeshStandardNodeMaterial :color-node="colorNode" />
```

It returns a record of `shallowRef`s. After a rebuild, the refs hold the new nodes and Tres puts them on the material.

### When it rebuilds

The creator runs **untracked**. Reading `props.color` in it does not make the graph rebuild when `props.color` changes. It rebuilds only when:

1. a source in the second argument changes,
2. a store entry that the creator read is replaced, removed or added,
3. `rebuild*` starts a new generation, or a hot update replaces the component.

Declare a source only for an input that decides the structure of the graph:

```ts
const props = defineProps<{ octaves: number, strength: number }>()

useUniforms({ uStrength: () => props.strength }) // a value: no rebuild

const { colorNode } = useLocalNodes(
  ({ uniforms }) => ({ colorNode: fbm(positionWorld, props.octaves).mul(uniforms.uStrength) }),
  [() => props.octaves], // structure: a JS loop runs `octaves` times
)
```

If the graph rebuilds many times per second, a warning in development tells you to move the input into a uniform.

::warning
Only reads made **before the creator returns** are tracked. The body of `Fn(() => ...)` runs later, when three builds the shader. Read the entry in the creator and use the variable in `Fn`:

```ts
useLocalNodes(({ uniforms }) => {
  const strength = uniforms.uStrength // tracked
  return { effect: Fn(() => strength.mul(2))() }
})
```
::

### Install nodes on an object

Some nodes go on an object, such as `scene.fogNode` or `scene.backgroundNode`. Return a function instead of a record. It runs after the build. The function it returns undoes the install:

```ts
import { fog, rangeFogFactor } from 'three/tsl'

useUniforms({ uFogColor: '#1a1a2e', uNear: 3, uFar: 10 }, 'fog')

useLocalNodes(({ scene, uniforms }) => {
  const { uFogColor, uNear, uFar } = uniforms.fog
  const fogNode = fog(uFogColor, rangeFogFactor(uNear, uFar))

  return () => {
    scene.fogNode = fogNode
    return () => { scene.fogNode = null }
  }
})
```

On a rebuild, the old cleanup runs before the new install. On unmount, the cleanup runs.

## useRenderPipeline

```ts
import { useRenderPipeline, useUniforms } from '@tresjs/core/webgpu'
import { bloom } from 'three/addons/tsl/display/BloomNode.js'

const props = defineProps<{ strength: number }>()
useUniforms({ uStrength: () => props.strength })

useRenderPipeline(({ renderPipeline, passes, uniforms }) => {
  const sceneColor = passes.scenePass.getTextureNode()
  renderPipeline.outputNode = sceneColor.add(bloom(sceneColor, uniforms.uStrength))
})
```

With a callback, it:

1. creates three's `RenderPipeline` and a `scenePass` (the scene with the active camera),
2. sets `outputNode` to the scene pass, then runs your callbacks,
3. renders the canvas through the pipeline,
4. frees the pipeline and restores normal rendering when the component unmounts.

Mount the effect component to turn the effect on, and unmount it to turn it off:

```vue
<BloomEffect v-if="bloomEnabled" :strength="strength" />
```

### Callbacks

```ts
useRenderPipeline(
  ({ renderPipeline, passes }) => { /* main: set outputNode */ },
  ({ passes }) => { passes.scenePass.setMRT(mrt({ output, velocity })) }, // setup: runs first
)
```

The callbacks run when the pipeline is created, when the scene or the active camera changes (with a new scene pass), when a store entry they read changes, and on `rebuild()`. They do not run on re-render. Put dynamic values in uniforms.

Return a record from a callback to register more passes. `scenePass` is reserved.

```ts
useRenderPipeline(({ renderPipeline, scene, camera }) => {
  const depthPass = pass(scene, camera)
  renderPipeline.outputNode = depthPass
  return { depthPass }
})
```

### Read the pipeline

```ts
const { renderPipeline, passes, isReady, rebuild, reset, clearPasses } = useRenderPipeline()
```

Without callbacks, it only reads. It never creates the pipeline and does not keep one alive.

- `renderPipeline` is a ref: the pipeline, or `null` when no component configures one.
- `rebuild()` runs the callbacks again with a new scene pass.
- `reset()` frees the pipeline now. The canvas renders without it until the next rebuild.
- `clearPasses()` removes and disposes the passes that callbacks registered. `scenePass` stays, so the pipeline keeps drawing.

One pipeline renders per canvas. If two components configure it, a warning shows and the one mounted last renders. When it unmounts, the other one configures the pipeline again.

`useRenderPipeline` throws under a `WebGLRenderer`. It uses the [render function](/api/composables/use-loop) of the loop, so it works with the `always`, `on-demand` and `manual` render modes.
