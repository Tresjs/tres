---
title: Primitives
description: Use the primitive component to directly integrate any Three.js object within your Vue application.
---

## What are Primitives?

The `<primitive />` component is a versatile low-level component in TresJS that allows you to directly use any Three.js object within your Vue application without an abstraction. It acts as a bridge between Vue's reactivity system and THREE's scene graph.

This component is particularly useful when you need:
- **Direct Three.js Integration**: Use existing Three.js objects without wrapper components
- **Complex Model Rendering**: Display models loaded from external sources like GLTF files
- **Performance Optimization**: Bypass component overhead for specific use cases
- **Third-party Library Integration**: Integrate objects from Three.js ecosystem libraries

## Basic Usage

The simplest way to use the `<primitive />` component is by passing a Three.js object to the `object` prop:

```vue [basic-primitive.vue]
<script setup lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

// Create a box geometry and a basic material
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0x00FF00 })

// Create a mesh with the geometry and material
const meshWithMaterial = new Mesh(geometry, material)
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <primitive :object="meshWithMaterial" />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## Props

The `<primitive />` component accepts the following props:

### `object`
- **Type**: `Object3D | Ref<Object3D>`
- **Required**: `true`

The primary Three.js object which the primitive component will render. This should be either a plain Three.js object or a reactive reference (preferably `shallowRef`).

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

// Using shallowRef for better performance with Three.js objects
const mesh = shallowRef(
  new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ color: 0xFF0000 })
  )
)
</script>

<template>
  <primitive :object="mesh" />
</template>
```

### `dispose`
- **Type**: `boolean | 'default' | ((self: TresInstance) => void) | null`
- **Default**: `'default'` (no disposal for primitives)

Controls how the primitive's resources are disposed when removed from the scene:

- `'default'` - Default behavior: don't dispose primitive resources
- `false` or `null` - Explicitly disable disposal
- `true` - Force disposal of the primitive and its resources
- `function` - Custom disposal function

```vue
<script setup lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

const mesh = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0xFF0000 })
)

// Custom disposal function
function customDispose(instance) {
  console.log('Disposing:', instance)
  if (instance.geometry) { instance.geometry.dispose() }
  if (instance.material) { instance.material.dispose() }
}
</script>

<template>
  <!-- Default: no disposal -->
  <primitive :object="mesh" />

  <!-- Force disposal -->
  <primitive :object="mesh" :dispose="true" />

  <!-- Custom disposal -->
  <primitive :object="mesh" :dispose="customDispose" />
</template>
```

### `attach`
- **Type**: `string | ((parent: any, self: TresInstance) => () => void)`
- **Optional**

Specifies how to attach the primitive to its parent. Can be a property name or a custom attachment function.

::code-group
```vue [Material Attachment]
<script setup lang="ts">
import { MeshStandardMaterial } from 'three'

// Create a custom material
const customMaterial = new MeshStandardMaterial({
  color: 0xFF6600,
  metalness: 0.8,
  roughness: 0.2
})
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <!-- Attach the primitive as the mesh's material -->
    <primitive :object="customMaterial" attach="material" />
  </TresMesh>
</template>
```

```vue [Geometry Attachment]
<script setup lang="ts">
import { ConeGeometry } from 'three'

// Create a custom geometry
const customGeometry = new ConeGeometry(1, 2, 8)
</script>

<template>
  <TresMesh>
    <!-- Attach the primitive as the mesh's geometry -->
    <primitive :object="customGeometry" attach="geometry" />
    <TresMeshBasicMaterial :color="0x00FF00" />
  </TresMesh>
</template>
```

```vue [Custom Attachment Function]
<script setup lang="ts">
import { DirectionalLight } from 'three'

const customLight = new DirectionalLight(0xFFFFFF, 1)

// Custom attachment function
const attachToTarget = (parent, self) => {
  // Attach light as target
  parent.target = self.object
  return () => {
    parent.target = null // Cleanup function
  }
}
</script>

<template>
  <TresDirectionalLight :position="[5, 5, 5]">
    <!-- Custom attachment -->
    <primitive :object="customLight" :attach="attachToTarget" />
  </TresDirectionalLight>
</template>
```
::

