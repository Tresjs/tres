# Post-processing

Effect passes that take over drawing the frame from Core. Two parallel WebGL families exist, one backed by pmndrs/postprocessing and one backed by Three.js addons. A third family in the `/webgpu` entry is backed by TSL nodes.

## Language

### Families

**Pmndrs family**:
Components and composables backed by the `postprocessing` library, marked by the literal `Pmndrs` suffix such as `BloomPmndrs` or `useEffectPmndrs`.
_Avoid_: pmndrs effects, vanilla postprocessing, new API

**Three family**:
Components and composables backed by `three/addons`, with no suffix, such as `UnrealBloomPass` or `useEffect`.
_Avoid_: native, legacy, Three.js effects

**WebGPU family**:
Components exported from `@tresjs/post-processing/webgpu`, built on Core's `useRenderPipeline` and three's TSL display nodes. Names have no suffix; they match the root names where an equivalent exists.
_Avoid_: TSL effects, node effects, next API

**Composer**:
The root component that owns the underlying effect composer, provides it to its children and replaces Core's render function. `EffectComposerPmndrs` for the pmndrs family, `EffectComposer` for the three family, and `EffectComposer` from `/webgpu` for the WebGPU family, which owns a `RenderPipeline`.
_Avoid_: pipeline, stack, chain root

### Pipeline

**Effect**:
A shader-level visual operation on the input colors. In the pmndrs family, the composer merges it with sibling effects into one pass. Every pmndrs component owns exactly one, except the pass-based components (`DepthPickingPassPmndrs`, `N8AOPmndrs`) that add a **Pass** directly because their library ships a pass, not an effect. In the WebGPU family, an effect is a node transform from an input node to an output node, and the composer chains the effects in slot order.
_Avoid_: filter, shader, post effect

**Effect definition**:
The object given to `defineEffect`: name, prop defaults and the `create` function that turns an input node into an output node. In the WebGPU family it is the user-facing unit and every built-in effect is one.
_Avoid_: effect config, effect factory

**Pass**:
One full render of the scene or of a screen quad in the composer chain. In the three family the pass is the user-facing unit; in the pmndrs family it is the wrapper created around an effect. In the WebGPU family it is a `PassNode`, such as the scene pass.
_Avoid_: step, layer

**Custom effect**:
A hand-written effect class with its own fragment shader shipped by this package because the pmndrs library has no equivalent, such as `KuwaharaEffect` or `LinocutEffect`.
_Avoid_: in-house effect, shader effect

**Blend function**:
The per-effect rule for compositing an effect's output over the input buffer, exposed as the `blendFunction` prop.
_Avoid_: blend mode (the underlying object), mix mode

### Reactivity

**Prop watcher**:
The binding from a component prop to a dot-path on the effect instance, restoring the library default when the prop becomes `undefined`.
_Avoid_: prop sync, binding helper

**Recreation dependency**:
A prop whose change cannot be applied in place and forces the effect to be torn down and re-inserted at the same index.
_Avoid_: breaking prop, hard prop, rebuild trigger
