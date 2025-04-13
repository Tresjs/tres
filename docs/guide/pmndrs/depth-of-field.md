# Depth of Field

<DocsDemo>
  <DepthOfFieldDemo />
</DocsDemo>

Depth of field is an optical effect employed in photography and cinematography to replicate the natural behavior of real-world cameras. When capturing an image or scene with a real camera, it's crucial to understand that only objects at a particular distance from the camera lens will appear in crisp, clear focus. Objects closer or further away from this specific point gradually become progressively blurry or out of focus.

This photographic technique allows photographers and filmmakers to draw attention to specific subjects or areas within a composition while creatively blurring or softening the background or foreground. Depth of field is a powerful tool for storytelling and visual aesthetics, enabling artists to control the viewer's gaze and emphasize narrative elements by manipulating focus and blur to their advantage.

## Usage

```vue{2,11-15}
<script setup lang="ts">
import { DepthOfFieldPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <DepthOfFieldPmndrs :focus-range="0.5" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop            | Description                                                   | Default                                                                                                                                        |
| --------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `blendFunction` | The blend function of this effect. | [BlendFunction.SCREEN](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/enums/BlendFunction.js#L40) |
| `worldFocusDistance` | The focus distance in world units. | 0.3 |
| `worldFocusRange` | The focus range in world units. | depends on camera |
| `focusDistance` | The normalized focus distance. Range is [0.0, 1.0]. | depends on camera |
| `focusRange` | The focus range. Range is [0.0, 1.0]. | 0.1 |
| `bokehScale` | The scale of the bokeh blur. | 1.0 |

## Further Reading
For more details, see the [DepthOfFieldEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/DepthOfFieldEffect.js~DepthOfFieldEffect.html)
