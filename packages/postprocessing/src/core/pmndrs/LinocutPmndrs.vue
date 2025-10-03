<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { LinocutEffect } from './custom/linocut/index'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { Vector2 } from 'three'

export interface LinocutPmndrsProps {
  blendFunction?: BlendFunction
  scale?: number
  noiseScale?: number
  center?: Vector2 | [number, number]
  rotation?: number
}

const props = defineProps<LinocutPmndrsProps>()

const { pass, effect } = useEffectPmndrs(
  () => new LinocutEffect({
    ...props,
    center: props.center instanceof Vector2 ? [props.center.x, props.center.y] : props.center,
  }),
  props,
)

defineExpose({ pass, effect })

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.scale, 'scale'],
    [() => props.noiseScale, 'noiseScale'],
    [() => props.center, 'center'],
    [() => props.rotation, 'rotation'],
  ],
  effect,
  () => new LinocutEffect(),
)
</script>
