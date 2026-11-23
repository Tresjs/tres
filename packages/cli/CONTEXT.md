# CLI

The `tres` command-line tool. Today it is a model-to-component compiler: it turns a glTF file into a Vue single-file component that renders it with Tres.

## Language

### Pipeline

**Command**:
One `tres` subcommand, declared in the registry and loaded only when run. `gltf` is the real one; `banana` is the end-to-end smoke test.
_Avoid_: task (reserved for the output UI), tool, script

**IR**:
The JSON-safe intermediate representation of a parsed glTF: nodes, materials, clips, instance buckets and warnings. It records structure and naming facts only, never presentation choices.
_Avoid_: the parse, model tree, AST

**Emitter**:
The stage that turns IR into Vue source text. Every presentation choice such as rounding, group pruning and slot filtering lives here.
_Avoid_: generator, printer, renderer (reserved by Core)

**Transform pipeline**:
The optional glTF-Transform optimisation pass that writes a separate `-transformed.glb` beside the untouched source.
_Avoid_: optimizer, compression step, the pipeline

### Generated output

**Generated component**:
The `.gen.vue` file the emitter writes, named in PascalCase from the model file and stamped with the generated marker so a rerun never overwrites hand-written code.
_Avoid_: model component, output file, scaffold

**Slot**:
An override point on every renderable node whose fallback is the generated markup, so consumer changes live in their own file and survive regeneration.
_Avoid_: override, hook, extension point

**Ready**:
The load-completion signal of a generated component: a one-shot `ready` event carrying nodes, materials and actions, mirrored by the replayable `isReady` ref.
_Avoid_: loaded, onLoad, mounted

**Clip source**:
An extra `.glb` whose animation clips are merged into the model's own so one `actions` map covers all of them.
_Avoid_: animation library, clip library, extra animations

**Instance provider**:
The `.instances.gen.vue` companion that owns the model load and the instanced batches, and provides them to the generated component that renders `Instance` nodes.
_Avoid_: pool, instances file, batch owner

**Collider suffix**:
Physics intent authored in node names with Godot's vocabulary such as `-col`, `-rigid` or `-sensor`, turned into Rapier wrappers.
_Avoid_: physics tag, naming convention, marker

**Misread**:
A node-name suffix that almost matches a collider suffix and is reported instead of silently dropped.
_Avoid_: typo, near miss, warning (the general class)

### Output UI

**Phase**:
One named stage of a run shown to the user, such as Transform, Parse or Emit.
_Avoid_: step (reserved for transform pipeline steps), stage

**Task**:
The spinner line with timing that reports one phase's progress.
_Avoid_: spinner, progress, job

**Payload**:
The actual result of a run, written undecorated to stdout while every task and note goes to stderr.
_Avoid_: output, result, print
