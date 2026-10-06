# Post-processing

Effect passes that take over drawing the frame from Core. Two parallel families exist: one backed by pmndrs/postprocessing and one backed by Three.js addons.

## Language

### Families

**Pmndrs family**:
Components and composables backed by the `postprocessing` library, marked by the literal `Pmndrs` suffix such as `BloomPmndrs` or `useEffectPmndrs`.
_Avoid_: pmndrs effects, vanilla postprocessing, new API

**Three family**:
Components and composables backed by `three/addons`, with no suffix, such as `UnrealBloomPass` or `useEffect`.
_Avoid_: native, legacy, Three.js effects

**Composer**:
The root component that owns the underlying effect composer, provides it to its children and replaces Core's render function. `EffectComposerPmndrs` for the pmndrs family, `EffectComposer` for the three family.
_Avoid_: pipeline, stack, chain root

### Pipeline

**Effect**:
A shader-level visual operation that the pmndrs composer merges with sibling effects into one pass. Every pmndrs component owns exactly one.
_Avoid_: filter, shader, post effect

**Pass**:
One full render stage in the composer chain. In the three family the pass is the user-facing unit; in the pmndrs family it is the wrapper created around an effect.
_Avoid_: stage, step, layer

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