### `visible`
- **Type**: `boolean`
- **Default**: `true`

Controls the visibility of the primitive object.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)

// Toggle visibility every 2 seconds
setInterval(() => {
  isVisible.value = !isVisible.value
}, 2000)
</script>

<template>
  <primitive :object="mesh" :visible="isVisible" />
</template>
```

### Pass-through Props

Any other props are passed through to the underlying Three.js object, allowing you to modify its properties directly:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const rotationY = ref(0)

// Animate rotation
useLoop().onBeforeRender(() => {
  rotationY.value += 0.01
})
</script>

<template>
  <!-- These props are applied directly to the Three.js object -->
  <primitive
    :object="mesh"
    :position="[1, 2, 3]"
    :rotation="[0, rotationY, 0]"
    :scale="2"
    name="my-primitive"
    userData="{ customData: 'example' }"
  />
</template>
```

## Events

The `<primitive />` component supports all the pointer events available on TresJS components, allowing you to interact with the object in the scene:

```vue [primitive-events.vue]
<script setup lang="ts">
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

const mesh = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 0x00FF00 })
)

// Event handlers
function onClick(event) {
  console.log('Primitive clicked!', event)
  // Change color on click
  event.object.material.color.setHex(Math.random() * 0xFFFFFF)
}

function onPointerMove(event) {
  console.log('Pointer moving over primitive', event)
}

function onPointerEnter(event) {
  console.log('Pointer entered primitive', event)
  // Scale up on hover
  event.object.scale.setScalar(1.1)
}

function onPointerLeave(event) {
  console.log('Pointer left primitive', event)
  // Scale back to normal
  event.object.scale.setScalar(1)
}
</script>

<template>
  <primitive
    :object="mesh"
    @click="onClick"
    @pointermove="onPointerMove"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  />
</template>
```

### Available Events
- `@click` - Triggered when the object is clicked
- `@contextmenu` - Triggered on right-click
- `@pointerdown` - Triggered when pointer is pressed down
- `@pointerup` - Triggered when pointer is released
- `@pointermove` - Triggered when pointer moves over the object
- `@pointerenter` - Triggered when pointer enters the object
- `@pointerleave` - Triggered when pointer leaves the object

## Children via Slots

You can add children to the `<primitive />` component using slots. This is particularly useful when you want to add additional objects or materials which are not part of the main object:

```vue [primitive-children.vue]
<script setup lang="ts">
import { BoxGeometry, Mesh } from 'three'

// Create a mesh with only geometry, material will be added via slot
const meshWithOnlyGeometry = new Mesh(new BoxGeometry(1, 1, 1))
</script>

<template>
  <primitive :object="meshWithOnlyGeometry">
    <!-- Add material as child -->
    <TresMeshBasicMaterial :color="0xFF0000" />

    <!-- Add additional objects as children -->
    <TresMesh :position="[0, 1.5, 0]">
      <TresSphereGeometry :args="[0.3, 16, 16]" />
      <TresMeshBasicMaterial :color="0x00FF00" />
    </TresMesh>
  </primitive>
</template>
```

## Usage with Models

The `<primitive />` component is especially powerful when working with complex models loaded from external sources. Here's how to use it with GLTF models:

::code-group
```vue [TheModel.vue]
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

// Load a GLTF model
const { nodes, state } = useGLTF('/models/AkuAku.gltf')

// You can use the entire scene or specific nodes
const modelNode = computed(() => nodes.value.AkuAku)
</script>

<template>
  <!-- Use specific node from the model -->
  <primitive v-if="modelNode" :object="modelNode" />

  <!-- Or use the entire scene -->
  <primitive v-if="state.scene" :object="state.scene" />
</template>
```

```vue [app.vue]
<script setup lang="ts">
import TheModel from './TheModel.vue'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[5, 5, 5]" />

    <TheModel />
  </TresCanvas>
</template>
```
::

### Working with Multiple Model Parts

If you are working with complex models, you may want to access and manipulate specific parts:

