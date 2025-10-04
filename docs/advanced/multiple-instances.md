# Multiple instances

When working with multiple TresLeches instances in the same page, you need to use unique identifiers (UUIDs) to keep their states separate. This is particularly useful when you want to have different control panels for different parts of your application.

<MultipleInstancesDemo />

## Basic Usage

To create multiple instances, provide a unique `uuid` when initializing the controls and pass it as a prop to the corresponding TresLeches component:

```vue
<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

// First instance
const uuid1 = 'instance1'
const controls1 = useControls({
  awiwi: true,
}, {
  uuid: uuid1,
})

// Second instance
const uuid2 = 'instance2'
const controls2 = useControls({
  awiwi: true,
}, {
  uuid: uuid2,
})
</script>

<template>
  <div class="flex gap-4">
    <!-- First instance -->
    <div>
      <TresLeches :uuid="uuid1" />
      <pre>{{ controls1 }}</pre>
    </div>

    <!-- Second instance -->
    <div>
      <TresLeches :uuid="uuid2" />
      <pre>{{ controls2 }}</pre>
    </div>
  </div>
</template>
```

## How it works

The `uuid` parameter serves as a unique identifier that:

1. Links the controls created by `useControls` to their corresponding TresLeches panel
2. Ensures each instance maintains its own independent state
3. Prevents controls from interfering with each other

## Best Practices

- Always use descriptive and unique UUIDs that reflect the purpose of the controls
- Keep UUIDs consistent between component re-renders
- Consider using constants or enums to manage UUIDs in larger applications
- Avoid dynamically generating UUIDs as this will reset the controls state on each render
