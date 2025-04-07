<script lang="ts" setup>
import type { BlendFunction } from 'postprocessing'
import { ASCIIEffect, ASCIITexture } from 'postprocessing'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'
import { onUnmounted, watch } from 'vue'
import type { Color } from 'three'

type ASCIITextureOptions = ConstructorParameters<typeof ASCIITexture>[0]

export interface ASCIIPmndrsProps {
  /**
   * The blend function.
   */
  blendFunction?: BlendFunction
  /**
   * The opacity of the effect.
   */
  opacity?: number
  /**
   * The cell size.
   */
  cellSize?: number
  /**
   * Controls whether the effect should be inverted.
   */
  inverted?: boolean
  /**
   * The color of the effect.
   */
  color?: Color | string | number | null
  /**
   * Controls whether the effect should use the scene color.
   * If `true`, it overrides the `color` props.
   */
  useSceneColor?: boolean
  /**
   * The ASCII texture options to use for creating an ASCIITexture instance.
   * https://pmndrs.github.io/postprocessing/public/docs/class/src/textures/ASCIITexture.js~ASCIITexture.html
   */
  asciiTexture?: ASCIITextureOptions
}

const props = defineProps<ASCIIPmndrsProps>()

const plainEffect = new ASCIIEffect()

const { asciiTexture, ...asciiEffectProps } = props

const { pass, effect } = useEffectPmndrs(() => new ASCIIEffect(asciiEffectProps), props)

defineExpose({ pass, effect })

onUnmounted(() => {
  plainEffect.dispose()
})

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.cellSize, 'cellSize'],
    [() => props.inverted, 'inverted'],
  ],
  effect,
  () => new ASCIIEffect(),
)

watch(
  [effect, () => props.useSceneColor],
  () => {
    if (!effect.value) { return }

    if (props.useSceneColor) {
      effect.value.color = null
    }
    else {
      effect.value.color = props.color ?? plainEffect.color
    }
  },
  { immediate: true },
)

watch(
  [effect, () => props.opacity],
  () => {
    if (!effect.value) { return }

    effect.value.blendMode.setOpacity(props.opacity ?? plainEffect.blendMode.getOpacity())
  },
  { immediate: true },
)

watch(
  [effect, () => props.color],
  () => {
    if (!effect.value) { return }

    if (!props.useSceneColor) {
      effect.value.color = props.color ?? null
    }
  },
  { immediate: true },
)

watch(
  [effect, () => props.asciiTexture],
  () => {
    if (!effect.value) { return }

    const texture = props.asciiTexture
      ? new ASCIITexture(props.asciiTexture)
      : plainEffect.asciiTexture

    effect.value.asciiTexture = texture
  },
  { immediate: true },
)

watch(
  [effect, () => props.blendFunction],
  () => {
    if (!effect.value) { return }

    effect.value.blendMode.blendFunction = props.blendFunction ? Number(props.blendFunction) : Number(plainEffect.blendMode.blendFunction)
  },
  { immediate: true },
)
</script>
