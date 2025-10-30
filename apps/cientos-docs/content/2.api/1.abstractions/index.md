---
title: Abstraction
description: UI components reference
---

# Components

Reusable components available in this boilerplate.

## Layout Components

### AppHeader

The main header component with navigation and search.

**Props:**

None

**Slots:**

- `default` - Header content

### AppFooter

The footer component with links and copyright.

**Props:**

None

**Slots:**

- `default` - Footer content

### AppSide

The sidebar navigation component.

**Props:**

None

**Slots:**

- `default` - Sidebar content

## Content Components

### ProseA

Enhanced anchor component for content links.

**Props:**

- `href` - Link URL
- `target` - Link target attribute

## Usage Example

```vue
<template>
  <AppHeader />
  <main>
    <!-- Your content -->
  </main>
  <AppFooter />
</template>
```
