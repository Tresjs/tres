# Shock Wave

<DocsDemoGUI>
  <ShockWaveDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/ShockWaveDemo.vue{0}
</details>

The `ShockWave` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ShockWaveEffect.js~ShockWaveEffect.html) package. It simulates a shockwave effect originating from a center point, creating a ripple-like distortion in the scene. This effect can add dramatic impact to your scene by simulating explosions or other shockwave phenomena.

## Usage

The `<ShockWavePmndrs>` component is easy to use and provides customizable options to suit different visual styles. There are several possible techniques to achieve this. See [Events](#events) and [DepthPickingPass](#depthpickingpass) for more details.

The main difference between `Events` and `DepthPickingPass` lies in the scope you want. `Events` is more suited for being used on a specific element, while `DepthPickingPass` is intended to be used for an entire scene (depth is calculated globally).

### Events

To determine the position of the shockwave effect, you can use Tres.js events. Tres.js allows you to handle user interactions directly and find the intersection point with objects in the scene. This technique is useful when you need to interact with specific objects based on user input.

You can use various Tres.js events such as `click`, `pointer-enter`, etc., to trigger the shockwave effect. For more details about available events, see the [documentation](https://docs.tresjs.org/api/events.html).

Here is an example of how to use events to trigger the shockwave effect:

```vue{2,46-54}
<script setup lang="ts">
import { EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'
import { useMouse, useWindowSize } from '@vueuse/core'
import { NoToneMapping, Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'

const gl = {
  toneMapping: NoToneMapping,
}

const effectProps = {
  speed: 0.2,
}

const shockWaveEffectRef = ref(null)
const mousePosition = ref(new Vector3(0,0,0))

const { x, y } = useMouse()
const { width, height } = useWindowSize()

const cursorX = computed(() => (x.value / width.value) * 2.0 - 1.0)
const cursorY = computed(() => -(y.value / height.value) * 2.0 + 1.0)

function updateMousePosition({ point }) {
  mousePosition.value.copy(point)
}

function triggerShockWave() {
  if (!shockWaveEffectRef.value) { return }

  updateMousePosition()

  shockWaveEffectRef.value.effect.explode()
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <TresMesh @click="triggerShockWave">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#1C1C1E" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <ShockWavePmndrs
          ref="shockWaveEffectRef"
          :position="mousePosition"
          v-bind="effectProps"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

### DepthPickingPass

The `DepthPickingPassPmndrs` component reads depth information from the scene. This is particularly useful for interacting with 3D objects based on their depth, such as triggering effects at specific points in 3D space.

In the example above, `DepthPickingPassPmndrs` determines the depth of the point where the shockwave effect should originate, allowing accurate interaction with 3D objects.

```vue{2,64-73}
<script setup lang="ts">
import { DepthPickingPassPmndrs, EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'
import { useMouse, useWindowSize } from '@vueuse/core'
import { NoToneMapping, Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'

/**
 * The camera value is retrieved via a ref here (elCanvasRef) because using
 * https://docs.tresjs.org/api/composables.html#usetrescontext
 * is not possible at the same level as <TresCanvas>.
 */

const gl = {
  toneMapping: NoToneMapping,
}

const effectProps = {
  speed: 0.2,
}

const mousePosition = ref(new Vector3(0, 0, 0))
const depthPickingPassRef = ref(null)
const shockWaveEffectRef = ref(null)
const elCanvasRef = ref(null)

const { x, y } = useMouse()
const { width, height } = useWindowSize()

const cursorX = computed(() => (x.value / width.value) * 2.0 - 1.0)
const cursorY = computed(() => -(y.value / height.value) * 2.0 + 1.0)

async function updateMousePosition() {
  if (!elCanvasRef.value || !depthPickingPassRef.value) { return }

  const ndcPosition = new Vector3(cursorX.value, cursorY.value, 0)

  ndcPosition.z = await depthPickingPassRef.value.pass.readDepth(ndcPosition)
  ndcPosition.z = ndcPosition.z * 2.0 - 1.0

  mousePosition.value.copy(ndcPosition.unproject(elCanvasRef.value.context.camera.value))
}

function triggerShockWave() {
  if (!shockWaveEffectRef.value) { return }

  updateMousePosition()

  shockWaveEffectRef.value.effect.explode()
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
    ref="elCanvasRef"
  >
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <TresMesh @click="triggerShockWave">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#1C1C1E" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <DepthPickingPassPmndrs ref="depthPickingPassRef" />
        <ShockWavePmndrs
          ref="shockWaveEffectRef"
          :position="mousePosition"
          v-bind="effectProps"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

For more details about DepthPickingPass, see the [documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/passes/DepthPickingPass.js~DepthPickingPass.html).

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| position          | The position of the shockwave.                                                                                | `Vector3(0, 0, 0)`  |
| amplitude         | The amplitude of the shockwave.                                                                               | `0.05`                     |
| waveSize          | The wave size of the shockwave.                                                                               | `0.2`                     |
| speed             | The speed of the shockwave.                                                                                   | `2.0`                     |
| maxRadius         | The max radius of the shockwave.                                                                              | `1.0`                     |

## Further Reading
For more details, see the [ShockWaveEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ShockWaveEffect.js~ShockWaveEffect.html)
