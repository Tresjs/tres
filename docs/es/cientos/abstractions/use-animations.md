# useAnimations <Badge type="warning" text="^1.5.0" />

`useAnimation` en un composable que desvuelve un `shallowReactive` con todas las acciones de los modelos en base de las animaciones proveídas. Es un wrapper sobre la clase [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer).

<StackBlitzEmbed projectId="tresjs-use-animations" />

## Utilización

```ts
import { useAnimations } from '@tresjs/cientos'

const { scene: model, animations } = await useGLTF('/models/ugly-naked-bunny.gltf')

// Animations [ { name: 'Greeting'}, { name: 'Idle' } ]

const { actions, mixer } = useAnimations(animations, model)

let currentAction = actions.Greeting

currentAction.play()
```
