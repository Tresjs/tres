# Core

The Vue custom renderer that maps Vue components onto a Three.js scene graph and drives the render loop. Everything else in the ecosystem builds on this context.

## Language

### Scene graph

**Tres component**:
A Vue tag that maps one-to-one onto a Three.js class by name, prefixed with `Tres` (`<TresMesh>` creates a `Mesh`).
_Avoid_: wrapper, Tres element, Three component

**Catalogue**:
The registry of Three.js classes that templates may use as Tres components.
_Avoid_: registry, component map

**Extend**:
Adding classes to the catalogue at runtime so they become Tres components.
_Avoid_: register, plugin, install

**Primitive**:
A component that mounts an existing Three.js object instance instead of constructing one from the catalogue.
_Avoid_: raw object, instance component

**Args**:
The positional constructor arguments of a Tres component, passed through the `args` prop.
_Avoid_: constructor props, params

**Attach**:
Assigning a child object onto a named property of its parent (such as `material` or `geometry`) instead of adding it as a scene-graph child.
_Avoid_: slot, bind, mount on

**Pierced prop**:
A prop written with dashes that sets a nested Three.js property, such as `position-x` or `rotation-y`.
_Avoid_: nested prop, dot prop, deep prop

**Disposal**:
Releasing the GPU resources of an object and its descendants when it leaves the scene graph.
_Avoid_: cleanup, teardown, destroy

### Runtime

**Context**:
The per-canvas state shared by every component under a `TresCanvas`: scene, camera, renderer, sizes, controls, events and loop.
_Avoid_: store, state, provider, Tres state

**Loop**:
The per-frame scheduler that exposes `onBeforeRender` and `onRender` callbacks ordered by priority.
_Avoid_: raf, ticker, animation loop, frame loop

**Render function**:
The single step in the loop that draws the scene; it can be replaced, which is how post-processing takes over drawing.
_Avoid_: render callback, draw call

**Render mode**:
The policy that decides when a frame is drawn: `always`, `on-demand`, or `manual`.
_Avoid_: frameloop, render strategy, render policy

**Invalidate**:
Requesting one or more frames while in `on-demand` render mode.
_Avoid_: request render, mark dirty, refresh

**Advance**:
Drawing exactly one frame while in `manual` render mode.
_Avoid_: step, tick, next frame
