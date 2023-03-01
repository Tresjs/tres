# useAnimations <Badge type="warning" text="^1.5.0" />

`useAnimation` 组合式函数返回一个 `shallowReactive` 对象，该对象包含所有基于提供的动画的模型操作。 它是 [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer) 的包装器。

<StackBlitzEmbed projectId="tresjs-use-animations" />

## 用法

```ts
import { useAnimations } from "@tresjs/cientos";

const { scene: model, animations } = await useGLTF(
  "/models/ugly-naked-bunny.gltf"
);

// Animations [ { name: 'Greeting'}, { name: 'Idle' } ]

const { actions, mixer } = useAnimations(animations, model);

let currentAction = actions.Greeting;

currentAction.play();
```
