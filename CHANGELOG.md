# Changelog

## [5.0.1](https://github.com/Tresjs/tres/compare/5.0.0...5.0.1) (2025-09-22)

### Bug Fixes

* removed postinstall script ([#1089](https://github.com/Tresjs/tres/issues/1089)) ([59f5024](https://github.com/Tresjs/tres/commit/59f5024de096d20c2873168199271cecf7a88a1c))

## [5.0.0](https://github.com/Tresjs/tres/compare/4.3.6...5.0.0) (2025-09-20)

### ⚠ BREAKING CHANGES

#### ESM Only
* **Tres is now ESM only** - Removed UMD build configuration from package.json and adjusted exports to only include ES module. Updated vite.config.ts to specify the output format as ES, enhancing compatibility with modern module systems.

#### Event System Overhaul
* **New event system based on pmdrs/pointer-events** - Only first element intersected will trigger the pointer event, no more need to stop propagation on occlusion. Replaced raycaster with events system throughout the codebase.

#### Loop System Refactoring
* **onAfterRender has been renamed to onRender**
* Removed deprecated loop implementation and updated related composables

#### Context API Changes
* **useTresReady is no longer available** - replaced by `isReady` in the renderer in the context
* **onTresReady is no longer available** - `renderer.isReady` should be leveraged instead
* **camera ctx property is now an object** with the camera manager instead of the active camera
* **useRenderer now returns invalidate and advance** - useTresContextProvider no longer contains render state
* **invalidate, advance, canBeInvalidated and the renderer instance** are now accessed through the context via `renderer`
* The renderer instance in the context is now readonly
* Removed emit from useTresContextProvider and useTresEventManager
* The types `EmitEventName` and `EmitEventFn` are no longer exported from @tresjs/core

#### Composables Removed/Deprecated
* **useTexture composable moved to @tresjs/cientos package**
* **useSeek is deprecated** and removed

#### Loader Changes
* **useLoader API changed** - no longer returns the plain object, now returns an object with reactive data (resource|s), isLoading, error) and a load method, can be used both sync and async (suspense)

### Features

* **WebGPU native support** ([#1029](https://github.com/Tresjs/tres/issues/1029)) ([6f3d41d](https://github.com/Tresjs/tres/commit/6f3d41d1c73cb3113cd22321d9672a2907080652))
* **New useTres composable** - introduce useTres composable and update related documentation ([#1017](https://github.com/Tresjs/tres/issues/1017)) ([fd03f72](https://github.com/Tresjs/tres/commit/fd03f7241e9345f670ab64967007a40e3c1d80cd))
* **Enhanced useLoop and useRenderLoop** - useLoop and useRenderLoop refactoring ([#1035](https://github.com/Tresjs/tres/issues/1035)) ([db65f3f](https://github.com/Tresjs/tres/commit/db65f3f1ea723048d6851ed52a445d80a0d26f09))
* **Expose render mode** ([#1032](https://github.com/Tresjs/tres/issues/1032)) ([b5b9456](https://github.com/Tresjs/tres/commit/b5b94560fddcdcb65f3dec6692143867ed58914e))
* **Tres Devtools integration** - add context inspector devtools ([#1013](https://github.com/Tresjs/tres/issues/1013)) ([ff6723c](https://github.com/Tresjs/tres/commit/ff6723cc7d91b229523220e7eb18d0e2b4a48efb))
* **Make utility methods available** ([#1068](https://github.com/Tresjs/tres/issues/1068)) ([a225230](https://github.com/Tresjs/tres/commit/a225230cd61c87eeed30b1d86261b97649bfd2ae))
* **Model and animation recipe** ([#1082](https://github.com/Tresjs/tres/issues/1082)) ([078d7bc](https://github.com/Tresjs/tres/commit/078d7bce3c4d6496a78e80e6ec5302a208ef8931))
* **Warning system** - warn user if the canvas has no area ([#1048](https://github.com/Tresjs/tres/issues/1048)) ([4c06603](https://github.com/Tresjs/tres/commit/4c06603eef16d06ec045936d33b820d209c99eb0))
* **Enhanced Nuxt configuration** - enhance Nuxt configuration and AppHeader to include package version ([7a8b53f](https://github.com/Tresjs/tres/commit/7a8b53f9e22b36cdd07b3499c845e61e737556a4))
* **devtools communication strategy** ([#1067](https://github.com/Tresjs/tres/issues/1067)) ([d8752bb](https://github.com/Tresjs/tres/commit/d8752bbdb330ea7c8d641164aab787abbb425ccb))
* v5 release ([#965](https://github.com/Tresjs/tres/issues/965)) ([190d8f7](https://github.com/Tresjs/tres/commit/190d8f71a4e350bd2944cb91a064920755b03ce7))

### Bug Fixes

* **Performance improvements** - update elapsed time retrieval in useCreateRafLoop to use the latest clock property ([#1046](https://github.com/Tresjs/tres/issues/1046)) ([1b3971c](https://github.com/Tresjs/tres/commit/1b3971c27c56964c8cbc3f0528e1362a648c8b41))
* **Property handling** - avoid pierced props to setScalar when numerical ([#1073](https://github.com/Tresjs/tres/issues/1073)) ([4e7ba85](https://github.com/Tresjs/tres/commit/4e7ba85d28b8aefa4a37cd336bfedd841c981e91))
* **Documentation** - docs ssg 404 issues ([#1081](https://github.com/Tresjs/tres/issues/1081)) ([9e1fc89](https://github.com/Tresjs/tres/commit/9e1fc89d79ea995a005bb3fd09797c2c0391ce78))
* **Package exports** - removed development exports from package.json ([#1079](https://github.com/Tresjs/tres/issues/1079)) ([1baca35](https://github.com/Tresjs/tres/commit/1baca351698d21240e47275d328a4a757b9edfd2))
* **Loader improvements** - add initial value support to useLoader ([#1007](https://github.com/Tresjs/tres/issues/1007)) ([be3280b](https://github.com/Tresjs/tres/commit/be3280b01185358558cd91aa7cfca4bc7a1507e8))
* added forgotten ready emit ([8b97e85](https://github.com/Tresjs/tres/commit/8b97e850d19a9bba4dc1353e796859d209539fbe))

### Code Refactoring

* **useRenderer refactoring** - move renderer logic from usetrescontextprovider to userenderer ([#1022](https://github.com/Tresjs/tres/issues/1022)) ([cc8b752](https://github.com/Tresjs/tres/commit/cc8b752b717ca20f3da58b1a1890c5da2473f1cf))
* **Context system overhaul** - removal of emit from usetrescontextprovider composable ([#999](https://github.com/Tresjs/tres/issues/999)) ([090adf3](https://github.com/Tresjs/tres/commit/090adf30774daa90c1fef710b00cbac5480c0b94))
* **Camera management** - context camera is now a state ([#1004](https://github.com/Tresjs/tres/issues/1004)) ([d5daf5d](https://github.com/Tresjs/tres/commit/d5daf5dace31e27f293c49506302e3fa0c93483a))
* **Performance optimization** - removal of performance state from useTresContextProvider ([#1003](https://github.com/Tresjs/tres/issues/1003)) ([79edf43](https://github.com/Tresjs/tres/commit/79edf431f61b5bd6876bc248ce88b8dcf220b64b))
* **Ready state management** - removed useTresReady, added isReady to the renderer ([#1000](https://github.com/Tresjs/tres/issues/1000)) ([ff35bfc](https://github.com/Tresjs/tres/commit/ff35bfce4964bb884faa0b3258f7f3a5450ec69c))

### Deprecated/Removed Features

* **useTexture composable removal** ([#1008](https://github.com/Tresjs/tres/issues/1008)) ([041b697](https://github.com/Tresjs/tres/commit/041b697bf77ad7b7f70b7d3f2bdeed99c5149abb))
* **useSeek deprecation** - deprecate useSeek composable and update documentation ([#990](https://github.com/Tresjs/tres/issues/990)) ([3d5ea13](https://github.com/Tresjs/tres/commit/3d5ea135911627ae3c9d4609c83f646a9cd793a9))

## [5.0.0-rc.0](https://github.com/Tresjs/tres/compare/5.0.0-alpha.2...5.0.0-rc.0) (2025-09-20)

### Features

* model and animation recipe ([#1082](https://github.com/Tresjs/tres/issues/1082)) ([078d7bc](https://github.com/Tresjs/tres/commit/078d7bce3c4d6496a78e80e6ec5302a208ef8931))

### Bug Fixes

* docs ssg 404 issues ([#1081](https://github.com/Tresjs/tres/issues/1081)) ([9e1fc89](https://github.com/Tresjs/tres/commit/9e1fc89d79ea995a005bb3fd09797c2c0391ce78))

## [5.0.0-alpha.2](https://github.com/Tresjs/tres/compare/5.0.0-alpha.1...5.0.0-alpha.2) (2025-09-03)

### Features

* devtools communication strategy ([#1067](https://github.com/Tresjs/tres/issues/1067)) ([d8752bb](https://github.com/Tresjs/tres/commit/d8752bbdb330ea7c8d641164aab787abbb425ccb))

## [5.0.0-alpha.1](https://github.com/Tresjs/tres/compare/5.0.0-alpha.0...5.0.0-alpha.1) (2025-08-30)

### Bug Fixes

* removed development exports from package.json ([#1079](https://github.com/Tresjs/tres/issues/1079)) ([1baca35](https://github.com/Tresjs/tres/commit/1baca351698d21240e47275d328a4a757b9edfd2))

## [5.0.0-alpha.0](https://github.com/Tresjs/tres/compare/5.0.0-next.6...5.0.0-alpha.0) (2025-08-21)

### Features

* 1047 warn user if the canvas has no area ([#1048](https://github.com/Tresjs/tres/issues/1048)) ([4c06603](https://github.com/Tresjs/tres/commit/4c06603eef16d06ec045936d33b820d209c99eb0))
* enhance Nuxt configuration and AppHeader to include package version ([7a8b53f](https://github.com/Tresjs/tres/commit/7a8b53f9e22b36cdd07b3499c845e61e737556a4))
* make some of the utility methods available to users ([#1068](https://github.com/Tresjs/tres/issues/1068)) ([a225230](https://github.com/Tresjs/tres/commit/a225230cd61c87eeed30b1d86261b97649bfd2ae))

### Bug Fixes

* avoid pierced props to setScalar when numerical ([#1073](https://github.com/Tresjs/tres/issues/1073)) ([4e7ba85](https://github.com/Tresjs/tres/commit/4e7ba85d28b8aefa4a37cd336bfedd841c981e91))

### Reverts

* **docs:** revert active navigation change ([#1058](https://github.com/Tresjs/tres/issues/1058)) ([dd13115](https://github.com/Tresjs/tres/commit/dd13115bf2b13ce6e3b9ffad28d5c6056afdc2b6))

## [5.0.0-next.6](https://github.com/Tresjs/tres/compare/5.0.0-next.5...5.0.0-next.6) (2025-06-22)

### Bug Fixes

* update elapsed time retrieval in useCreateRafLoop to use the latest clock property ([#1046](https://github.com/Tresjs/tres/issues/1046)) ([1b3971c](https://github.com/Tresjs/tres/commit/1b3971c27c56964c8cbc3f0528e1362a648c8b41))

## [5.0.0-next.5](https://github.com/Tresjs/tres/compare/5.0.0-next.4...5.0.0-next.5) (2025-06-20)

## [5.0.0-next.4](https://github.com/Tresjs/tres/compare/5.0.0-next.3...5.0.0-next.4) (2025-06-20)

### ⚠ BREAKING CHANGES

* onAfterRender has been renamed to onRender

* refactor: type improvements in createPriorityEventHook

* wip

* wip

* improved test

* added context to useCreateRenderLoop and tests

* fixed typing

* added clock

* wip

* refactor: remove deprecated loop implementation and update related composables

- Removed the old `useCreateRenderLoop` and its associated tests.
- Updated `useLoop` to utilize the new `useRenderLoop` for better event handling.
- Commented out `OrbitControls` in relevant Vue components for potential future use.
- Cleaned up unused code and comments in `useTresContextProvider`.

* added some todos

* refactor: removed redundant eventhook

* refactor: simplify renderer setup by removing loop parameter

* refactor: enhance useRenderLoop to accept notifyFrameRendered callback

* chore: removed obsolete comment

* chore: made TresCanvas use correct event hook

* refactor!: omitted frame in render manager return

* refactor: restored renderEventHook

* chore: added comments after meeting

* refactor: made render loop more generic in it's naming

* refactor: made useLoop use useTres context

* chore: added jsdoc description for useLoop

* refactor: rename LoopContext to RafLoopContext and update related references

* refactor: replaced setTimeout with useTimeout

* refactor: update useLoop tests to use useCreateRafLoop and adjust rendering logic

* test: enhance useLoop tests with fake timers and add new callback functionality

* chore: removed debug code

* fix: initialize frames based on renderMode to ensure correct rendering behavior

* refactor: fixed multiple playgrounds

* feat: added loop and beforeLoop events to canvas

* fix: fixed playground experience
rafactor: renamed replaceCycleFunction to replaceLoopFunction

* fix: fixed some more playgrounds

* fixed some more playgrounds

* refactor!: renamed onBeforeRender to onBeforeLoop and onRender to onLoop
fix: fixed playgrounds

* fixed test

* refactor: tiny code styling improvement

* refactor: omitted export of useCreateRafLoop

* linting fixes

* refactor: tiny improvement for fbo demo

* refactor: rename fboRef to groupRef for clarity in FBO demo

* refactor: renamed onBeforeLoop back to onBeforeRender and onLoop back to onRender

* restored usage of orbit controls

* more restoring of orbitcontrols usages

* refactor: updated loop handling by renaming onLoop to onRender in TakeOverRenderExperience.vue and adjusted related emit definitions in TresCanvas.vue

* removed obsolete comment

### Features

* useLoop and useRenderLoop refactoring ([#1035](https://github.com/Tresjs/tres/issues/1035)) ([db65f3f](https://github.com/Tresjs/tres/commit/db65f3f1ea723048d6851ed52a445d80a0d26f09)), closes [#1039](https://github.com/Tresjs/tres/issues/1039)

## [5.0.0-next.3](https://github.com/Tresjs/tres/compare/5.0.0-next.2...5.0.0-next.3) (2025-06-15)

### Features

* expose render mode ([#1032](https://github.com/Tresjs/tres/issues/1032)) ([b5b9456](https://github.com/Tresjs/tres/commit/b5b94560fddcdcb65f3dec6692143867ed58914e))

## [5.0.0-next.2](https://github.com/Tresjs/tres/compare/5.0.0-next.1...5.0.0-next.2) (2025-06-15)

### ⚠ BREAKING CHANGES

* Only first element intersected wil trigger the pointer event, no more need to stop propagation on occlusion

* feat: get the context object tree with max 4 leves deep

* feat: enhance context node creation and graph building

- Updated `createContextNode` to include an optional `parentKey` parameter for better context chaining.
- Modified `buildContextGraph` to utilize the new `parentKey` for constructing chained keys during recursion.
- Added handling for context nodes in the inspector state, allowing for dynamic traversal of context objects based on chained keys.
- Improved readability and maintainability of the context graph logic.

* fix: improve scene object handling in Tres Devtools

- Enhanced the logic for extracting UUIDs from scene node IDs to ensure proper handling of scene objects.
- Updated the inspector state editing to reflect the new UUID extraction method, improving reliability when editing scene objects.
- Set the `editable` property to false for certain inspector values to prevent unintended modifications.

* fix: lint issue with fonts

* feat: implement inspector handlers for Tres Devtools

- Added `inspectorHandlers.ts` to manage inspector tree and state updates, enhancing the interaction with the Tres context.
- Introduced functions for creating nodes in the inspector tree, building graphs for scene and context objects, and handling state edits.
- Updated `TresCanvas.vue` to ensure proper context handling when registering Tres Devtools.
- Refactored `plugin.ts` to utilize the new inspector handlers, improving code organization and maintainability.
- Created type definitions in `types.ts` for better clarity and type safety in inspector-related functionalities.

* feat!(events): new event system based on pmdrs/pointer-events
* Only first element intersected wil trigger the pointer event, no more need to stop propagation on occlusion

* refactor: update event handler parameter naming for clarity

- Renamed the parameter in the onPointerMove function from 'ev' to '_ev' to indicate that it is intentionally unused, improving code readability.
- Removed unused import 'TresObject' from useTresContextProvider to clean up the codebase.

* refactor: update type imports and event handling in TresCanvas

- Replaced the Camera type with TresCamera in TresCanvasProps for better type specificity.
- Cleaned up imports in TresCanvas.vue by removing unused imports.
- Updated event handling in useEventManager to use pointerEventsMap for onClick, with a TODO for future type improvements.
- Modified handlers in LocalState to accept both PointerEventType and string for enhanced flexibility.
- Adjusted deregistration method in doRemoveDeregister to use context.events for consistency.

* refactor: update useTres composable to replace raycaster with events

- Modified the `useTres` composable to return `events` instead of `raycaster`, aligning with the updated context structure.
- Removed the `uuid` property from the `TresContext` interface and cleaned up unused imports in `useTresContextProvider`, enhancing code maintainability.

* refactor: update useLoop composable to replace raycaster with events

- Modified the `useLoop` composable to utilize `events` instead of `raycaster`, aligning with the recent changes in the Tres context structure.
- This change enhances the integration with the updated event system, ensuring better context handling during the rendering loop.

* wip

* separated event utils

* beautified types

* type fixes

* moved update call

* added todos

* omitted potential memory leak and callback calls of gone objects

* refactor: fixed onRender naming

* restored playground example

* Updated the `offPointerMissed` assignment to create a separate listener for each object, preventing unintended shared calls.

* improved comment

* renamed eventManager in context

* removed obsolete code

* chore: update @tresjs/cientos dependency to version 5.0.0-next.0 in package.json and playground/vue/package.json

* chore(playground): streamline event handling and remove unused Box component

- Removed the `stopPropagation` control logic from event handlers in `index.vue` to simplify the code.
- Updated event logging messages for consistency in `index.vue` and `groups/index.vue`.
- Enhanced the `TresGroup` component in `groups/index.vue` to include a new `@pointermissed` event handler.
- Deleted the unused `Box.vue` and `index.vue` files from the propagation directory to clean up the codebase.

* went back to "events"

* removed pointermissed from nodeops

* fixed emits of canvas compoennt

* cleaned up types

* tiny readability improvement

* eslint fix

* feat!(events): new event system based on pmdrs/pointer-events ([f201378](https://github.com/Tresjs/tres/commit/f2013783ea528b0a230b03ec3334640ad3dd0227))

### Features

* 982 refactor userenderer ([#1022](https://github.com/Tresjs/tres/issues/1022)) ([cc8b752](https://github.com/Tresjs/tres/commit/cc8b752b717ca20f3da58b1a1890c5da2473f1cf)), closes [#1028](https://github.com/Tresjs/tres/issues/1028)
* webgpu native support ([#1029](https://github.com/Tresjs/tres/issues/1029)) ([6f3d41d](https://github.com/Tresjs/tres/commit/6f3d41d1c73cb3113cd22321d9672a2907080652))
## [5.0.0-next.1](https://github.com/Tresjs/tres/compare/5.0.0-next.1...5.0.0-next.2) (2025-06-06)

### ⚠ BREAKING CHANGES

* - useTresReady is no longer available, it has been replaced by isReady in the renderer in the context
- onTresReady is no longer available. renderer.isReady should be leveraged instead

* chore: removed playground files concerning useTresReady

* chore: removed ready pages from playground routes

* feature: made isReady dependency clearer by leveraging triggerRef

* ˆ
* camera ctx property is now an object with the camera manager instead of the active camera

* fix: remove camera manual check

* chore: remove reset onUnmounted

Co-authored-by: Tino Koch <17991193+Tinoooo@users.noreply.github.com>

* chore: remove unused comment

Co-authored-by: Tino Koch <17991193+Tinoooo@users.noreply.github.com>

* chore: omit previous reordering of cameras

Co-authored-by: Tino Koch <17991193+Tinoooo@users.noreply.github.com>

* refactor: update camera handling to use Three.js Camera type

- Replaced instances of TresCamera with Three.js Camera type across the codebase for better compatibility and consistency.
- Updated camera management logic in useCamera composable and related components to reflect the new type.
- Simplified currentCamera logic to use computed properties instead of watch.

* refactor: enhance orthographic camera setup and controls

- Updated the orthographic camera initialization to correctly calculate frustum dimensions based on the aspect ratio.
- Introduced zoom functionality for the orthographic camera.
- Simplified the useControls setup by removing unnecessary properties and focusing on essential controls.
- Adjusted the camera update logic to reflect the new control structure, ensuring proper projection matrix updates.

* chore(playground): streamline camera implementation with TresJS components

- Removed manual camera initialization in favor of using TresJS components for perspective and orthographic cameras.
- Updated the template to conditionally render the appropriate camera based on the selected camera type.
- Enhanced readability and maintainability by leveraging TresJS's built-in camera properties and methods.

* refactor(playground): remove unused camera imports in index.vue

- Eliminated unused imports for OrthographicCamera and PerspectiveCamera from Three.js to streamline the code.
- This change enhances code clarity and reduces unnecessary dependencies, aligning with the recent updates to utilize TresJS components for camera management.
* `useTexture` composable has been refactored and moved to `@tresjs/cientos` package

- Deleted the `useTexture` composable and its associated files as it has been refactored and moved to the `@tresjs/cientos` package.
- Updated documentation to reflect the changes, including a warning about the deprecation and a link to the new `cientos` documentation for `useTexture`.
- Adjusted examples in the cookbook to utilize the new `useTexture` from `@tresjs/cientos`, ensuring users are directed to the correct implementation.

* fix: clean up texture loading examples in documentation

- Removed unnecessary line breaks and improved formatting in the `load-textures.md` documentation.
- Streamlined the example code for `TresMeshStandardMaterial` to enhance readability and maintain consistency with coding standards.

* docs: update composables documentation to reflect removal of useTexture

- Removed deprecated `useTexture` section from the documentation, indicating its refactor to the `@tresjs/cientos` package.
- Added a warning about the deprecation and provided a link to the new `cientos` documentation for user guidance.
- Ensured that the remaining documentation is clear and concise, maintaining consistency with the latest changes in the codebase.
* - useTresReady is no longer available, it has been replaced by isReady in the renderer in the context
- onTresReady is no longer available. renderer.isReady should be leveraged instead

* chore: removed playground files concerning useTresReady

* chore: removed ready pages from playground routes

* feature: made isReady dependency clearer by leveraging triggerRef
* - useRenderer now returns invalidate and advance
- useTresContextProvider no longer contains render state

* chore: removed internal renderer ref

* refactor!: the renderer instance is now returned from useRenderer, made renderer being wrapped inside the context
* - invalidate, advance, canBeInvalidated and the renderer instance are now accessed through the context via `renderer`
- the renderer instance in the context is now readonly

* refactor: removed one emit dependency

* tofo cleanup

* merge fix

* refactor: updated other parts to match structural changes

* worked around loop errors

* fixes concerning changes in playground

* updated english docs

* fix: wrong render mode in docs

* removed obsolete todo

* fix: added null check

* fix: removed deprecated toValue import

* feat: remove emit from useTresEventManager

* renamed type

* chore: got rid of emit concerning TresReady

* refactor!: removed emit from useTresContextProvider and useTresEventManager
* - the type `EmitEventName` is no longer exported from @tresjs/core
- the type `EmitEventFn` is no longer exported from @tresjs/core

* chore: restored renderer tyope in LoopCallbackWithCtx

* refactor: renamed useRenderer

* fix: test

* cleanup
* - useRenderer now returns invalidate and advance
- useTresContextProvider no longer contains render state

* chore: removed internal renderer ref

* refactor!: the renderer instance is now returned from useRenderer, made renderer being wrapped inside the context
* - invalidate, advance, canBeInvalidated and the renderer instance are now accessed through the context via `renderer`
- the renderer instance in the context is now readonly

* refactor: removed one emit dependency

* tofo cleanup

* merge fix

* refactor: updated other parts to match structural changes

* worked around loop errors

* fixes concerning changes in playground

* updated english docs

* fix: wrong render mode in docs

* removed obsolete todo

* fix: added null check

* fix: removed deprecated toValue import

* chore: restored renderer tyope in LoopCallbackWithCtx

* refactor: renamed useRenderer

* fix: test

* fix: lint fix
* `useSeek` is deprecated

- Marked the `useSeek` composable as deprecated in the documentation, indicating its removal in v5.0.0.
- Removed the `useSeek` composable implementation and its associated tests from the codebase to streamline the composables directory.
- Updated the documentation to reflect the deprecation status and provide guidance for users.

* Update docs/api/composables.md

Co-authored-by: Tino Koch <17991193+Tinoooo@users.noreply.github.com>

### Features

* 1012 add context inspector devtools ([#1013](https://github.com/Tresjs/tres/issues/1013)) ([ff6723c](https://github.com/Tresjs/tres/commit/ff6723cc7d91b229523220e7eb18d0e2b4a48efb))
* 986 remove usetexture ([#1008](https://github.com/Tresjs/tres/issues/1008)) ([041b697](https://github.com/Tresjs/tres/commit/041b697bf77ad7b7f70b7d3f2bdeed99c5149abb))
* deprecate useSeek composable and update documentation ([#990](https://github.com/Tresjs/tres/issues/990)) ([3d5ea13](https://github.com/Tresjs/tres/commit/3d5ea135911627ae3c9d4609c83f646a9cd793a9))
* introduce useTres composable and update related documentation ([#1017](https://github.com/Tresjs/tres/issues/1017)) ([fd03f72](https://github.com/Tresjs/tres/commit/fd03f7241e9345f670ab64967007a40e3c1d80cd))

### Bug Fixes

* add initial value support to useLoader([#1007](https://github.com/Tresjs/tres/issues/1007)) ([be3280b](https://github.com/Tresjs/tres/commit/be3280b01185358558cd91aa7cfca4bc7a1507e8))
* added forgotten ready emit ([8b97e85](https://github.com/Tresjs/tres/commit/8b97e850d19a9bba4dc1353e796859d209539fbe))

### Code Refactoring

* 979 move renderer logic from usetrescontextprovider to userenderer 2 ([#993](https://github.com/Tresjs/tres/issues/993)) ([36bcb1c](https://github.com/Tresjs/tres/commit/36bcb1c0c2e1ca97d09240bff2ce46d8da43896c))
* 992 removal of emit from usetrescontextprovider composable ([#999](https://github.com/Tresjs/tres/issues/999)) ([090adf3](https://github.com/Tresjs/tres/commit/090adf30774daa90c1fef710b00cbac5480c0b94))
* context camera is now a state ([#1004](https://github.com/Tresjs/tres/issues/1004)) ([d5daf5d](https://github.com/Tresjs/tres/commit/d5daf5dace31e27f293c49506302e3fa0c93483a)), closes [#1009](https://github.com/Tresjs/tres/issues/1009)
* removal of performance state from useTresContextProvider ([#1003](https://github.com/Tresjs/tres/issues/1003)) ([79edf43](https://github.com/Tresjs/tres/commit/79edf431f61b5bd6876bc248ce88b8dcf220b64b))
* removed useTresReady, added isReady to the renderer in the… ([#1000](https://github.com/Tresjs/tres/issues/1000)) ([ff35bfc](https://github.com/Tresjs/tres/commit/ff35bfce4964bb884faa0b3258f7f3a5450ec69c))
## [5.0.0-next.0](https://github.com/Tresjs/tres/compare/5.0.0-next.1...5.0.0-next.2) (2025-04-12)

### ⚠ BREAKING CHANGES

* **loader:** useLoader no longer returns the plain obj, it now returns and object with reactive data (resource|s), isLoading, error) and a load method, can be used both sync and async (suspense)

- Added `useLoader` composable for loading resources with THREE.js, supporting single and multiple resource loading, loading state tracking, and error handling.
- Created comprehensive documentation for `useLoader`, detailing its features, usage examples, and API reference.
- Updated various playground components to utilize the new `useLoader` composable for loading GLTF and FBX models.
- Added new demo pages for loading multiple models and using the `UseLoader` component in templates.

* chore(loader): simplify useLoader implementation and clean up imports

- Updated the `UseLoader` component in documentation to remove unnecessary destructuring of the slot props.
- Cleaned up imports in `BlenderCube.vue`, `Suzanne.vue`, and `TheExperience.vue` by removing unused types.
- Added eslint-disable comments for console logging in `Suzanne.vue` and `TheExperience.vue` to improve code readability while debugging.

* feat: useGraph to generate named object material collections

* feat: useAsyncState for useLoader

- Added documentation for the `useLoader` composable, detailing its features, usage examples, and API reference.
- Updated the navigation in the VitePress configuration to include a link to the new `useLoader` documentation.
- Enhanced the `useLoader` composable to support better type safety and resource management.
- Removed the `Suzanne.vue` component as part of the cleanup process.

* feat: enhance useLoader and useGraph composables

- Updated the `useLoader` composable to improve type safety and support loading textures alongside models.
- Refactored the `useGraph` composable to accept both Object3D and TresObject types, enhancing its flexibility.
- Added new examples and documentation for loading multiple models and textures, including progress tracking.
- Cleaned up and organized playground components to demonstrate the new features effectively.

* refactor(useLoader.test): clean up imports by removing unused `nextTick` import

- Removed the unused `nextTick` import from the `useLoader.test.ts` file to streamline the code and improve readability.

* docs: remove trailing spaces in team.md for consistency

- Cleaned up trailing spaces in the `team.md` file to improve code consistency and readability.

* fix(graph): export also types from graph utils

* refactor(index.ts): remove unused export of buildGraph

- Removed the unused `buildGraph` export from `index.ts` to streamline the code and improve maintainability.

* feat: enhance resources loading with progress tracking

- Enhanced the `useLoader` composable to return progress information, allowing for better user feedback during model loading.
- Updated `TheModel.vue` to utilize the new progress tracking feature from the `useLoader` composable.
- Removed the unused `LoadingManager` and integrated progress updates directly into the component's state.
- Updated docs

* feat: added tests to load and progress
* Tres is now ESM only

- Removed UMD build configuration from package.json and adjusted exports to only include ES module.
- Updated vite.config.ts to specify the output format as ES, enhancing compatibility with modern module systems.

### Features

* 974-createsetup-devtools ([#975](https://github.com/Tresjs/tres/issues/975)) ([1d83f7b](https://github.com/Tresjs/tres/commit/1d83f7b96e0f0c6b20a3c42a03599f86211e051f))
* **deps:** update @vue/devtools-api and @tresjs/cientos dependencies ([#977](https://github.com/Tresjs/tres/issues/977)) ([4793f6b](https://github.com/Tresjs/tres/commit/4793f6b0cabd0a233e9008bd3b45fcef6c133945))
* **loader:** refactor useLoader to a true composable ([#959](https://github.com/Tresjs/tres/issues/959)) ([430837f](https://github.com/Tresjs/tres/commit/430837f1aeeddb4f17620efb13975c23e0f67d6c))
* update package.json and vite.config.ts for build configuration ([#960](https://github.com/Tresjs/tres/issues/960)) ([96a96f4](https://github.com/Tresjs/tres/commit/96a96f48a4b0097c34b2edb36babf745e97a9a6f))

### Bug Fixes

* export logger utility from utils in index.ts ([#966](https://github.com/Tresjs/tres/issues/966)) ([bb0b9e2](https://github.com/Tresjs/tres/commit/bb0b9e2f3843d2bd27cd46cfe982f433dca013b4))
## [4.3.6](https://github.com/Tresjs/tres/compare/5.0.0-next.1...5.0.0-next.2) (2025-06-06)

## [5.0.0-next.1](https://github.com/Tresjs/tres/compare/5.0.0-next.0...5.0.0-next.1) (2025-06-06)

### ⚠ BREAKING CHANGES

* - useTresReady is no longer available, it has been replaced by isReady in the renderer in the context
- onTresReady is no longer available. renderer.isReady should be leveraged instead

* chore: removed playground files concerning useTresReady

* chore: removed ready pages from playground routes

* feature: made isReady dependency clearer by leveraging triggerRef

* ˆ
* camera ctx property is now an object with the camera manager instead of the active camera

* fix: remove camera manual check

* chore: remove reset onUnmounted

Co-authored-by: Tino Koch <17991193+Tinoooo@users.noreply.github.com>

* chore: remove unused comment

Co-authored-by: Tino Koch <17991193+Tinoooo@users.noreply.github.com>

* chore: omit previous reordering of cameras

Co-authored-by: Tino Koch <17991193+Tinoooo@users.noreply.github.com>

* refactor: update camera handling to use Three.js Camera type

- Replaced instances of TresCamera with Three.js Camera type across the codebase for better compatibility and consistency.
- Updated camera management logic in useCamera composable and related components to reflect the new type.
- Simplified currentCamera logic to use computed properties instead of watch.

* refactor: enhance orthographic camera setup and controls

- Updated the orthographic camera initialization to correctly calculate frustum dimensions based on the aspect ratio.
- Introduced zoom functionality for the orthographic camera.
- Simplified the useControls setup by removing unnecessary properties and focusing on essential controls.
- Adjusted the camera update logic to reflect the new control structure, ensuring proper projection matrix updates.

* chore(playground): streamline camera implementation with TresJS components

- Removed manual camera initialization in favor of using TresJS components for perspective and orthographic cameras.
- Updated the template to conditionally render the appropriate camera based on the selected camera type.
- Enhanced readability and maintainability by leveraging TresJS's built-in camera properties and methods.

* refactor(playground): remove unused camera imports in index.vue

- Eliminated unused imports for OrthographicCamera and PerspectiveCamera from Three.js to streamline the code.
- This change enhances code clarity and reduces unnecessary dependencies, aligning with the recent updates to utilize TresJS components for camera management.
* `useTexture` composable has been refactored and moved to `@tresjs/cientos` package

- Deleted the `useTexture` composable and its associated files as it has been refactored and moved to the `@tresjs/cientos` package.
- Updated documentation to reflect the changes, including a warning about the deprecation and a link to the new `cientos` documentation for `useTexture`.
- Adjusted examples in the cookbook to utilize the new `useTexture` from `@tresjs/cientos`, ensuring users are directed to the correct implementation.

* fix: clean up texture loading examples in documentation

- Removed unnecessary line breaks and improved formatting in the `load-textures.md` documentation.
- Streamlined the example code for `TresMeshStandardMaterial` to enhance readability and maintain consistency with coding standards.

* docs: update composables documentation to reflect removal of useTexture

- Removed deprecated `useTexture` section from the documentation, indicating its refactor to the `@tresjs/cientos` package.
- Added a warning about the deprecation and provided a link to the new `cientos` documentation for user guidance.
- Ensured that the remaining documentation is clear and concise, maintaining consistency with the latest changes in the codebase.
* - useTresReady is no longer available, it has been replaced by isReady in the renderer in the context
- onTresReady is no longer available. renderer.isReady should be leveraged instead

* chore: removed playground files concerning useTresReady

* chore: removed ready pages from playground routes

* feature: made isReady dependency clearer by leveraging triggerRef
* - useRenderer now returns invalidate and advance
- useTresContextProvider no longer contains render state

* chore: removed internal renderer ref

* refactor!: the renderer instance is now returned from useRenderer, made renderer being wrapped inside the context
* - invalidate, advance, canBeInvalidated and the renderer instance are now accessed through the context via `renderer`
- the renderer instance in the context is now readonly

* refactor: removed one emit dependency

* tofo cleanup

* merge fix

* refactor: updated other parts to match structural changes

* worked around loop errors

* fixes concerning changes in playground

* updated english docs

* fix: wrong render mode in docs

* removed obsolete todo

* fix: added null check

* fix: removed deprecated toValue import

* feat: remove emit from useTresEventManager

* renamed type

* chore: got rid of emit concerning TresReady

* refactor!: removed emit from useTresContextProvider and useTresEventManager
* - the type `EmitEventName` is no longer exported from @tresjs/core
- the type `EmitEventFn` is no longer exported from @tresjs/core

* chore: restored renderer tyope in LoopCallbackWithCtx

* refactor: renamed useRenderer

* fix: test

* cleanup
* - useRenderer now returns invalidate and advance
- useTresContextProvider no longer contains render state

* chore: removed internal renderer ref

* refactor!: the renderer instance is now returned from useRenderer, made renderer being wrapped inside the context
* - invalidate, advance, canBeInvalidated and the renderer instance are now accessed through the context via `renderer`
- the renderer instance in the context is now readonly

* refactor: removed one emit dependency

* tofo cleanup

* merge fix

* refactor: updated other parts to match structural changes

* worked around loop errors

* fixes concerning changes in playground

* updated english docs

* fix: wrong render mode in docs

* removed obsolete todo

* fix: added null check

* fix: removed deprecated toValue import

* chore: restored renderer tyope in LoopCallbackWithCtx

* refactor: renamed useRenderer

* fix: test

* fix: lint fix
* `useSeek` is deprecated

- Marked the `useSeek` composable as deprecated in the documentation, indicating its removal in v5.0.0.
- Removed the `useSeek` composable implementation and its associated tests from the codebase to streamline the composables directory.
- Updated the documentation to reflect the deprecation status and provide guidance for users.

* Update docs/api/composables.md

Co-authored-by: Tino Koch <17991193+Tinoooo@users.noreply.github.com>

### Features

* 1012 add context inspector devtools ([#1013](https://github.com/Tresjs/tres/issues/1013)) ([ff6723c](https://github.com/Tresjs/tres/commit/ff6723cc7d91b229523220e7eb18d0e2b4a48efb))
* 986 remove usetexture ([#1008](https://github.com/Tresjs/tres/issues/1008)) ([041b697](https://github.com/Tresjs/tres/commit/041b697bf77ad7b7f70b7d3f2bdeed99c5149abb))
* deprecate useSeek composable and update documentation ([#990](https://github.com/Tresjs/tres/issues/990)) ([3d5ea13](https://github.com/Tresjs/tres/commit/3d5ea135911627ae3c9d4609c83f646a9cd793a9))
* introduce useTres composable and update related documentation ([#1017](https://github.com/Tresjs/tres/issues/1017)) ([fd03f72](https://github.com/Tresjs/tres/commit/fd03f7241e9345f670ab64967007a40e3c1d80cd))

### Bug Fixes

* add initial value support to useLoader([#1007](https://github.com/Tresjs/tres/issues/1007)) ([be3280b](https://github.com/Tresjs/tres/commit/be3280b01185358558cd91aa7cfca4bc7a1507e8))
* added forgotten ready emit ([8b97e85](https://github.com/Tresjs/tres/commit/8b97e850d19a9bba4dc1353e796859d209539fbe))

### Code Refactoring

* 979 move renderer logic from usetrescontextprovider to userenderer 2 ([#993](https://github.com/Tresjs/tres/issues/993)) ([36bcb1c](https://github.com/Tresjs/tres/commit/36bcb1c0c2e1ca97d09240bff2ce46d8da43896c))
* 992 removal of emit from usetrescontextprovider composable ([#999](https://github.com/Tresjs/tres/issues/999)) ([090adf3](https://github.com/Tresjs/tres/commit/090adf30774daa90c1fef710b00cbac5480c0b94))
* context camera is now a state ([#1004](https://github.com/Tresjs/tres/issues/1004)) ([d5daf5d](https://github.com/Tresjs/tres/commit/d5daf5dace31e27f293c49506302e3fa0c93483a)), closes [#1009](https://github.com/Tresjs/tres/issues/1009)
* removal of performance state from useTresContextProvider ([#1003](https://github.com/Tresjs/tres/issues/1003)) ([79edf43](https://github.com/Tresjs/tres/commit/79edf431f61b5bd6876bc248ce88b8dcf220b64b))
* removed useTresReady, added isReady to the renderer in the… ([#1000](https://github.com/Tresjs/tres/issues/1000)) ([ff35bfc](https://github.com/Tresjs/tres/commit/ff35bfce4964bb884faa0b3258f7f3a5450ec69c))
## [5.0.0-next.0](https://github.com/Tresjs/tres/compare/5.0.0-next.0...5.0.0-next.1) (2025-04-12)

### ⚠ BREAKING CHANGES

* **loader:** useLoader no longer returns the plain obj, it now returns and object with reactive data (resource|s), isLoading, error) and a load method, can be used both sync and async (suspense)

- Added `useLoader` composable for loading resources with THREE.js, supporting single and multiple resource loading, loading state tracking, and error handling.
- Created comprehensive documentation for `useLoader`, detailing its features, usage examples, and API reference.
- Updated various playground components to utilize the new `useLoader` composable for loading GLTF and FBX models.
- Added new demo pages for loading multiple models and using the `UseLoader` component in templates.

* chore(loader): simplify useLoader implementation and clean up imports

- Updated the `UseLoader` component in documentation to remove unnecessary destructuring of the slot props.
- Cleaned up imports in `BlenderCube.vue`, `Suzanne.vue`, and `TheExperience.vue` by removing unused types.
- Added eslint-disable comments for console logging in `Suzanne.vue` and `TheExperience.vue` to improve code readability while debugging.

* feat: useGraph to generate named object material collections

* feat: useAsyncState for useLoader

- Added documentation for the `useLoader` composable, detailing its features, usage examples, and API reference.
- Updated the navigation in the VitePress configuration to include a link to the new `useLoader` documentation.
- Enhanced the `useLoader` composable to support better type safety and resource management.
- Removed the `Suzanne.vue` component as part of the cleanup process.

* feat: enhance useLoader and useGraph composables

- Updated the `useLoader` composable to improve type safety and support loading textures alongside models.
- Refactored the `useGraph` composable to accept both Object3D and TresObject types, enhancing its flexibility.
- Added new examples and documentation for loading multiple models and textures, including progress tracking.
- Cleaned up and organized playground components to demonstrate the new features effectively.

* refactor(useLoader.test): clean up imports by removing unused `nextTick` import

- Removed the unused `nextTick` import from the `useLoader.test.ts` file to streamline the code and improve readability.

* docs: remove trailing spaces in team.md for consistency

- Cleaned up trailing spaces in the `team.md` file to improve code consistency and readability.

* fix(graph): export also types from graph utils

* refactor(index.ts): remove unused export of buildGraph

- Removed the unused `buildGraph` export from `index.ts` to streamline the code and improve maintainability.

* feat: enhance resources loading with progress tracking

- Enhanced the `useLoader` composable to return progress information, allowing for better user feedback during model loading.
- Updated `TheModel.vue` to utilize the new progress tracking feature from the `useLoader` composable.
- Removed the unused `LoadingManager` and integrated progress updates directly into the component's state.
- Updated docs

* feat: added tests to load and progress
* Tres is now ESM only

- Removed UMD build configuration from package.json and adjusted exports to only include ES module.
- Updated vite.config.ts to specify the output format as ES, enhancing compatibility with modern module systems.

### Features

* 974-createsetup-devtools ([#975](https://github.com/Tresjs/tres/issues/975)) ([1d83f7b](https://github.com/Tresjs/tres/commit/1d83f7b96e0f0c6b20a3c42a03599f86211e051f))
* **deps:** update @vue/devtools-api and @tresjs/cientos dependencies ([#977](https://github.com/Tresjs/tres/issues/977)) ([4793f6b](https://github.com/Tresjs/tres/commit/4793f6b0cabd0a233e9008bd3b45fcef6c133945))
* **loader:** refactor useLoader to a true composable ([#959](https://github.com/Tresjs/tres/issues/959)) ([430837f](https://github.com/Tresjs/tres/commit/430837f1aeeddb4f17620efb13975c23e0f67d6c))
* update package.json and vite.config.ts for build configuration ([#960](https://github.com/Tresjs/tres/issues/960)) ([96a96f4](https://github.com/Tresjs/tres/commit/96a96f48a4b0097c34b2edb36babf745e97a9a6f))

### Bug Fixes

* export logger utility from utils in index.ts ([#966](https://github.com/Tresjs/tres/issues/966)) ([bb0b9e2](https://github.com/Tresjs/tres/commit/bb0b9e2f3843d2bd27cd46cfe982f433dca013b4))
## [4.3.5](https://github.com/Tresjs/tres/compare/5.0.0-next.0...5.0.0-next.1) (2025-05-16)

### Bug Fixes

* make sure key is camelCase when reached else on conditional ([#1011](https://github.com/Tresjs/tres/issues/1011)) ([2902d05](https://github.com/Tresjs/tres/commit/2902d05c600b0e2b02738d0ab5af292b4d75cc35))
## [4.3.4](https://github.com/Tresjs/tres/compare/5.0.0-next.0...5.0.0-next.1) (2025-05-13)

### Bug Fixes

* **patchProp:** harden props inference ([#1006](https://github.com/Tresjs/tres/issues/1006)) ([6cdf28b](https://github.com/Tresjs/tres/commit/6cdf28b73a246b935f0b58a8b759a0aa1b925ff6))

## [5.0.0-next.0](https://github.com/Tresjs/tres/compare/4.3.3...5.0.0-next.0) (2025-04-12)

### ⚠ BREAKING CHANGES

* **loader:** useLoader no longer returns the plain obj, it now returns and object with reactive data (resource|s), isLoading, error) and a load method, can be used both sync and async (suspense)

- Added `useLoader` composable for loading resources with THREE.js, supporting single and multiple resource loading, loading state tracking, and error handling.
- Created comprehensive documentation for `useLoader`, detailing its features, usage examples, and API reference.
- Updated various playground components to utilize the new `useLoader` composable for loading GLTF and FBX models.
- Added new demo pages for loading multiple models and using the `UseLoader` component in templates.

* chore(loader): simplify useLoader implementation and clean up imports

- Updated the `UseLoader` component in documentation to remove unnecessary destructuring of the slot props.
- Cleaned up imports in `BlenderCube.vue`, `Suzanne.vue`, and `TheExperience.vue` by removing unused types.
- Added eslint-disable comments for console logging in `Suzanne.vue` and `TheExperience.vue` to improve code readability while debugging.

* feat: useGraph to generate named object material collections

* feat: useAsyncState for useLoader

- Added documentation for the `useLoader` composable, detailing its features, usage examples, and API reference.
- Updated the navigation in the VitePress configuration to include a link to the new `useLoader` documentation.
- Enhanced the `useLoader` composable to support better type safety and resource management.
- Removed the `Suzanne.vue` component as part of the cleanup process.

* feat: enhance useLoader and useGraph composables

- Updated the `useLoader` composable to improve type safety and support loading textures alongside models.
- Refactored the `useGraph` composable to accept both Object3D and TresObject types, enhancing its flexibility.
- Added new examples and documentation for loading multiple models and textures, including progress tracking.
- Cleaned up and organized playground components to demonstrate the new features effectively.

* refactor(useLoader.test): clean up imports by removing unused `nextTick` import

- Removed the unused `nextTick` import from the `useLoader.test.ts` file to streamline the code and improve readability.

* docs: remove trailing spaces in team.md for consistency

- Cleaned up trailing spaces in the `team.md` file to improve code consistency and readability.

* fix(graph): export also types from graph utils

* refactor(index.ts): remove unused export of buildGraph

- Removed the unused `buildGraph` export from `index.ts` to streamline the code and improve maintainability.

* feat: enhance resources loading with progress tracking

- Enhanced the `useLoader` composable to return progress information, allowing for better user feedback during model loading.
- Updated `TheModel.vue` to utilize the new progress tracking feature from the `useLoader` composable.
- Removed the unused `LoadingManager` and integrated progress updates directly into the component's state.
- Updated docs

* feat: added tests to load and progress
* Tres is now ESM only

- Removed UMD build configuration from package.json and adjusted exports to only include ES module.
- Updated vite.config.ts to specify the output format as ES, enhancing compatibility with modern module systems.

### Features

* 974-createsetup-devtools ([#975](https://github.com/Tresjs/tres/issues/975)) ([1d83f7b](https://github.com/Tresjs/tres/commit/1d83f7b96e0f0c6b20a3c42a03599f86211e051f))
* **deps:** update @vue/devtools-api and @tresjs/cientos dependencies ([#977](https://github.com/Tresjs/tres/issues/977)) ([4793f6b](https://github.com/Tresjs/tres/commit/4793f6b0cabd0a233e9008bd3b45fcef6c133945))
* **loader:** refactor useLoader to a true composable ([#959](https://github.com/Tresjs/tres/issues/959)) ([430837f](https://github.com/Tresjs/tres/commit/430837f1aeeddb4f17620efb13975c23e0f67d6c))
* update package.json and vite.config.ts for build configuration ([#960](https://github.com/Tresjs/tres/issues/960)) ([96a96f4](https://github.com/Tresjs/tres/commit/96a96f48a4b0097c34b2edb36babf745e97a9a6f))

### Bug Fixes

* export logger utility from utils in index.ts ([#966](https://github.com/Tresjs/tres/issues/966)) ([bb0b9e2](https://github.com/Tresjs/tres/commit/bb0b9e2f3843d2bd27cd46cfe982f433dca013b4))
## [4.3.6](https://github.com/Tresjs/tres/compare/4.3.5...4.3.6) (2025-06-06)

## [4.3.5](https://github.com/Tresjs/tres/compare/4.3.4...4.3.5) (2025-05-16)

### Bug Fixes

* make sure key is camelCase when reached else on conditional ([#1011](https://github.com/Tresjs/tres/issues/1011)) ([2902d05](https://github.com/Tresjs/tres/commit/2902d05c600b0e2b02738d0ab5af292b4d75cc35))

## [4.3.4](https://github.com/Tresjs/tres/compare/4.3.3...4.3.4) (2025-05-13)

### Bug Fixes

* **patchProp:** harden props inference ([#1006](https://github.com/Tresjs/tres/issues/1006)) ([6cdf28b](https://github.com/Tresjs/tres/commit/6cdf28b73a246b935f0b58a8b759a0aa1b925ff6))
* revert improve type safety in retargeting proxy setter ([#930](https://github.com/Tresjs/tres/issues/930)) ([0a95764](https://github.com/Tresjs/tres/commit/0a95764ac47b93d58fd0668327658fe4aae53783))

### Reverts

* Revert "fix: improve typing pixel ratio handling in setPixelRatio utility" (#929) ([9e76010](https://github.com/Tresjs/tres/commit/9e76010d46e1b70a6af6f1cb3eb07a4b888873fc)), closes [#929](https://github.com/Tresjs/tres/issues/929)

## [4.3.3](https://github.com/Tresjs/tres/compare/4.3.2...4.3.3) (2025-02-06)

### Bug Fixes

* remove camera warning log on default camera creation ([#916](https://github.com/Tresjs/tres/issues/916)) ([5d490b4](https://github.com/Tresjs/tres/commit/5d490b4989ed68ff81569398d5b1fe8f09cddea0))
* safely remove helpers in vDistanceTo and vLightHelper directives ([#919](https://github.com/Tresjs/tres/issues/919)) ([f512b1a](https://github.com/Tresjs/tres/commit/f512b1a129f3740337c813f3a9cd79355356e043))
* typescript build issues utils ([#924](https://github.com/Tresjs/tres/issues/924)) ([e9b7bf9](https://github.com/Tresjs/tres/commit/e9b7bf97f7561aaa7dba9eae46954278a04ab017))

## [4.3.2](https://github.com/Tresjs/tres/compare/4.3.1...4.3.2) (2025-01-03)

### Features

* extend GlobalComponents interface to include 'primitive' component type ([#896](https://github.com/Tresjs/tres/issues/896)) ([b78a6ff](https://github.com/Tresjs/tres/commit/b78a6ffabc4542dcc08d430e34c3dd2d5a9adaeb))
* update deps 20 12 24 ([#887](https://github.com/Tresjs/tres/issues/887)) ([d377750](https://github.com/Tresjs/tres/commit/d377750b01ee27d70fc29b5faedf6257b22ebfdf))

### Bug Fixes

* Add missing </UseLoader> closing tag. ([#881](https://github.com/Tresjs/tres/issues/881)) ([e16ea32](https://github.com/Tresjs/tres/commit/e16ea3248674adf80131a7a493c10b583a6e25a8))
* **function typo:** fix typo in function name in composable ([#858](https://github.com/Tresjs/tres/issues/858)) ([c186232](https://github.com/Tresjs/tres/commit/c186232f180f8caa9a39a0a2ae4b1c6b30725e46))

## [4.3.1](https://github.com/Tresjs/tres/compare/4.3.0...4.3.1) (2024-10-13)

### Bug Fixes

* 849 support Symbol keys in provide/inject ([#850](https://github.com/Tresjs/tres/issues/850)) ([35125ce](https://github.com/Tresjs/tres/commit/35125cecda55333bac542ed473bcddd2f7925c2b))

## [4.3.0](https://github.com/Tresjs/tres/compare/4.2.10...4.3.0) (2024-09-30)


### Features

* add UseLoader component ([471bd0d](https://github.com/Tresjs/tres/commit/471bd0d16fe496a0e5e6a71a62c93093c73ce834))
* **app:** 680 UseTexture composable as component ([#757](https://github.com/Tresjs/tres/issues/757)) ([f01a897](https://github.com/Tresjs/tres/commit/f01a897bcc9352e6a4cb1ac03e204f08b51f6b6c))
* pass all provides down to custom renderer ([#806](https://github.com/Tresjs/tres/issues/806)) ([b4a3866](https://github.com/Tresjs/tres/commit/b4a3866f69e0c19339d7746a392f9d92569234d8))


### Bug Fixes

* eslint ([2ccd6c4](https://github.com/Tresjs/tres/commit/2ccd6c4104dd358e1a600a1e688d9a2c119611ab))
* lint ([f71eb37](https://github.com/Tresjs/tres/commit/f71eb37648e806f4ce0a97de0d58c6bde8e43252))
* lint ([8f18558](https://github.com/Tresjs/tres/commit/8f18558087136d7fbc68394d1069bf4a46d76fb9))
* rollback to v6 of `@vue/devtools-api` ([#846](https://github.com/Tresjs/tres/issues/846)) ([fd3b599](https://github.com/Tresjs/tres/commit/fd3b59975f63d13ba79c824252563debc048b9d2))
* type for useloader component props ([a4bd590](https://github.com/Tresjs/tres/commit/a4bd590776825b74188dc601b64caf59d33c7284))


### Reverts

* **nodeOps:** add check for null props ([#829](https://github.com/Tresjs/tres/issues/829)) ([04b001b](https://github.com/Tresjs/tres/commit/04b001b8edadf1ec03ce1351af1334a0746fbb3e))
* **useRenderer:** add rendererPresets import ([#839](https://github.com/Tresjs/tres/issues/839)) ([f944647](https://github.com/Tresjs/tres/commit/f944647ad4d363b80def0e61e9cdd106e03b7e94))

## [4.2.10](https://github.com/Tresjs/tres/compare/4.2.9...4.2.10) (2024-09-04)


### Bug Fixes

* 785 vscode intellisense autocompletion not getting tres components props ([#809](https://github.com/Tresjs/tres/issues/809)) ([66c7ab5](https://github.com/Tresjs/tres/commit/66c7ab5122e28714d73278b679df8169ac47f9f9))

## [4.2.9](https://github.com/Tresjs/tres/compare/4.2.8...4.2.9) (2024-08-30)


### Bug Fixes

* **useLoader:** remove array related logic for loaders ([#808](https://github.com/Tresjs/tres/issues/808)) ([88cef1e](https://github.com/Tresjs/tres/commit/88cef1e0ab454f97c8e55c86ec48e53d326be59e))

## [4.2.8](https://github.com/Tresjs/tres/compare/4.2.7...4.2.8) (2024-08-30)


### Bug Fixes

* use CubeTextureLoader correctly with array of files ([#807](https://github.com/Tresjs/tres/issues/807)) ([38f05b0](https://github.com/Tresjs/tres/commit/38f05b03d7d2b9934f8893a5f4858b09b7188782))

## [4.2.7](https://github.com/Tresjs/tres/compare/4.2.6...4.2.7) (2024-08-19)

## [4.2.6](https://github.com/Tresjs/tres/compare/4.2.5...4.2.6) (2024-08-15)


### Bug Fixes

* 796 unmount the canvas component instant mount children again even if canvas is not mounted ([#799](https://github.com/Tresjs/tres/issues/799)) ([9a20b52](https://github.com/Tresjs/tres/commit/9a20b52b2c7efc712a22fa78f290f148ce566d35))

## [4.2.5](https://github.com/Tresjs/tres/compare/4.2.4...4.2.5) (2024-08-01)


### Bug Fixes

* **types:** added Ref type to controls on ctx ([415de94](https://github.com/Tresjs/tres/commit/415de9461c39f46eed37c2a0663099dc4d3325e2))

## [4.2.4](https://github.com/Tresjs/tres/compare/4.2.3...4.2.4) (2024-08-01)


### Bug Fixes

* typescript issues ([#794](https://github.com/Tresjs/tres/issues/794)) ([eecf608](https://github.com/Tresjs/tres/commit/eecf608ad1bfb7d4cbe64cf275a356a8dd383b73))

## [4.2.3](https://github.com/Tresjs/tres/compare/4.2.2...4.2.3) (2024-07-26)


### Bug Fixes

* 792 directionallighthelpers breaks devtools ([#793](https://github.com/Tresjs/tres/issues/793)) ([426acee](https://github.com/Tresjs/tres/commit/426acee27e7fd62abf3803280c48e327597b1e94)), closes [#533](https://github.com/Tresjs/tres/issues/533)

## [4.2.2](https://github.com/Tresjs/tres/compare/4.2.1...4.2.2) (2024-07-24)


### Bug Fixes

* remove on demand invalidation warning ([#788](https://github.com/Tresjs/tres/issues/788)) ([eab74e6](https://github.com/Tresjs/tres/commit/eab74e6d0c8feb16ea18b2f096c87c7e3dbb1848))

## [4.2.1](https://github.com/Tresjs/tres/compare/4.2.0...4.2.1) (2024-07-17)


### Bug Fixes

* **types:** `useLoader` generics ([#781](https://github.com/Tresjs/tres/issues/781)) ([b51d679](https://github.com/Tresjs/tres/commit/b51d6792372922904cd9225c2ea2e5dfce6f68f8))

## [4.2.0](https://github.com/Tresjs/tres/compare/4.1.0...4.2.0) (2024-07-14)


### Features

* (devtools) add userData to inspectable properties ([#740](https://github.com/Tresjs/tres/issues/740)) ([00bef33](https://github.com/Tresjs/tres/commit/00bef337f189b04ee3b77a4ce0afea63ce2973b2))
* **TresCanvas:** add dpr prop ([#768](https://github.com/Tresjs/tres/issues/768)) ([8943cc3](https://github.com/Tresjs/tres/commit/8943cc3dac1571e4bc15fb75ad106908b109de43))


### Bug Fixes

* attach detach ([#749](https://github.com/Tresjs/tres/issues/749)) ([8c1c668](https://github.com/Tresjs/tres/commit/8c1c66827cf39dca1206bfbf0fe3549e03ad9608))
* localstate for objects with events and manual register/unregister from nodeOps using ctx ([#767](https://github.com/Tresjs/tres/issues/767)) ([9a53e60](https://github.com/Tresjs/tres/commit/9a53e60bfb915492952399522d6c2d6a0ac7ed59))
* **primitive:** implement as proxy to avoid breaking references  ([#764](https://github.com/Tresjs/tres/issues/764)) ([f637bf3](https://github.com/Tresjs/tres/commit/f637bf35373c4ba60f14b3464ede9427be8b8b58))

## [4.1.0](https://github.com/Tresjs/tres/compare/4.0.2...4.1.0) (2024-07-05)


### Features

* add useTresReady ([#712](https://github.com/Tresjs/tres/issues/712)) ([15e3f07](https://github.com/Tresjs/tres/commit/15e3f0785e843df7a68e095c8ec35d8752623a05))


### Bug Fixes

* **deps:** update dependency @vueuse/core to v10.10.1 ([#735](https://github.com/Tresjs/tres/issues/735)) ([12e462d](https://github.com/Tresjs/tres/commit/12e462d2abb0205e416cadd5f9eab50afd501fd3))
* group should recursive search for child elements ([#728](https://github.com/Tresjs/tres/issues/728)) ([#731](https://github.com/Tresjs/tres/issues/731)) ([f09367b](https://github.com/Tresjs/tres/commit/f09367b47b59c9b60eaafa318023187111ddb786))

## [4.0.2](https://github.com/Tresjs/tres/compare/4.0.1...4.0.2) (2024-06-05)


### Bug Fixes

* implement createComment and nextSibling node operations so that objects being v-if'd are not lost by Vue's runtime and incorrectly placed in the scene root ([814d678](https://github.com/Tresjs/tres/commit/814d678b62f7d9b4ed11149aaf56a45ea5c04dad))
* intersect only objects with events registered. ([#714](https://github.com/Tresjs/tres/issues/714)) ([b320524](https://github.com/Tresjs/tres/commit/b3205245e3d0b9ceda7cd356bced004358b58856))
* propogate events over previous intersections on pointerLeave and pointerOut ([66264fc](https://github.com/Tresjs/tres/commit/66264fc49cd21bbde7288256409ec5a688309946))

## [4.0.1](https://github.com/Tresjs/tres/compare/4.0.0...4.0.1) (2024-06-01)


### Bug Fixes

* augmenting types for tres components for the nuxt module ([#710](https://github.com/Tresjs/tres/issues/710)) ([c8a5b0d](https://github.com/Tresjs/tres/commit/c8a5b0dcf8ebd6bf4284126042e8a44eae3ca307))

## [4.0.0](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0) (2024-05-30)


### Features

* release v4 ([#490](https://github.com/Tresjs/tres/issues/490)) ([1ba17ee](https://github.com/Tresjs/tres/commit/1ba17ee43c6954396118bd8298436af3e2a70510)), closes [#479](https://github.com/Tresjs/tres/issues/479) [#488](https://github.com/Tresjs/tres/issues/488) [#491](https://github.com/Tresjs/tres/issues/491) [#497](https://github.com/Tresjs/tres/issues/497) [#499](https://github.com/Tresjs/tres/issues/499) [#498](https://github.com/Tresjs/tres/issues/498) [#522](https://github.com/Tresjs/tres/issues/522) [#514](https://github.com/Tresjs/tres/issues/514) [#579](https://github.com/Tresjs/tres/issues/579) [#602](https://github.com/Tresjs/tres/issues/602) [#601](https://github.com/Tresjs/tres/issues/601) [#608](https://github.com/Tresjs/tres/issues/608) [#614](https://github.com/Tresjs/tres/issues/614) [#529](https://github.com/Tresjs/tres/issues/529)

## [4.0.0-rc.2](https://github.com/Tresjs/tres/compare/4.0.0-rc.1...4.0.0-rc.2) (2024-05-24)


### Bug Fixes

* 686 useloop callback state missing controls ([#687](https://github.com/Tresjs/tres/issues/687)) ([a41f532](https://github.com/Tresjs/tres/commit/a41f532b0c8d717e4bc3ec11fa73bd58df871fa8))
* manual rendering blank ([#685](https://github.com/Tresjs/tres/issues/685)) ([0720d18](https://github.com/Tresjs/tres/commit/0720d186e92ca9faa9e5f4e51a3269504bed2a09))

## [4.0.0-rc.1](https://github.com/Tresjs/tres/compare/4.0.0-rc.0...4.0.0-rc.1) (2024-05-15)


### Features

* 633 use loop  ([#673](https://github.com/Tresjs/tres/issues/673)) ([1b2fa70](https://github.com/Tresjs/tres/commit/1b2fa70e9999eb64395b3e7e9f2489ceab035a7a))


### Bug Fixes

* make on* callbacks settable ([#672](https://github.com/Tresjs/tres/issues/672)) ([ac152df](https://github.com/Tresjs/tres/commit/ac152dfa91c6ba347cbe0566fb4afbe19f50dd2b))
* **utils:** reorder object disposal to avoid issue with Helper `dispose` methods ([#683](https://github.com/Tresjs/tres/issues/683)) ([e5a2cef](https://github.com/Tresjs/tres/commit/e5a2cef0e450196abaa6d18380a5aadbc9cd057d))

## [4.0.0-rc.0](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0-rc.0) (2024-04-25)


### ⚠ BREAKING CHANGES

* **events:** pointerevents manager and state (#529)

### Features

* 499 better memory management ([#606](https://github.com/Tresjs/tres/issues/606)) ([e98ca6d](https://github.com/Tresjs/tres/commit/e98ca6dea15973b3a00e4b485199d9906eb772eb))
* devtools renderer improvements ([#614](https://github.com/Tresjs/tres/issues/614)) ([cdf6b6f](https://github.com/Tresjs/tres/commit/cdf6b6fefbd58dbf1dfbe396f219ac6f7c6fc92d))
* **events:** pointerevents manager and state ([#529](https://github.com/Tresjs/tres/issues/529)) ([b536ab1](https://github.com/Tresjs/tres/commit/b536ab19d1f4082c2db926e24d8c52f92949964b))


### Bug Fixes

* do not change pierced props case ([#608](https://github.com/Tresjs/tres/issues/608)) ([906f2e1](https://github.com/Tresjs/tres/commit/906f2e157aab7aa6daef5682c3282cf6e84fa891))

## [4.0.0-next.2](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0-rc.0) (2024-03-27)


### Bug Fixes

* refactor nodeOps to return methods at the end of the function ([#602](https://github.com/Tresjs/tres/issues/602)) ([cd0c3bc](https://github.com/Tresjs/tres/commit/cd0c3bcd891f019cf91f30e5fdd547630332a065))

## [4.0.0-next.1](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0-rc.0) (2024-03-18)


### Features

* 140 on demand rendering ([#497](https://github.com/Tresjs/tres/issues/497)) ([f688c64](https://github.com/Tresjs/tres/commit/f688c6447be887c4675a57ecabb5182d8b7d02cf))
* 492 set tone mapping default to acesfilmictonemapping ([#498](https://github.com/Tresjs/tres/issues/498)) ([c4547f9](https://github.com/Tresjs/tres/commit/c4547f92615a43b7b56b34c0e1ee9f4b78a2230b))
* 503 conditional rendering of primitives ([#514](https://github.com/Tresjs/tres/issues/514)) ([79d8a76](https://github.com/Tresjs/tres/commit/79d8a762da6b6e23771a20314f7902eff4635acf))
* 516 localstate for custom renderer node instances instead of userdata ([#522](https://github.com/Tresjs/tres/issues/522)) ([08717ef](https://github.com/Tresjs/tres/commit/08717efd0f631c085340b1fea4eb6c154c63608b))
* remove default camera warning ([#499](https://github.com/Tresjs/tres/issues/499)) ([8bbafde](https://github.com/Tresjs/tres/commit/8bbafde48a33753f0b6560da36a4d128aaa83cc6))
* update to three `v160` and vue `v3.4` ([#488](https://github.com/Tresjs/tres/issues/488)) ([5fad3b8](https://github.com/Tresjs/tres/commit/5fad3b8095c09cfe758e2553da3df49b29b1ce1a))


### Bug Fixes

* `nodeOps` is now a function ([#579](https://github.com/Tresjs/tres/issues/579)) ([ddc229e](https://github.com/Tresjs/tres/commit/ddc229e6e492b9e7887add0fcc679a9ae4e47f5c))
* camera aspect ([52dad5c](https://github.com/Tresjs/tres/commit/52dad5c98271f80f4d454bbcce1bb5844960f943))
* **types:** added `Object3DEventMap` to `Object3D` generics for point event handling ([#491](https://github.com/Tresjs/tres/issues/491)) ([a63eb90](https://github.com/Tresjs/tres/commit/a63eb9099fcaf97b1c96abe5667ee71ca2fd611f))

## [4.0.0-next.0](https://github.com/Tresjs/tres/compare/3.9.0...4.0.0-rc.0) (2023-12-22)


### Features

* 474 vue chrome devtools plugin ([#479](https://github.com/Tresjs/tres/issues/479)) ([224ab06](https://github.com/Tresjs/tres/commit/224ab06a4404e2ae5a0cbd2f43041961862b09fd))

## [4.0.0-next.2](https://github.com/Tresjs/tres/compare/4.0.0-next.1...4.0.0-next.2) (2024-03-27)

## [4.0.0-next.1](https://github.com/Tresjs/tres/compare/3.7.0...4.0.0-next.1) (2024-03-18)
* correct type exporting issues ([#625](https://github.com/Tresjs/tres/issues/625)) ([8e52cf1](https://github.com/Tresjs/tres/commit/8e52cf1935d7b725b87c9a41e44ba61e33bd3e85))


## [3.9.0](https://github.com/Tresjs/tres/compare/3.8.1...3.9.0) (2024-04-24)


### Features

* **app:** Add a new directive, v-rotate ([ccf5313](https://github.com/Tresjs/tres/commit/ccf53135a81c795bc08b343baaa823fa33bd064d))


### Bug Fixes

* **deps:** update dependency vue-router to v4.3.1 ([#650](https://github.com/Tresjs/tres/issues/650)) ([9bbb676](https://github.com/Tresjs/tres/commit/9bbb6768a5a7400bf163c06b3688505915bfd074))

## [3.8.1](https://github.com/Tresjs/tres/compare/3.8.0...3.8.1) (2024-04-08)


### Bug Fixes

* refactor nodeOps to return methods at the end of the function ([#602](https://github.com/Tresjs/tres/issues/602)) ([cd0c3bc](https://github.com/Tresjs/tres/commit/cd0c3bcd891f019cf91f30e5fdd547630332a065))


## [3.8.0](https://github.com/Tresjs/tres/compare/3.7.0...3.8.0) (2024-04-03)


### Features

* allow custom loading manager to useTexture ([#585](https://github.com/Tresjs/tres/issues/585)) ([a04c802](https://github.com/Tresjs/tres/commit/a04c8022201c1dcccde8029d5d409e596c498526)), closes [#432](https://github.com/Tresjs/tres/issues/432)


### Bug Fixes

* explicitely add `@vue/devtools-api` dep to package.json ([#604](https://github.com/Tresjs/tres/issues/604)) ([98109af](https://github.com/Tresjs/tres/commit/98109af7d501da1ae5f817e7dc61c6d6ad902891))
* **useLogger:** avoid string substitution in non-strings ([3e2233c](https://github.com/Tresjs/tres/commit/3e2233c61b507a6681a97733d03291db9a34eb89))
* **useLogger:** remove '<empty string>' from log, allow any args and string substitution ([a482ebe](https://github.com/Tresjs/tres/commit/a482ebe3d3d82ae54ff8999fae1693cd218dbdbd))

## [3.7.0](https://github.com/Tresjs/tres/compare/3.6.1...3.7.0) (2024-01-29)


### Features

* 140 on demand rendering ([#497](https://github.com/Tresjs/tres/issues/497)) ([f688c64](https://github.com/Tresjs/tres/commit/f688c6447be887c4675a57ecabb5182d8b7d02cf))
* 492 set tone mapping default to acesfilmictonemapping ([#498](https://github.com/Tresjs/tres/issues/498)) ([c4547f9](https://github.com/Tresjs/tres/commit/c4547f92615a43b7b56b34c0e1ee9f4b78a2230b))
* 503 conditional rendering of primitives ([#514](https://github.com/Tresjs/tres/issues/514)) ([79d8a76](https://github.com/Tresjs/tres/commit/79d8a762da6b6e23771a20314f7902eff4635acf))
* 516 localstate for custom renderer node instances instead of userdata ([#522](https://github.com/Tresjs/tres/issues/522)) ([08717ef](https://github.com/Tresjs/tres/commit/08717efd0f631c085340b1fea4eb6c154c63608b))
* remove default camera warning ([#499](https://github.com/Tresjs/tres/issues/499)) ([8bbafde](https://github.com/Tresjs/tres/commit/8bbafde48a33753f0b6560da36a4d128aaa83cc6))
* update to three `v160` and vue `v3.4` ([#488](https://github.com/Tresjs/tres/issues/488)) ([5fad3b8](https://github.com/Tresjs/tres/commit/5fad3b8095c09cfe758e2553da3df49b29b1ce1a))


### Bug Fixes

* `nodeOps` is now a function ([#579](https://github.com/Tresjs/tres/issues/579)) ([ddc229e](https://github.com/Tresjs/tres/commit/ddc229e6e492b9e7887add0fcc679a9ae4e47f5c))
* camera aspect ([52dad5c](https://github.com/Tresjs/tres/commit/52dad5c98271f80f4d454bbcce1bb5844960f943))
* **types:** added `Object3DEventMap` to `Object3D` generics for point event handling ([#491](https://github.com/Tresjs/tres/issues/491)) ([a63eb90](https://github.com/Tresjs/tres/commit/a63eb9099fcaf97b1c96abe5667ee71ca2fd611f))

## [4.0.0-next.0](https://github.com/Tresjs/tres/compare/3.7.0...4.0.0-next.1) (2023-12-22)


### Features

* 474 vue chrome devtools plugin ([#479](https://github.com/Tresjs/tres/issues/479)) ([224ab06](https://github.com/Tresjs/tres/commit/224ab06a4404e2ae5a0cbd2f43041961862b09fd))

## [3.7.0](https://github.com/Tresjs/tres/compare/3.6.1...3.7.0) (2024-01-29)

### Features
  
* 474 vue chrome devtools plugin ([#526](https://github.com/Tresjs/tres/issues/526)) ([0185bfa](https://github.com/Tresjs/tres/commit/0185bfa6f04faff5eabbc526616713ef7747ebeb))
* 524 feat add directives to core ([#525](https://github.com/Tresjs/tres/issues/525)) ([5268e9f](https://github.com/Tresjs/tres/commit/5268e9f13bf65c61d5ddfe7153b71b335449b81d))


### Bug Fixes

* **docs:** change image path to silence warning ([#519](https://github.com/Tresjs/tres/issues/519)) ([280d248](https://github.com/Tresjs/tres/commit/280d2482760bde1032e24c4a9e96af4beea954ed))

## [3.6.1](https://github.com/Tresjs/tres/compare/3.6.0...3.6.1) (2024-01-16)


### Bug Fixes

* correct minor typos ([#438](https://github.com/Tresjs/tres/issues/438)) ([341faac](https://github.com/Tresjs/tres/commit/341faacb93fd347aced7f1bc7e0484ecbc12e6ce)), closes [#452](https://github.com/Tresjs/tres/issues/452)
* incorrect MathRepresentation type ([#456](https://github.com/Tresjs/tres/issues/456)) ([314b088](https://github.com/Tresjs/tres/commit/314b0883b78ded0cad2bdf9f2506bbeac4a0817e))
* **usetrescontextprovider:** fixed rendering issues caused when resize is triggered ([#512](https://github.com/Tresjs/tres/issues/512)) ([a16b12b](https://github.com/Tresjs/tres/commit/a16b12b160098e97993b14a7bb054103c88b6263)), closes [#511](https://github.com/Tresjs/tres/issues/511)

## [3.6.0](https://github.com/Tresjs/tres/compare/3.5.2...3.6.0) (2023-12-12)


### Features

* enable devtools ([#465](https://github.com/Tresjs/tres/issues/465)) ([d61df05](https://github.com/Tresjs/tres/commit/d61df0597965e708581d1b32eafa2f14866bf9b4))

## [3.6.0-next.0](https://github.com/Tresjs/tres/compare/3.5.1...3.6.0-next.0) (2023-12-06)


### Features

* devtools hook on window object ([df96c1f](https://github.com/Tresjs/tres/commit/df96c1f31aafe1b73cd344fde39420c1ae443d47))
  

## [3.5.2](https://github.com/Tresjs/tres/compare/3.5.1...3.5.2) (2023-12-12)


### Bug Fixes

* force memory free allocation when disposing materials and geometries ([#463](https://github.com/Tresjs/tres/issues/463)) ([1ef3533](https://github.com/Tresjs/tres/commit/1ef353363d02256275c483ec15ad424dc058991a))

## [3.5.1](https://github.com/Tresjs/tres/compare/3.5.0...3.5.1) (2023-11-28)

## [3.5.0](https://github.com/Tresjs/tres/compare/3.4.1...3.5.0) (2023-11-05)


### Features

* **useSeek:** Add `seekAll` and `seekAllByName` methods to `useSeek` composable ([#433](https://github.com/Tresjs/tres/issues/433)) ([ef905a3](https://github.com/Tresjs/tres/commit/ef905a311347f010f3902cd2ee5546ffed0811ab))


### Bug Fixes

* **types-(fix-#427):** vueprops change ref to vnoderef and key add number and symbol ([#428](https://github.com/Tresjs/tres/issues/428)) ([45aeafd](https://github.com/Tresjs/tres/commit/45aeafd41ca77a056f5668075f5a8e5ed3346761)), closes [fix-#427](https://github.com/Tresjs/fix-/issues/427) [#427](https://github.com/Tresjs/tres/issues/427)

## [3.4.1](https://github.com/Tresjs/tres/compare/3.4.0...3.4.1) (2023-10-19)


### Bug Fixes

* passing class and style attrs only ([#423](https://github.com/Tresjs/tres/issues/423)) ([8fd991a](https://github.com/Tresjs/tres/commit/8fd991a032fff358c815f1b4cb2b98bc44d8eef1))

## [3.4.0](https://github.com/Tresjs/tres/compare/3.3.0...3.4.0) (2023-10-19)


### Features

* announce cientos 3.5.0 ([#417](https://github.com/Tresjs/tres/issues/417)) ([064806f](https://github.com/Tresjs/tres/commit/064806f518a6456822e133fb7bd190690b5906de))


### Bug Fixes

* pass attrs down to canvas ([#422](https://github.com/Tresjs/tres/issues/422)) ([aeab3e8](https://github.com/Tresjs/tres/commit/aeab3e8632c7b8708cd0b58c5e979d7015368ec9))

## [3.3.0](https://github.com/Tresjs/tres/compare/3.2.3...3.3.0) (2023-10-02)


### Features

* context (TresContext) is now exposed from TresCanvas ([#404](https://github.com/Tresjs/tres/issues/404)) ([838d779](https://github.com/Tresjs/tres/commit/838d779e59494cacf61274fe497373983dbe8278))


### Bug Fixes

* **core:** made v-if work again ([#409](https://github.com/Tresjs/tres/issues/409)) ([0d00545](https://github.com/Tresjs/tres/commit/0d0054577aaed001c2a56a9e97e0600921ba6a5d))

## [3.3.0-next.0](https://github.com/Tresjs/tres/compare/3.2.3...3.3.0-next.0) (2023-09-29)


### Features

* context (TresContext) is now exposed from TresCanvas ([#404](https://github.com/Tresjs/tres/issues/404)) ([838d779](https://github.com/Tresjs/tres/commit/838d779e59494cacf61274fe497373983dbe8278))


### Bug Fixes

* made v-if work again ([277e901](https://github.com/Tresjs/tres/commit/277e901f8e41dc72bf755db17c584b3e28086347))

## [3.2.3](https://github.com/Tresjs/tres/compare/3.2.2...3.2.3) (2023-09-22)


### Bug Fixes

* **types:** useTexture() ([#401](https://github.com/Tresjs/tres/issues/401)) ([20ffa4b](https://github.com/Tresjs/tres/commit/20ffa4bbc8d8a45643c8d4368a91cf68513b94c2))

## [3.2.2](https://github.com/Tresjs/tres/compare/3.2.1...3.2.2) (2023-09-16)


### Bug Fixes

* ensure scene as parent fallback for helpers ([#397](https://github.com/Tresjs/tres/issues/397)) ([d63b028](https://github.com/Tresjs/tres/commit/d63b0286aee10baf954bee9d0d180ba3ff17cf48))
* made reactivity of camera prop on TresCanvas work again ([#396](https://github.com/Tresjs/tres/issues/396)) ([990612d](https://github.com/Tresjs/tres/commit/990612dffc593e01a98fccb761a87ea43eddaf2b))
* useTexture docs detail ([#395](https://github.com/Tresjs/tres/issues/395)) ([158d4c3](https://github.com/Tresjs/tres/commit/158d4c3e9f3907fe19b16f6ae7c248626bef8d5b))

## [3.2.1](https://github.com/Tresjs/tres/compare/3.2.0...3.2.1) (2023-09-11)


### Bug Fixes

* proxy app context ([#394](https://github.com/Tresjs/tres/issues/394)) ([2301269](https://github.com/Tresjs/tres/commit/2301269aef4d7405ca0d327bd0ae80cebac5aad6))

## [3.2.1-next.4](https://github.com/Tresjs/tres/compare/3.2.1-next.3...3.2.1-next.4) (2023-09-11)


### Reverts

* Revert "chore: fix lint" ([f53fba9](https://github.com/Tresjs/tres/commit/f53fba955a0c3f0040ce79f52e1b756147fad4ec))

## [3.2.1-next.3](https://github.com/Tresjs/tres/compare/3.2.1-next.2...3.2.1-next.3) (2023-09-11)


### Bug Fixes

* revert object assign usage for setting app in appContext ([889e022](https://github.com/Tresjs/tres/commit/889e0221ed2e8f2c6a3e4ee91413125c9bfe7281))

## [3.2.1-next.2](https://github.com/Tresjs/tres/compare/3.2.1-next.1...3.2.1-next.2) (2023-09-11)


### Bug Fixes

* explicitely set app context app ([c2a758f](https://github.com/Tresjs/tres/commit/c2a758f4c63641897db7b7065fed8286a699c20e))

## [3.2.1-next.1](https://github.com/Tresjs/tres/compare/3.2.1-next.0...3.2.1-next.1) (2023-09-11)


### Bug Fixes

* object assign approach for inner app context ([3a6dc31](https://github.com/Tresjs/tres/commit/3a6dc317c39cba6b2ebcdcf372eb8ccd6676ef2e))

## [3.2.1-next.0](https://github.com/Tresjs/tres/compare/3.2.0...3.2.1-next.0) (2023-09-11)


### Bug Fixes

* proxy app context ([128e3a5](https://github.com/Tresjs/tres/commit/128e3a5eb7af9c3d9b76f67e4afb19d6d0f550b0))

## [3.2.0](https://github.com/Tresjs/tres/compare/3.1.1...3.2.0) (2023-09-06)


### Features

* objects blocking pointer event ([#388](https://github.com/Tresjs/tres/issues/388)) ([03ab2e1](https://github.com/Tresjs/tres/commit/03ab2e1ea737f0fa9ac2b2ca421335126fd077d4))
* renamed useCamera composable methods to prevent confusion ([#380](https://github.com/Tresjs/tres/issues/380)) ([58feabd](https://github.com/Tresjs/tres/commit/58feabd1f220a779d1e85f9f75ee453e767848ad))


### Bug Fixes

* removed boolean prop defaults from TresCanvas ([#384](https://github.com/Tresjs/tres/issues/384)) ([bb5fca5](https://github.com/Tresjs/tres/commit/bb5fca5508b1ee1e742c44bc3bf42159a815bfa1))

## [3.1.1](https://github.com/Tresjs/tres/compare/3.1.0...3.1.1) (2023-08-26)


### Bug Fixes

* removing z-index from canvas ([#382](https://github.com/Tresjs/tres/issues/382)) ([ac096f7](https://github.com/Tresjs/tres/commit/ac096f7de31ac5714aaa168a3fd01e311a724dbe))

## [3.1.0](https://github.com/Tresjs/tres/compare/3.0.1...3.1.0) (2023-08-23)


### Features

* use render instead of createApp ([#375](https://github.com/Tresjs/tres/issues/375)) ([9461a78](https://github.com/Tresjs/tres/commit/9461a78b1cb8082311765b5ef309e436da770012))


### Bug Fixes

* added logic on pathProps to re-instance nodes once `args` change ([#367](https://github.com/Tresjs/tres/issues/367)) ([453b031](https://github.com/Tresjs/tres/commit/453b031b258ab840af7d6b372ac3785b5f006851))
* added revision version to apply useLegacyLights only if neccesary ([#373](https://github.com/Tresjs/tres/issues/373)) ([dee4b97](https://github.com/Tresjs/tres/commit/dee4b97faf906b8796dffa9f32369230f5bc417d))
* args should be empty when args was falsy ([#369](https://github.com/Tresjs/tres/issues/369)) ([81b7914](https://github.com/Tresjs/tres/commit/81b7914fc685aa7314541480a96801c0cc7fd542))
* instances re-instancing when not needed ([#374](https://github.com/Tresjs/tres/issues/374)) ([f2ae46b](https://github.com/Tresjs/tres/commit/f2ae46bebd7aa9a99961259dbc1db5ae6cf876dd))

### [3.0.1](https://github.com/Tresjs/tres/compare/3.0.0...3.0.1) (2023-07-29)


### Bug Fixes

* added controls and extend to state context ([#355](https://github.com/Tresjs/tres/issues/355)) ([c2540a5](https://github.com/Tresjs/tres/commit/c2540a55064098b5c7b145a9e785e370b78c4d23))

## [3.0.0](https://github.com/Tresjs/tres/compare/2.4.2...3.0.0) (2023-07-29)


### ⚠ BREAKING CHANGES

* UseTres is now useTresContext. Instead of using a store like in v2, we now use a context provider based on `provide/inject`.

### Features

* 331 new context for state ([#333](https://github.com/Tresjs/tres/issues/333)) ([0e66f43](https://github.com/Tresjs/tres/commit/0e66f43712d42370bd30ae0bdbe4d9b3a5d0f0ec)), closes [#340](https://github.com/Tresjs/tres/issues/340)


### Documentation

* explain state breaking changes ([4757da9](https://github.com/Tresjs/tres/commit/4757da981cd845c5a71b0d6f07c1d174855cc859))

### [2.4.2](https://github.com/Tresjs/tres/compare/2.4.1...2.4.2) (2023-07-14)


### Bug Fixes

* add raycaster to state ([#347](https://github.com/Tresjs/tres/issues/347)) ([c45d4c3](https://github.com/Tresjs/tres/commit/c45d4c32d12cba14c43588804458c40d81bcc055))

### [2.4.1](https://github.com/Tresjs/tres/compare/2.4.0...2.4.1) (2023-07-13)


### Bug Fixes

* add app context to state ([#346](https://github.com/Tresjs/tres/issues/346)) ([197f258](https://github.com/Tresjs/tres/commit/197f258f1bba39b057d3936ff53fee01c18388ab))
* change internal Scene component name to force rendering ([#330](https://github.com/Tresjs/tres/issues/330)) ([780743c](https://github.com/Tresjs/tres/commit/780743c62f421677b61f6c9ef9ef3feacd4b37f9))
* fake a `VNodeRef` on types to accept strings and null ([#344](https://github.com/Tresjs/tres/issues/344)) ([c069f64](https://github.com/Tresjs/tres/commit/c069f6423d4abf1a55d87d32ea121cb1752e5b58))
* prop types on TresCanvas ([#326](https://github.com/Tresjs/tres/issues/326)) ([309584a](https://github.com/Tresjs/tres/commit/309584a5431b63a63fe541a11a1347de54359dac))

## [2.4.0](https://github.com/Tresjs/tres/compare/2.3.0...2.4.0) (2023-06-28)


### Features

* export vue compiler options for Tres custom renderer ([#324](https://github.com/Tresjs/tres/issues/324)) ([66716d5](https://github.com/Tresjs/tres/commit/66716d523f1ee80b22bb5ee8da95eb1d8235714c))


### Bug Fixes

* temporaly cast the `disableRender` prop ([#322](https://github.com/Tresjs/tres/issues/322)) ([9cc63d2](https://github.com/Tresjs/tres/commit/9cc63d2af51f83dad7fe2af70ca8fdc4c0decebb))

## [2.3.0](https://github.com/Tresjs/tres/compare/2.2.0...2.3.0) (2023-06-22)


### Features

* export utility functions ([#315](https://github.com/Tresjs/tres/issues/315)) ([7580c77](https://github.com/Tresjs/tres/commit/7580c774820ee99b2ebfbdbf274fe6c164b35097))

## [2.2.0](https://github.com/Tresjs/tres/compare/2.1.3...2.2.0) (2023-06-19)


### Features

* removed `useCamera` logic from nodeOps ([#308](https://github.com/Tresjs/tres/issues/308)) ([e9509ba](https://github.com/Tresjs/tres/commit/e9509bab177a7a23f802ad2716f42d1f36f7654b))


### Bug Fixes

* banner image link ([b793c77](https://github.com/Tresjs/tres/commit/b793c77a2b456ddac0fdd4cf18ad4d94f19db439))
* main button colors ([3aab827](https://github.com/Tresjs/tres/commit/3aab8273dace80ba6e5ee210b0e17f0b8bc61449))
* raycaster does not work properly when scene is not in full screen ([#304](https://github.com/Tresjs/tres/issues/304)) ([20a5b9e](https://github.com/Tresjs/tres/commit/20a5b9eee94755ca58ff4936aef20a070f920a7e))

### [2.1.3](https://github.com/Tresjs/tres/compare/2.1.2...2.1.3) (2023-06-14)


### Bug Fixes

* **deps:** update dependency @alvarosabu/utils to v3 ([97a9950](https://github.com/Tresjs/tres/commit/97a9950833f70fde84541ab106cc714aa3c6ad5f))
* **deps:** update dependency @tresjs/cientos to v2.1.3 ([cae506d](https://github.com/Tresjs/tres/commit/cae506df15115adbbbd099b6b8cecd422b59ab42))
* extend `GlobalComponents` rather than replacing ([70b3717](https://github.com/Tresjs/tres/commit/70b3717bec561819c248d99fe51d4cf41198151c))
* message canvas 0 height false positives ([bdfbdfe](https://github.com/Tresjs/tres/commit/bdfbdfeb744f7d0920cbaa87a4016a8d5e237a97))

### [2.1.2](https://github.com/Tresjs/tres/compare/2.1.1...2.1.2) (2023-05-26)


### Bug Fixes

* added scene fallback as parent for controls ([e986f9c](https://github.com/Tresjs/tres/commit/e986f9ca2e760c34a6d92a089b8c343b4f11fc66))

### [2.1.1](https://github.com/Tresjs/tres/compare/2.1.0...2.1.1) (2023-05-22)

## [2.1.0](https://github.com/Tresjs/tres/compare/2.0.0...2.1.0) (2023-05-22)


### Features

* mighty sexy runtime types ([97a5b64](https://github.com/Tresjs/tres/commit/97a5b64f39f5dfa46bb15823a23aa9d5ebe0b339))


### Bug Fixes

* docs dev and build ([7106cf9](https://github.com/Tresjs/tres/commit/7106cf93ed1426f897a40aa881d73a2a6efeb4ae))
* package exports ([7c9e41a](https://github.com/Tresjs/tres/commit/7c9e41af0decd4cfd51accf992a6486de9a856ec))
* package exports types ([6fa3e09](https://github.com/Tresjs/tres/commit/6fa3e09882064f0fc19874c24141402d6bff5ce2))
* pnpm workspace structure ([e8300d6](https://github.com/Tresjs/tres/commit/e8300d61b3059a926693e62b60a11b363cf50365))
* re-mount custom renderer manually on HMR ([029542e](https://github.com/Tresjs/tres/commit/029542e851ea7da9696cd294877813da838bc5fc))

## [2.0.0](https://github.com/Tresjs/tres/compare/2.0.0-rc.4...2.0.0) (2023-05-12)

## [2.0.0-rc.4](https://github.com/Tresjs/tres/compare/2.0.0-rc.3...2.0.0-rc.4) (2023-05-09)


### Bug Fixes

* only set default camera settings to first camera ([7f1e7cd](https://github.com/Tresjs/tres/commit/7f1e7cdf4652b2212340a1d975bd5b9ca3e31e8a))

## [2.0.0-rc.3](https://github.com/Tresjs/tres/compare/2.0.0-rc.2...2.0.0-rc.3) (2023-05-09)


### Bug Fixes

* akwardly added fog and fixed also typing ([e256768](https://github.com/Tresjs/tres/commit/e2567681c678089463437723d6a505ac630f2849))
* colorspace types ([27e10e9](https://github.com/Tresjs/tres/commit/27e10e9c15658f4c1f338562b5ad078f4107e5dd))
* disabling pushing more than one camera on nodeOpts ([57a07bf](https://github.com/Tresjs/tres/commit/57a07bf75a1df54fe5cb2f06cad8159234c384aa))

## [2.0.0-rc.2](https://github.com/Tresjs/tres/compare/2.0.0-rc.1...2.0.0-rc.2) (2023-05-03)


### Bug Fixes

* updated breaking changes of three v152 color maangement ([1e47a5f](https://github.com/Tresjs/tres/commit/1e47a5fbdb14e54599f3e3e2e989f57895ab19f9))

## [2.0.0-rc.1](https://github.com/Tresjs/tres/compare/2.0.0-rc.0...2.0.0-rc.1) (2023-05-03)

## [2.0.0-rc.0](https://github.com/Tresjs/tres/compare/2.0.0-beta.13...2.0.0-rc.0) (2023-05-03)

## [2.0.0-beta.13](https://github.com/Tresjs/tres/compare/2.0.0-beta.12...2.0.0-beta.13) (2023-04-27)


### Features

* add manual camera prop to canvas ([588a3fc](https://github.com/Tresjs/tres/commit/588a3fcddd1557390003bfd0cd5d63db2536fdd7))

## [2.0.0-beta.12](https://github.com/Tresjs/tres/compare/2.0.0-beta.11...2.0.0-beta.12) (2023-04-25)


### Bug Fixes

* avoid assigning args as BufferAttribute to BufferGeometry ([1cc67b0](https://github.com/Tresjs/tres/commit/1cc67b08c1f1d2a2f3a4623a15dd69ecf3e3663a))
* **deps:** update dependency three to ^0.151.0 ([6f0e80c](https://github.com/Tresjs/tres/commit/6f0e80cf3ada806ff551f629b1fbee67532d55ce))

## [2.0.0-beta.11](https://github.com/Tresjs/tres/compare/2.0.0-beta.10...2.0.0-beta.11) (2023-04-20)


### Bug Fixes

* optional chaining on insert vnodes ([c2dcf52](https://github.com/Tresjs/tres/commit/c2dcf52c5e30a22953755a96d8bddbd955c5a1d8))


### Reverts

* Revert "edit getting-started.md" ([fcc6900](https://github.com/Tresjs/tres/commit/fcc690003654ff4ed9af836e8657de25cecda2be))

## [2.0.0-beta.10](https://github.com/Tresjs/tres/compare/2.0.0-beta.9...2.0.0-beta.10) (2023-04-19)


### Bug Fixes

* **core:** fixed [#209](https://github.com/Tresjs/tres/issues/209) ([9648935](https://github.com/Tresjs/tres/commit/9648935d23e68363071cb543a7876b9a23c512fe))

## [2.0.0-beta.9](https://github.com/Tresjs/tres/compare/2.0.0-beta.8...2.0.0-beta.9) (2023-04-18)


### Bug Fixes

* incorrect implementation of disable render on canvas ([2442935](https://github.com/Tresjs/tres/commit/244293551663623fde0817e0a64676df12964257))

## [2.0.0-beta.8](https://github.com/Tresjs/tres/compare/2.0.0-beta.7...2.0.0-beta.8) (2023-04-17)


### Features

* add disable render prop for postprocessing ([b2fd557](https://github.com/Tresjs/tres/commit/b2fd557c33733e390e15d546a2b61ce504486902))

## [2.0.0-beta.7](https://github.com/Tresjs/tres/compare/2.0.0-beta.6...2.0.0-beta.7) (2023-04-15)


### Bug Fixes

* remove object assign for non primitive ([f9e0d4b](https://github.com/Tresjs/tres/commit/f9e0d4b8933235e133cf81a788861b8ee84e8e0e))

## [2.0.0-beta.6](https://github.com/Tresjs/tres/compare/2.0.0-beta.5...2.0.0-beta.6) (2023-04-15)

## [2.0.0-beta.5](https://github.com/Tresjs/tres/compare/2.0.0-beta.4...2.0.0-beta.5) (2023-04-14)


### Features

* **core:** fixed nodeOps remove test ([2706f48](https://github.com/Tresjs/tres/commit/2706f487aa4c2c2e447f45d7ed030f2a766ad593))
* **core:** fixed nodeOps remove test (this time correctly 😉) ([f5fca28](https://github.com/Tresjs/tres/commit/f5fca28a1cd8f625c210cf6536e39651caa9451a))
* **core:** made custom renderer determine whether materials and geometries should be disposed ([36c8cf5](https://github.com/Tresjs/tres/commit/36c8cf5ed01c525106a722a5cf963e189e16ce34))
* **core:** made custom renderer traverse the scene tree to dispose obsolete materials and geometries ([cae21b1](https://github.com/Tresjs/tres/commit/cae21b1aa31fefb85c2cce6cb43f999d42d433d2))
* first try concerning conditional rendering of components ([31bdd96](https://github.com/Tresjs/tres/commit/31bdd96443e980930e36a7410c8a96db589cf29a))
* primitive ([ab63e14](https://github.com/Tresjs/tres/commit/ab63e14018d44997906255256b7633abce02a8c1))


### Bug Fixes

* [@pointer-move](https://github.com/pointer-move) events ([b451862](https://github.com/Tresjs/tres/commit/b451862ebed7a404ebdb702e4706de61b940065a))
* correct casing of key names when pierced props ([b6a808f](https://github.com/Tresjs/tres/commit/b6a808f71685a1d29ccc8de9d6c36d19a8474742))

## [2.0.0-beta.4](https://github.com/Tresjs/tres/compare/2.0.0-beta.3...2.0.0-beta.4) (2023-04-06)


### Bug Fixes

* optional chaining on object pointer events ([421a7d5](https://github.com/Tresjs/tres/commit/421a7d54c045cabb3378035a3e90b0c85197ab90))

## [2.0.0-beta.3](https://github.com/Tresjs/tres/compare/2.0.0-beta.2...2.0.0-beta.3) (2023-04-06)


### Bug Fixes

* added default position and direction to camera if props are not passed ([63a340f](https://github.com/Tresjs/tres/commit/63a340f91ae709c6ffd3c4d793c6b91f51186eef))
* tres-canvas window-size now support 'true' string ([a63e33f](https://github.com/Tresjs/tres/commit/a63e33f28fc83654ffa7e895252fd1e05494c4b3))

## [2.0.0-beta.2](https://github.com/Tresjs/tres/compare/2.0.0-beta.1...2.0.0-beta.2) (2023-04-05)


### Bug Fixes

* move raycaster logic from nodeOps to TresCanvas ([d2200ae](https://github.com/Tresjs/tres/commit/d2200aee41e6a0fad90e4ddf11f0c8e7eadadbf4))
* raycaster events listener on canvas rather than windows ([bfe82b0](https://github.com/Tresjs/tres/commit/bfe82b052a1f898a1f85f243311b308330ab1fab))

## [2.0.0-beta.1](https://github.com/Tresjs/tres/compare/2.0.0-beta.0...2.0.0-beta.1) (2023-04-04)


### Features

* expose state from TresCanvas ([eeeff2e](https://github.com/Tresjs/tres/commit/eeeff2e4ba8b947e5b3f5f6a0e1683a07595b6d4))

## [2.0.0-beta.0](https://github.com/Tresjs/tres/compare/2.0.0-alpha.6...2.0.0-beta.0) (2023-04-04)


### Features

* cleanup of obsolete code ([f55ef36](https://github.com/Tresjs/tres/commit/f55ef3673e8b6e69666ebe9b3d0632f504b83537))
* **core:** performance improvement concerning raycaster ([#139](https://github.com/Tresjs/tres/issues/139)) ([597e917](https://github.com/Tresjs/tres/commit/597e9174bcab6d110de9a38bed1b3c7e04171a82))
* use tres provider and context ([46cdd00](https://github.com/Tresjs/tres/commit/46cdd001f6c9b84568781f135d417640041e269a))

## [2.0.0-alpha.6](https://github.com/Tresjs/tres/compare/2.0.0-alpha.5...2.0.0-alpha.6) (2023-03-30)

### Features

- add alphaMap to useTexture ([f66c363](https://github.com/Tresjs/tres/commit/f66c36394ae188cb380e8d793eb9ec429b5aa925))
- add matcap to useTexture ([ce374d6](https://github.com/Tresjs/tres/commit/ce374d6c93abf3ab4816c288419c9a30a1caa54e))
- adding warning when canvas parent height is 0px ([4224103](https://github.com/Tresjs/tres/commit/42241036f01299a969a0c49b2d8a24e77871010e))

### Bug Fixes

- removed key split on buffer geometry attributes ([a29cb2b](https://github.com/Tresjs/tres/commit/a29cb2bb908c3cfdccd81fb71b97f4ebe5c4ef59))

## [2.0.0-alpha.5](https://github.com/Tresjs/tres/compare/2.0.0-alpha.4...2.0.0-alpha.5) (2023-03-28)

### Features

- useSeek composable ([bd00001](https://github.com/Tresjs/tres/commit/bd00001948f963c955231a4a406889fa2f2a7051))

## [2.0.0-alpha.4](https://github.com/Tresjs/tres/compare/2.0.0-alpha.3...2.0.0-alpha.4) (2023-03-27)

### Bug Fixes

- removing resetState and going for more granular approach of disposal ([6f1e38b](https://github.com/Tresjs/tres/commit/6f1e38b3361a08d047b7c094285cfd67145502ad))
- reset state on unmounted ([dbbaee7](https://github.com/Tresjs/tres/commit/dbbaee748a51166cb1b03fecdc1a086772b4a437))

## [2.0.0-alpha.3](https://github.com/Tresjs/tres/compare/2.0.0-alpha.2...2.0.0-alpha.3) (2023-03-26)

### Bug Fixes

- ensure parent for nodeOps target when key is a function ([c07d963](https://github.com/Tresjs/tres/commit/c07d963bd50910f9df519db05ed7f1a496ff03cc))

## [2.0.0-alpha.2](https://github.com/Tresjs/tres/compare/2.0.0-alpha.1...2.0.0-alpha.2) (2023-03-23)

### Features

- buffergeometry setAttribute logic ([beee7b3](https://github.com/Tresjs/tres/commit/beee7b3d564e983e64b51bb4e97c6c357c6de89a))

## [2.0.0-alpha.1](https://github.com/Tresjs/tres/compare/2.0.0-alpha.0...2.0.0-alpha.1) (2023-03-22)

### Bug Fixes

- set scene to state ([1ead941](https://github.com/Tresjs/tres/commit/1ead941eda465a6a6a319a9172052285dd4c146d))

## [2.0.0-alpha.0](https://github.com/Tresjs/tres/compare/@tresjs/core@1.8.1...2.0.0-alpha.0) (2023-03-22)

### Features

- **cientos:** better typ support useEnvironment ([821b6a6](https://github.com/Tresjs/tres/commit/821b6a6b8eea0d9648e371b7b971461f0cb84d15))
- **cientos:** correctly typed Text3D ([61efbfb](https://github.com/Tresjs/tres/commit/61efbfbd08c6f1843c6ad8dd7d893cd287018ba0))
- **cientos:** orbit controls typed ([e38e699](https://github.com/Tresjs/tres/commit/e38e6996d5eb136bb9bf0a828547c2c9403aebd5))
- **cientos:** shapes types ([aa7361b](https://github.com/Tresjs/tres/commit/aa7361b8059d5582fc03710ccdde56b60243fe9b))
- **cientos:** typed usePamCameraMouse ([07609be](https://github.com/Tresjs/tres/commit/07609be5c8401fce5ab8cd4aa3d70c1e117160cc))
- **core:** adding composables to the solution ([9a3f8bb](https://github.com/Tresjs/tres/commit/9a3f8bb7461c253a175107c834f7eb50717602c9))
- **core:** auto generated tres component types ([7430d2c](https://github.com/Tresjs/tres/commit/7430d2c7583a14a71f591b02ccdbdd5835123595))
- **core:** cleaning up a little bit ([8bdd825](https://github.com/Tresjs/tres/commit/8bdd825d64617584d058866a176fb13d12aa9cc8))
- **core:** export useLogger ([4ad1a3e](https://github.com/Tresjs/tres/commit/4ad1a3efa84cd43d35688329749704a549fa7134))
- **core:** fixing black screen ([f4f198c](https://github.com/Tresjs/tres/commit/f4f198c9d04ab1a7fd22be2099c62e5ab8e2c461))
- **core:** function props and demos updated ([fa072cd](https://github.com/Tresjs/tres/commit/fa072cddc0fca4c1862a49fa2877d3ef5c96dbd2))
- **core:** nice warning for camera at [0,0,0] ([71eff1b](https://github.com/Tresjs/tres/commit/71eff1b5d0c6531a062b15790a315dad13a7ea18))
- **core:** provide inject worked again ([2390ec1](https://github.com/Tresjs/tres/commit/2390ec1a757d17bbf02418f1b45848dbbe694da7))
- **core:** re-structure and tres custom renderer base ([aad0953](https://github.com/Tresjs/tres/commit/aad0953c2d94004231366e20a82a73389f60c7ad))
- **core:** tres components typing auto generated ([6736b4c](https://github.com/Tresjs/tres/commit/6736b4c6598cf6ad058fac1882257ca337f0902e))
- **core:** types for TresCanvas ([42ee984](https://github.com/Tresjs/tres/commit/42ee984249ab528d15c1f2a33f950dc9aafbfa82))
- **core:** v-if working on custom renderer ([e19da3a](https://github.com/Tresjs/tres/commit/e19da3a52d428e8deb32e414df5cfa49db20cd01))
- createTres wrapper for mounting options ([d480b36](https://github.com/Tresjs/tres/commit/d480b364d4da76776515e6f9138e8f08f7d51e0f))

### Bug Fixes

- **cientos:** added default props to orbit controls ([68d8673](https://github.com/Tresjs/tres/commit/68d8673f0ce794d3d1e09905ead69e575e6e2f3c))
- **cientos:** cone props ([5f20368](https://github.com/Tresjs/tres/commit/5f2036859733ec864f1736bb3796a86193e9fb51))
- **cientos:** remove unused extend ([5d5b487](https://github.com/Tresjs/tres/commit/5d5b4870d9d3452c00cf4a0e4295a911950d07bd))
- **core:** added handleHMR update ([594ab73](https://github.com/Tresjs/tres/commit/594ab738f60c6d1d4e6a9ac0339bb8a3c0d44eb8))
- **core:** fixed type issues ([bd4be33](https://github.com/Tresjs/tres/commit/bd4be33ab77372307ef59b0ff3bc8989fb40151f))
- **core:** nodeOps no op ([9044c99](https://github.com/Tresjs/tres/commit/9044c99878f312c6e4c120e9eeee61ea675754e8))
- useTexture to show indentation for code snippet ([e983c5d](https://github.com/Tresjs/tres/commit/e983c5d945fe2d72083edf03cf08152fe517cbe9))
