## 5.5.0 (2026-02-16)

### 🚀 Features

- **core:** export `Context` component ([5919f887](https://github.com/Tresjs/tres/commit/5919f887))

### ❤️ Thank You

- Jungzl

## 5.4.1 (2026-02-09)

### 🩹 Fixes

- **core:** fixed clock delta bug ([21a813ae](https://github.com/Tresjs/tres/commit/21a813ae))

### ❤️ Thank You

- Tino Koch @tinoooo

## 5.4.0 (2026-02-02)

### 🚀 Features

- **core:** initialize __tres.objects in context and update nodeOps for text node handling ([d9d5893a](https://github.com/Tresjs/tres/commit/d9d5893a))

### 🩹 Fixes

- **core:** fixed endless loop in renderer when handling fragment instances ([d9ade7eb](https://github.com/Tresjs/tres/commit/d9ade7eb))
- **core:** fixed dependent watcher position in initialization order ([b58b785b](https://github.com/Tresjs/tres/commit/b58b785b))
- **core:** fixed text and comment node handling ([c54c6d6f](https://github.com/Tresjs/tres/commit/c54c6d6f))

### ❤️ Thank You

- Tino Koch @tinoooo

## 5.3.3 (2026-01-26)

### 🩹 Fixes

- **core:** replace queueMicrotask with nextTick for ready event trigger ([50aa91f0](https://github.com/Tresjs/tres/commit/50aa91f0))
- **core:** defer ready event trigger to fix window-size black screen ([#1285](https://github.com/Tresjs/tres/issues/1285), [#1286](https://github.com/Tresjs/tres/issues/1286))

### ❤️ Thank You

- alvarosabu @alvarosabu

## 5.3.2 (2026-01-22)

### 🩹 Fixes

- **core:** fixed active camera check ([13b62e25](https://github.com/Tresjs/tres/commit/13b62e25))
- **core:** improve error handling for renderer initialization ([69be33da](https://github.com/Tresjs/tres/commit/69be33da))
- **core:** enhance camera registration and renderer initialization ([5dac8915](https://github.com/Tresjs/tres/commit/5dac8915))
- **core:** improve renderer initialization for WebGPU support ([06d06093](https://github.com/Tresjs/tres/commit/06d06093))

### ❤️ Thank You

- alvarosabu @alvarosabu
- Tino Koch @tinoooo

## 5.3.1 (2026-01-15)

This was a version bump only for @tresjs/core to align it with other projects, there were no code changes.

## 5.3.0 (2026-01-14)

### 🚀 Features

- **core:** moved types to context component and introduced Prettify helper ([77258a63](https://github.com/Tresjs/tres/commit/77258a63))
- **core:** integrate useForwardPropsEmits in TresCanvas for streamlined event handling ([bb46d603](https://github.com/Tresjs/tres/commit/bb46d603))

### 🩹 Fixes

- **core:** add prefix option for primitives ([#1262](https://github.com/Tresjs/tres/pull/1262))
- removed Prettify helper to avoid build errors ([dc17faca](https://github.com/Tresjs/tres/commit/dc17faca))

### ❤️ Thank You

- Alvaro Saburido @alvarosabu
- Tino Koch @tinoooo

## 5.2.1 (2025-12-26)

### 🩹 Fixes

- **core:** expose pixelRatio ([a2cbf4c3](https://github.com/Tresjs/tres/commit/a2cbf4c3))
- move types to setup block ([72139230](https://github.com/Tresjs/tres/commit/72139230))
- move types back to TresCanvas ([5a8f90c1](https://github.com/Tresjs/tres/commit/5a8f90c1))

### ❤️ Thank You

- alvarosabu @alvarosabu
- Jungzl

## 5.2.0 (2025-12-10)

### 🚀 Features

- export TresCanvasEmits type from TresCanvas.vue ([2466da39](https://github.com/Tresjs/tres/commit/2466da39))
- export TresCanvasProps type from TresCanvas.vue ([a15ba89a](https://github.com/Tresjs/tres/commit/a15ba89a))

### 🩹 Fixes

- use import attributes ([18acb535](https://github.com/Tresjs/tres/commit/18acb535))
- **core:** reuse TresPointerEvent ([3d026935](https://github.com/Tresjs/tres/commit/3d026935))
- **core:** import version directly from package.json for data-tres attribute ([55ecb136](https://github.com/Tresjs/tres/commit/55ecb136))
- **core:** move typescript to devDependencies ([d1d27d7e](https://github.com/Tresjs/tres/commit/d1d27d7e))

### ❤️ Thank You

- Jungzl

## 5.1.1 (2025-11-18)

### 🩹 Fixes

- **logger:** remove unnecessary eslint directive for explicit any in runtime mode resolution ([5b06cc1d](https://github.com/Tresjs/tres/commit/5b06cc1d))
- **core:** enhance runtime mode resolution for both browser and Node environments ([2f9c55c2](https://github.com/Tresjs/tres/commit/2f9c55c2))

### 🧱 Updated Dependencies

- Updated @tresjs/eslint-config to 1.5.1

### ❤️ Thank You

- alvarosabu @alvarosabu

## 5.1.0 (2025-10-10)

### 🚀 Features

- linter fixes ([2632eb90](https://github.com/Tresjs/tres/commit/2632eb90))
- add documentation and remove console log ([88c7abc9](https://github.com/Tresjs/tres/commit/88c7abc9))
- support components written in kebab-case ([be92464d](https://github.com/Tresjs/tres/commit/be92464d))

### 🩹 Fixes

- **utils:** update import paths for types in index.ts and tres.ts ([42f9e914](https://github.com/Tresjs/tres/commit/42f9e914))

### 🧱 Updated Dependencies

- Updated @tresjs/eslint-config to 1.5.0

### ❤️ Thank You

- alvarosabu @alvarosabu
- colinscz @colinscz

## 5.0.3 (2025-10-04)

### 🧱 Updated Dependencies

- Updated @tresjs/eslint-config to 1.4.1
- Updated @tresjs/leches to 1.0.0