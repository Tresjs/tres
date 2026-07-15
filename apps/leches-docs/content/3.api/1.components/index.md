---
title: Tres Leches API
description: TresLeches component props and composable signatures.
navigation:
  icon: i-lucide-box
---

# Tres Leches API

## `TresLeches`

Renders the controls registered under its UUID.

```vue
<TresLeches
  uuid="default"
  :collapsed="false"
  :float="true"
/>
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `uuid` | `string` | `'default'` | Selects which registered controls the panel renders. |
| `collapsed` | `boolean` | `false` | Sets the initial collapsed state. |
| `float` | `boolean` | `true` | Uses a draggable floating panel when `true`; uses normal layout flow when `false`. |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content rendered after the generated controls. |

### Exposed value

The component exposes `controls`, a computed record containing the controls for its UUID.

## `useControls`

Registers controls and returns an object of Vue refs.

```ts
function useControls(
  controls: Record<string, unknown>,
  options?: { uuid?: string },
): Record<string, Ref<unknown>>

function useControls(
  folder: string,
  controls: Record<string, unknown>,
  options?: { uuid?: string },
): Record<string, Ref<unknown>>
```

The special call `useControls('fpsgraph')` registers the built-in FPS graph.

### Control configuration

```ts
interface ControlConfig {
  value: unknown
  type?: 'select' | 'button' | 'range' | 'boolean' | 'text' | 'number' | 'color' | 'vector' | 'graph'
  label?: string
  icon?: string
  visible?: boolean
  min?: number
  max?: number
  step?: number
  format?: (value: number) => string
  options?: Array<string | number | { text: string, value: string | number }>
  onUpdate?: (values: unknown[]) => void
}
```

See the [controls guide](/guide/basics) for examples of every control type.

## `useControlsProvider`

Returns the registered control record for a UUID and provides the shared store to descendants.

```ts
function useControlsProvider(uuid = 'default'): Record<string, LechesControlUnion>
```

Most applications only need `useControls` and `<TresLeches />`. `useControlsProvider` is useful for integrations that inspect the normalized controls directly.
