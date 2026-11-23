# Cientos

Ready-made Vue components and composables built on Core. Anything useful in a Tres scene that is not the renderer itself lives here.

## Language

### Structure

**Category**:
One of the ten top-level folders that group the package: abstractions, controls, loaders, materials, shapes, staging, light-shadow, debug-performance, objects and miscellaneous. Docs sections mirror them one-to-one.
_Avoid_: module, section, area

**Composable and component pair**:
The idiom where a feature ships as a `use*` composable plus a component that wraps it, such as `useEnvironment` and `Environment`. The component name is the public name.
_Avoid_: hook, wrapper component

### Categories

**Abstraction**:
A component that adds a behaviour to whatever is nested inside it instead of drawing something itself, such as `Billboard`, `Fit` or `Mask`.
_Avoid_: high-level component, behaviour wrapper, helper

**Control**:
A component that binds user input to a camera or object transform, such as `OrbitControls` or `TransformControls`.
_Avoid_: camera controller, input handler

**Loader**:
A composable that pulls an external asset (model, texture, SVG, video) into the scene, usually with a `*Model` or `Use*` component counterpart.
_Avoid_: asset hook, importer, fetcher

**Shape**:
A component that collapses the geometry, material and mesh triple into one tag, such as `Box` or `Sphere`.
_Avoid_: geometry helper, primitive (reserved by Core)

**Staging**:
A component that dresses the world around the subject: environment, backdrop, sky, weather, atmosphere.
_Avoid_: scenery, environment component (say Staging for the category, `Environment` for the component)

**Object**:
A concrete renderable entity or render-target-backed object, such as `Text3D`, `Html`, `Reflector` or `Fbo`.
_Avoid_: entity, prop, asset

### Instancing

**Instances**:
The component that owns one instanced mesh so many copies cost one draw call.
_Avoid_: instanced mesh wrapper, batcher

**Instance**:
A placeholder node that registers one copy with its parent `Instances` or `Merged`.
_Avoid_: clone, copy, item

**Merged**:
The component that holds several named batches so `Instance` nodes can join any of them from any depth.
_Avoid_: multi-instances, group instancing

**Batch**:
One named instanced mesh inside `Merged`, targeted by `Instance` through its `batch` prop.
_Avoid_: bucket, pool, group

### Named abstractions

**Levioso**:
The float-and-hover wrapper. Drei users know it as Float.
_Avoid_: Float (as the component name), hover, bob

**Sampler**:
Distributing instances across a mesh surface with Three.js surface sampling; exposed as `Sampler` and `useSurfaceSampler`.
_Avoid_: scatter, spawner, surface distribution
