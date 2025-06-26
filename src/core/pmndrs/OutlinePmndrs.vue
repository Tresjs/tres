<script lang="ts" setup>
import type { TresColor } from '@tresjs/core'
import type { BlendFunction, KernelSize } from 'postprocessing'
import type { Object3D, Texture } from 'three'
import { normalizeColor, useTres } from '@tresjs/core'
import { OutlineEffect } from 'postprocessing'
import { computed, watch } from 'vue'
import { makePropWatchers } from '../../util/prop'
import { useEffectPmndrs } from './composables/useEffectPmndrs'

export interface OutlinePmndrsProps {
  /**
   * The objects in the scene which should have an outline.
   */
  outlinedObjects: Object3D[]

  blur?: boolean

  /**
   * Whether occluded parts of selected objects should be visible
   */
  xRay?: boolean

  /**
   * The blur kernel size. Must be used with blur being true.
   */
  kernelSize?: KernelSize

  /**
   * The pulse speed. A value of zero disables the pulse effect.
   */
  pulseSpeed?: number
  resolutionX?: number
  resolutionY?: number
  edgeStrength?: number
  patternScale?: number

  /**
   * The number of samples used for multisample antialiasing. Requires WebGL 2.
   */
  multisampling?: number
  blendFunction?: BlendFunction
  patternTexture?: Texture
  resolutionScale?: number
  hiddenEdgeColor?: TresColor
  visibleEdgeColor?: TresColor
}

const props = withDefaults(
  defineProps<OutlinePmndrsProps>(),
  {
    blur: undefined,
    xRay: undefined,
  },
)

const colorToNumber = (color: TresColor | undefined) =>
  color !== undefined ? normalizeColor(color).getHex() : undefined

const { camera, scene } = useTres()

const { pass, effect } = useEffectPmndrs(
  () => new OutlineEffect(
    scene.value,
    camera.value,
    {
      blur: props.blur,
      xRay: props.xRay,
      kernelSize: props.kernelSize,
      pulseSpeed: props.pulseSpeed,
      resolutionX: props.resolutionX,
      resolutionY: props.resolutionY,
      patternScale: props.patternScale,
      edgeStrength: props.edgeStrength,
      blendFunction: props.blendFunction,
      multisampling: props.multisampling,
      patternTexture: props.patternTexture,
      resolutionScale: props.resolutionScale,
      hiddenEdgeColor: colorToNumber(props.hiddenEdgeColor),
      visibleEdgeColor: colorToNumber(props.visibleEdgeColor),
      // width and height are explicitly omitted, because they are deprecated in postprocessing's OutlineEffect
    },
  ),
  props,
)

defineExpose({ pass, effect })

watch(
  [() => props.outlinedObjects, effect], // watchEffect is intentionally not used here as it would result in an endless loop
  () => {
    effect.value?.selection.set(props.outlinedObjects || [])
  },
  {
    immediate: true,
  },
)

const normalizedColors = computed(() => ({
  hiddenEdgeColor: props.hiddenEdgeColor ? normalizeColor(props.hiddenEdgeColor) : undefined,
  visibleEdgeColor: props.visibleEdgeColor ? normalizeColor(props.visibleEdgeColor) : undefined,
}))

makePropWatchers(
  [
    [() => props.blendFunction, 'blendMode.blendFunction'],
    [() => props.blur, 'blur'],
    [() => props.xRay, 'xRay'],
    [() => props.pulseSpeed, 'pulseSpeed'],
    [() => props.kernelSize, 'kernelSize'],
    [() => props.edgeStrength, 'edgeStrength'],
    [() => props.patternScale, 'patternScale'],
    [() => props.multisampling, 'multisampling'],
    [() => props.resolutionX, 'resolution.width'],
    [() => props.resolutionY, 'resolution.height'],
    [() => props.patternTexture, 'patternTexture'],
    [() => props.resolutionScale, 'resolution.scale'],
    [() => normalizedColors.value.hiddenEdgeColor, 'hiddenEdgeColor'],
    [() => normalizedColors.value.visibleEdgeColor, 'visibleEdgeColor'],
  ],
  effect,
  () => new OutlineEffect(),
)
</script>
