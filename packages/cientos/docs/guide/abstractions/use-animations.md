# useAnimations

`useAnimations` is a composable that returns a `shallowReactive` with all the models actions based on the animations provided. It is a wrapper around the [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer) class.

<StackBlitzEmbed projectId="tresjs-use-animations" />

## Usage

### Basic Usage (Automatic Updates)

By default, `useAnimations` automatically updates the animation mixer on each frame using the `useLoop` composable:

```ts
import { useAnimations, useGLTF } from '@tresjs/cientos'

const { state } = useGLTF('/models/ugly-naked-bunny.gltf')

const animations = computed(() => state.value?.animations || [])
const model = computed(() => state?.value?.scene)
const { actions } = useAnimations(animations, model)

const currentAction = ref()

watch(actions, (newActions) => {
  currentAction.value = newActions.Greeting
  currentAction.value.play()
})
```

### Manual Updates

For more control over when the animation mixer updates, you can set `manualUpdate: true` and handle the updates yourself:

```ts
import { useAnimations, useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'

const { state } = useGLTF('/models/ugly-naked-bunny.gltf')

const animations = computed(() => state.value?.animations || [])
const model = computed(() => state?.value?.scene)
const { actions, mixer } = useAnimations(animations, model, {
  manualUpdate: true,
})

// Handle updates manually
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  mixer.value.update(delta)
})

const currentAction = ref()

watch(actions, (newActions) => {
  currentAction.value = newActions.Greeting
  currentAction.value.play()
})
```

## Options

- `manualUpdate` (optional): When set to `true`, disables automatic animation mixer updates. You'll need to call `mixer.value.update(delta)` manually. Default is `false`.
