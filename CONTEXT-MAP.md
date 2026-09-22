# Context Map

Each package is its own bounded context with its own glossary. Read the glossary of the package you touch before naming things; read Core's whenever you are unsure, since every other context borrows its terms.

## Contexts

- [Core](./packages/core/CONTEXT.md) — the Vue custom renderer that turns templates into a Three.js scene graph and drives the loop
- [Cientos](./packages/cientos/CONTEXT.md) — ready-made abstractions built on Core: controls, loaders, staging, materials, shapes
- [Post-processing](./packages/postprocessing/CONTEXT.md) — effect passes that take over drawing the frame
- [Leches](./packages/leches/CONTEXT.md) — the tweak-panel GUI for Vue apps
- [Rapier](./packages/rapier/CONTEXT.md) — the physics layer that gives Tres objects simulated bodies
- [CLI](./packages/cli/CONTEXT.md) — the `tres` command that compiles glTF files into Tres components

## Relationships

- **Core → Cientos**: Cientos consumes Core's context and loop through `useTres` and `useLoop`; it never touches nodeOps or the catalogue directly
- **Core → Post-processing**: Post-processing replaces Core's render function through the loop, so Core stops drawing and the composer draws instead
- **Leches ↔ Core**: no dependency; Leches is a plain Vue GUI that playgrounds and docs use to tweak Tres scenes
- **Core → Rapier**: Rapier steps the world from Core's loop and writes transforms back onto Tres objects; its context mirrors Core's context pattern
- **CLI → Cientos, Rapier**: generated components import Cientos loaders and instancing (`useGLTF`, `Instances`, `Merged`) and, with the physics flag, Rapier's `RigidBody`
