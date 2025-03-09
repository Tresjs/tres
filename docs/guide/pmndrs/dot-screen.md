# Dot Screen

<DocsDemoGUI>
  <DotScreenDemo />
</DocsDemoGUI>

The `DotScreen` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/DotScreenEffect.js~DotScreenEffect.html) package. It allows you to create a dot screen effect, providing flexibility for artistic effects.

## Usage

The `<DotScreenPmndrs>` component is straightforward to use and provides customizable options to fine-tune the dot screen effect.

```vue{4,13-16,42-46}
<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { DotScreenPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const effectProps = reactive({
  angle: 1.57,
  scale: 1.25
})

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/suzanne/suzanne.glb', { draco: true })
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 1, 7.5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />

    <primitive :scale="2" :rotation-x="Math.PI / -5" :rotation-y="Math.PI" :position-y=".25" :position-z="0.5" :object="scene" />

    <ContactShadows
      :opacity="1"
      :position-y="-1.5"
    />

    <Suspense>
      <Environment preset="modern" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <DotScreenPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **angle**      | The angle of the dot pattern *(in radians)*.    | `1.57`                   |
| **scale**      | The scale of the dot pattern.                 | `1.0`                    |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`      |

## Further Reading

For more details, see the [DotScreen documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/DotScreenEffect.js~DotScreenEffect.html).
