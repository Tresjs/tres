# @tresjs/leches

Tasty GUI for Vue controls 🍰

## Overview

TresLeches is a GUI control library for Vue applications with smart field recognition and a tasty design. It provides a collection of control components for building interactive debug panels and configuration UIs.

## Organization

Components are in [src/components/](src/components/):

### Main Component
- **TresLeches.vue**: Root GUI component that manages control folders and layout

### Control Components
- **BooleanControl.vue**: Toggle/checkbox controls for boolean values
- **NumberControl.vue**: Numeric input controls
- **SliderControl.vue**: Range slider controls
- **ColorControl.vue**: Color picker controls
- **TextControl.vue**: Text input controls
- **SelectControl.vue**: Dropdown/select controls
- **VectorControl.vue**: Vector input controls (for 2D/3D vectors)
- **ButtonControl.vue**: Action button controls
- **GraphControl.vue**: Graph visualization controls
- **FPSGraph.vue**: FPS performance monitor

### Layout Components
- **Folder.vue**: Collapsible folder container for grouping controls
- **ControlInput.vue**: Base input component
- **ControlLabel.vue**: Label component for controls

## Key Features

- **Smart field recognition**: Automatically detects field types and provides appropriate controls
- **UnoCSS styling**: Uses UnoCSS with scrollbar preset for styling
- **VueUse integration**: Leverages @vueuse/components and @vueuse/motion for enhanced functionality

## Testing

Tests use Vitest with browser mode support. Each control component has corresponding test files (`.test.ts`).

```bash
# Run tests
pnpm --filter @tresjs/leches test

# Run with UI
pnpm --filter @tresjs/leches test:ui

# Browser tests
pnpm --filter @tresjs/leches test:browser
```

## Development

```bash
# Development mode (runs playground)
pnpm --filter @tresjs/leches dev

# Build library
pnpm --filter @tresjs/leches build
```