```vue [primitive-model-parts.vue]
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF('/models/complex-model.gltf')

// Access specific parts of the model
const chassis = computed(() => nodes.value.Chassis)
const wheels = computed(() => nodes.value.Wheels)
const engine = computed(() => nodes.value.Engine)

// You can modify materials or properties
watchEffect(() => {
  if (chassis.value) {
    chassis.value.material.color.setHex(0xFF0000)
  }
})
</script>

<template>
  <TresGroup>
    <!-- Render different parts with different transformations -->
    <primitive v-if="chassis" :object="chassis" />
    <primitive v-if="wheels" :object="wheels" :rotation="[0, rotationY, 0]" />
    <primitive v-if="engine" :object="engine" @click="startEngine" />
  </TresGroup>
</template>
```

## Performance Considerations

When using primitives, keep these performance tips in mind:

::note
**Reactivity Optimization**: Use [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref) instead of [`ref`](https://vuejs.org/api/reactivity-core.html#ref) for Three.js objects to avoid deep reactivity overhead, as Three.js objects have complex internal structures that don't benefit from Vue's reactivity system.
::

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

// ✅ Good - Use shallowRef for Three.js objects
const mesh = shallowRef(new Mesh(geometry, material))

// ❌ Avoid - Regular ref creates unnecessary reactivity overhead
// const mesh = ref(new Mesh(geometry, material))
</script>
```

::warning
**Manual Disposal Required**: TresJS does NOT automatically dispose primitive resources by default. This is intentional to avoid altering the user's `:object`. You must manually dispose of geometries, materials, and textures when they're no longer needed to prevent memory leaks.
::

```vue
<script setup lang="ts">
import { onUnmounted, shallowRef } from 'vue'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0xFF0000 })
const mesh = shallowRef(new Mesh(geometry, material))

// ✅ Clean up resources when component is unmounted
onUnmounted(() => {
  geometry.dispose()
  material.dispose()
  // Note: The mesh itself doesn't need disposal, but its resources do
})
</script>

<template>
  <primitive :object="mesh" />
</template>
```

### Controlling Disposal Behavior

You can override the default behavior using the `dispose` prop:

```vue
<template>
  <!-- Default: Don't dispose primitive resources -->
  <primitive :object="mesh" />

  <!-- Explicitly disable disposal -->
  <primitive :object="mesh" :dispose="false" />

  <!-- Force disposal of the primitive and its resources -->
  <primitive :object="mesh" :dispose="true" />

  <!-- Custom disposal function -->
  <primitive :object="mesh" :dispose="customDispose" />
</template>
```

## Common Use Cases

### 1. Integrating Third-party Libraries
```vue
<script setup lang="ts">
import { Text } from 'troika-three-text'

const textMesh = new Text()
textMesh.text = 'Hello TresJS!'
textMesh.fontSize = 0.5
textMesh.color = 0xFF6600
</script>

<template>
  <primitive :object="textMesh" />
</template>
```

### 2. Custom Geometries
```vue
<script setup lang="ts">
import { BufferAttribute, BufferGeometry } from 'three'

// Create custom geometry
const geometry = new BufferGeometry()
const vertices = new Float32Array([
  -1,
  -1,
  0,
  1,
  -1,
  0,
  0,
  1,
  0
])
geometry.setAttribute('position', new BufferAttribute(vertices, 3))

const customMesh = new Mesh(geometry, new MeshBasicMaterial({ color: 0x00FF00 }))
</script>

<template>
  <primitive :object="customMesh" />
</template>
```

### 3. Particle Systems
```vue
<script setup lang="ts">
import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three'

const particleGeometry = new BufferGeometry()
const particleCount = 1000
const positions = new Float32Array(particleCount * 3)

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10
}

particleGeometry.setAttribute('position', new BufferAttribute(positions, 3))

const particles = new Points(
  particleGeometry,
  new PointsMaterial({ color: 0xFF6600, size: 0.1 })
)
</script>

<template>
  <primitive :object="particles" />
</template>
```

The `<primitive />` component provides the flexibility to integrate any Three.js object seamlessly into your TresJS application while maintaining the benefits of Vue's reactivity and component system.
